const AWS = require('aws-sdk');

const getTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const { id } = event.pathParameters

        const item = await dynamodb.get({
            TableName: "TaskTable",
            Key: { id }
        }).promise();

        const result = item.Item;

        return {
            status: 200,
            body: { result }
        };
    } catch (e) {
        console.log(e);
    }

}

module.exports = { getTask };