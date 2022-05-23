/* Amplify Params - DO NOT EDIT
	API_APLICACIONRH_GRAPHQLAPIENDPOINTOUTPUT
	API_APLICACIONRH_GRAPHQLAPIIDOUTPUT
	API_APLICACIONRH_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const SNS = new AWS.SNS({apiVersion: '2010-03-31'});
const topicArn = 'arn:aws:sns:us-east-1:948937876768:employees';
const userTable = 'User-hl6vsyf54zdgbl5pfiu7uwrpp4-dev'
const notificationTable = 'Notification-hl6vsyf54zdgbl5pfiu7uwrpp4-dev'
 
const today = new Date()
const storeNotifParams = {
    TableName: userTable,
    AttributesToGet: ['blueTag'],
    ScanFilter: {
        'receiveNotifications': {
            ComparisonOperator: 'EQ',
            AttributeValueList: [true]
        }
    }
 }

const sendNotifParams = {
    TableName: userTable,
    IndexName: 'birthday-index',
    ScanFilter: {
        'birthDay': {
            ComparisonOperator: 'EQ',
            AttributeValueList: [today.getDate()]
        },
        'birthMonth': {
            ComparisonOperator: 'EQ',
            AttributeValueList: [today.getMonth() + 1]
       }
    }
}
 
async function getBirthdays() {
    const users = await docClient.scan(sendNotifParams).promise()
    return users
}
 
async function getNotifiedUsers() {
    const users = await docClient.scan(storeNotifParams).promise()
    return users
}
 
exports.handler = async () => {
    try {
        const users = await getBirthdays()
        const notifiedUsers = await getNotifiedUsers()
        
       const promises = users.Items
            .filter(user => user.sendNotifications)
            .map((user) => {
                // Send notification for this user's bday to SNS
                const message = "¡De parte de todos en Blue People le deseamos a " + 
                                `${user.firstName} ${user.lastName} (${user.blueTag}) ` +
                                "un muy feliz cumpleaños!"
                return new Promise((resolve, reject) => {
                    let results;
 
                   SNS.publish({
                        MessageStructure: 'json',
                        Message: JSON.stringify({
                            default: message,
                            GCM: JSON.stringify({
                                data: {message: "HBD!", user}, 
                                notification: {
                                    title: "Happy birthday!", 
                                    body: message
                                }
                            })
                        }),
                        TopicArn: topicArn
                    }).promise()
                    .then((res) => {
                        results = res

                        var userCount = 0
                        var batchParamList = []
                        while (userCount < notifiedUsers.Items.length) {
                            const batchParams = {
                                RequestItems: {
                                    [notificationTable]: []
                                }
                            }
                            for (let batchSize = 0; batchSize < 25 && userCount < notifiedUsers.Items.length; batchSize++) {
                                const notifiedUser = notifiedUsers.Items.at(userCount)
                                batchParams.RequestItems[notificationTable].push({
                                    PutRequest: {
                                        Item: {
                                            "blueTag": notifiedUser.blueTag,
                                            "date#message": today.toISOString().concat("#", message),
                                            "date": today.toISOString().split('T')[0],
                                            "message": message,
                                            "createdAt": today.toISOString(),
                                            "updatedAt": today.toISOString()
                                        }
                                    }
                                })
                               userCount++
                            }
                            batchParamList.push(batchParams)
                        }
                        const batchPromises = batchParamList.map((batchParams) => {
                            return docClient.batchWrite(batchParams).promise()
                        })
 
                        return Promise.all(batchPromises)
                    })
                    .then(response => resolve({results, response}))
                    .catch(err => reject(err))
                })
            });
        
        const results = await Promise.all(promises);
        
        return {
            statusCode: 200,
            body: JSON.stringify({data:results, users})
        }
    } catch (error) {
        return {error: error}
    }
};