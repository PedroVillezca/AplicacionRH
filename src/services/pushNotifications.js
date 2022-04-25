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
      alert('Error creating platform endpoint: ' + err);
      alert(`${JSON.stringify(err)}`)
      if(err.code == 'InvalidParameter') {
        alert(`INVALIDPARAMETER`)
        let matches = existingEndpointRegex.test(err.message);
        if(matches) {
          alert('MATCHES')
          let arn = err.message.split(' ')[5];
          console.log(`ARN ${arn}`)
          alert(`ARN ${arn}`)
          SNS.deleteEndpoint({
            EndpointArn: arn,
          }).promise()
            .then(() => {
              alert(`DELETED PREVIOUS ENDPOINT`)
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
      alert('registration succeeded! ' + token.value)
      createEndpointForNewUser(token)
        .then(data => {
          alert('Push registration success, token: ' + token.value + '\n data: ' + data.EndpointArn);
          alert(`ENDPOINT ${JSON.stringify(data)}`)
          endpoint = data.EndpointArn
          return Storage.set({
            key: 'endpoint',
            value: data.EndpointArn,
          })
        })
        .then(() => {
          alert(`endpoint ${endpoint}`)
          return subscribeEmployee(endpoint)
        })
        .then(subArn => {
          alert('Subscribed successfully to employee topic: ' + subArn)
        })
        .catch(err => {
          alert('Error on initial notifications setup: ' + err);
        })
    }
  )

  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError',
    (error) => {
      alert('Error on registration: ' + JSON.stringify(error));
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
      alert('Push action performed: ' + JSON.stringify(notification));
    }
  );
}

const setupAuthListeners = () => {
  console.log('adding listeners')
  Hub.listen('auth', (data) => {
    console.log(`Auth event ${JSON.stringify(data)}`)
    alert(`Auth event ${JSON.stringify(data)}`);
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
          alert('endpoint disabled', data)
          return Storage.remove({key: 'endpoint'})
        })
        .then(() => {
          alert('endpoint removed from storage')
        })
        .catch(err => {
          alert(`error setting endpoint attributes ${JSON.stringify(err)}`)
        })

        break;
    }
  })
}

export const subscribeEmployee = (endpointArn) => {
  return new Promise((res, rej) => {
    alert(`SUB ARN ${endpointArn}`)
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