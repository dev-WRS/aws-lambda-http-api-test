const AWS = require('aws-sdk');

const updateTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const { id } = event.pathParameters;
        const { done } = JSON.parse(event.body);

        await dynamodb.update({
            TableName: 'TaskTable',
            UpdateExpression: 'set done = :done',
            ExpressionAttributeValues: {':done': done},
            Key: { id },
            ReturnValues: 'ALL_NEW'
        }).promise();

        return {
            status: 200,
            body: JSON.stringify('Task updated successfully')
        };
    } catch (e) {
        console.log(e);
    }
}

module.exports = { updateTask };