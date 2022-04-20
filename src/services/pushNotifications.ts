import * as AWS from 'aws-sdk';
import {platformApplicationArn, accessKeyId, secretAccessKey, topicArn}from '../sns-config';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { subscriptionARN } from 'aws-sdk/clients/sns';


AWS.config.update({region: 'us-east-1', accessKeyId, secretAccessKey })
const SNS = new AWS.SNS({apiVersion: '2010-03-31'});

export const notificationInitialSetup = () => {
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

  // On success, we should be able to receive notifications
  PushNotifications.addListener('registration',
    (token: Token) => {
      alert('registration succeeded! ' + token.value)
      SNS.createPlatformEndpoint({
        PlatformApplicationArn: String(platformApplicationArn),
        Token: token.value,
        Attributes: {
          Enabled: 'true'
        }
      }, (err, data) => {
        if(err) {
          alert('Error creating platform endpoint: ' + err);
        } else {
          alert('Push registration success, token: ' + token.value + '\n data: ' + data.EndpointArn);
          subscribeEmployee( data.EndpointArn)
            .then(subArn => {
              alert('Subscribed successfully to employee topic: ' + subArn)
            })
            .catch(err => {
              alert('Error subscribing to topic: ' + err);
            })
        }
      })
    }
  );

  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError',
    (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    }
  );

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener('pushNotificationReceived',
    (notification: PushNotificationSchema) => {
      console.log('Push received: ' + JSON.stringify(notification));
    }
  );

  // Method called when tapping on a notification
  PushNotifications.addListener('pushNotificationActionPerformed',
    (notification: ActionPerformed) => {
      alert('Push action performed: ' + JSON.stringify(notification));
    }
  );

}

export const subscribeEmployee = (endpointArn?: string ): Promise<subscriptionARN | undefined>=> {
  return new Promise((res, rej) => {
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