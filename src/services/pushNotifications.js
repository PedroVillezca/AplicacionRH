import * as AWS from 'aws-sdk';
import {platformApplicationArn, accessKeyId, secretAccessKey, topicArn}from './sns-config'
import {
  PushNotifications,
} from '@capacitor/push-notifications';
import { Hub } from 'aws-amplify';
import { Storage } from '@capacitor/storage';

AWS.config.update({region: 'us-east-1', accessKeyId, secretAccessKey })
const SNS = new AWS.SNS({apiVersion: '2010-03-31'});

const existingEndpointRegex = new RegExp("Invalid parameter: Token Reason: Endpoint (.+) already exists with the same Token, but different attributes.")

export const pushNotificationServiceSetup = () => {
  notificationInitialSetup()
  setupAuthListeners()
}

const createEndpointForNewUser = async (token) => {
  return new Promise((resolve, reject) => {
    SNS.createPlatformEndpoint({
      PlatformApplicationArn: String(platformApplicationArn),
      Token: token.value,
      Attributes: {
        'Enabled': 'true'
      }
    }).promise()
    .then(data => resolve(data))
    .catch(err => {
      if(err.code == 'InvalidParameter') {
        let matches = existingEndpointRegex.test(err.message);
        if(matches) {
          let arn = err.message.split(' ')[5];
          console.log(`ARN ${arn}`)
          SNS.deleteEndpoint({
            EndpointArn: arn,
          }).promise()
            .then(() => {
              return SNS.createPlatformEndpoint({
                PlatformApplicationArn: String(platformApplicationArn),
                Token: token.value,
                Attributes: {
                  'Enabled': 'true'
                }
              }).promise()
            })
            .then((data) => resolve(data))
            .catch(err => reject(err))
        }
      }
    })
  })
}

const notificationInitialSetup = () => {
  let endpoint = ''
  // On success, we should be able to receive notifications
  PushNotifications.addListener('registration',
    (token) => {
      createEndpointForNewUser(token)
        .then(data => {
          endpoint = data.EndpointArn
          return Storage.set({
            key: 'endpoint',
            value: data.EndpointArn,
          })
        })
        .then(() => {
          return subscribeEmployee(endpoint)
        })
        .then(subArn => {
          console.log('Subscribed successfully to employee topic: ' + subArn)
        })
        .catch(err => {
          console.log('Error on initial notifications setup: ' + err);
        })
    }
  )

  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError',
    (error) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    }
  );

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener('pushNotificationReceived',
    (notification) => {
      console.log('Push received: ' + JSON.stringify(notification));
    }
  );

  // Method called when tapping on a notification
  PushNotifications.addListener('pushNotificationActionPerformed',
    (notification) => {
      console.log('Push action performed: ' + JSON.stringify(notification));
    }
  );
}

const setupAuthListeners = () => {
  console.log('adding listeners')
  Hub.listen('auth', (data) => {
    console.log(`Auth event ${JSON.stringify(data)}`)
    switch(data.payload.event) {
      case 'signIn':
        console.log('signed in');
        console.log(data.payload.data)
        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermissions().then(result => {
          if (result.receive === 'granted') {
            // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();
          } else {
            // Show some error
            console.error('ERROR REQUESTING PERMISSIONS FOR PUSH NOTIFICATIONS')
          }
        });
        break
      case 'signOut':
        Storage.get({key: 'endpoint'})
        .then(({value}) => {
          return SNS.setEndpointAttributes({
            EndpointArn: value,
            Attributes: {
              Enabled: 'false'
            }
          }).promise()
        })
        .then((data) => {
          console.log('endpoint disabled', data)
          return Storage.remove({key: 'endpoint'})
        })
        .then(() => {
          console.log('endpoint removed from storage')
        })
        .catch(err => {
          console.log(`error setting endpoint attributes ${JSON.stringify(err)}`)
        })

        break;
    }
  })
}

export const subscribeEmployee = (endpointArn) => {
  return new Promise((res, rej) => {
    console.log(`SUB ARN ${endpointArn}`)
    SNS.subscribe({
      Protocol: 'application',
      TopicArn: topicArn,
      Endpoint: endpointArn,
    }, (err, data) => {
      if (err) {
        rej(err)
      } else {
        res(data.SubscriptionArn)
      }
    })
  })
}