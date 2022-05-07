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

const today = new Date()
const params = {
    TableName: 'User-hl6vsyf54zdgbl5pfiu7uwrpp4-dev',
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

async function getUsers() {
    const users = await docClient.scan(params).promise()
    return users
}

exports.handler = async () => {
    try {
        const users = await getUsers()
        
        const promises = users.Items
            .filter(user => user.sendNotifications)
            .map((user) => {
                // Send notification for this user's bday to SNS
                const message = "From everyone on Blue People we wish " + 
                                `${user.firstName} ${user.lastName} (${user.blueTag}) ` +
                                "a happy birthday"
                return new Promise((resolve, reject) => {
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
                    .then(response => resolve(response))
                    .catch(err => reject(err))
                })
            });
        
        const results = await Promise.all(promises);
        
        return {
            statusCode: 200,
            body: JSON.stringify({results, users})
        }
    } catch (error) {
        return {error: error}
    }
};
