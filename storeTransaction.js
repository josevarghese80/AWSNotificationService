const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require('uuid');

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

exports.handler = async (event) => {
  const transactionId = uuidv4();
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      TransactionId: { S: transactionId },
      PhoneNumber: { S: event.phoneNumber },
      Message: { S: event.message },
      Status: { S: "Completed" },
    },
  };

  try {
    await client.send(new PutItemCommand(params));
    return { transactionId };
  } catch (err) {
    throw new Error(`DynamoDB put item failed: ${err.message}`);
  }
};
