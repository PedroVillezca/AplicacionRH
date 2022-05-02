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
    try {
        const users = await docClient.scan(params).promise()
        return users
    } catch (error) {
        return error
    }
}

exports.handler = async (event) => {
    try {
        const users = await getUsers()
        
        users.Items.forEach((user) => {
            if (user.sendNotifications) {
                // Send notification for this user to SNS
            }
        })
        return {
            statusCode: 200,
            body: JSON.stringify(users)
        }
    } catch (error) {
        return {error: error}
    }
};
