const AWS = require('aws-sdk');

const getTasks = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const items = await dynamodb.scan({
            TableName: "TaskTable"
        }).promise();

        const result = items.Items;

        return {
            status: 200,
            body: { result }
        };
    } catch (e) {
        console.log(e);
    }

}

module.exports = { getTasks };