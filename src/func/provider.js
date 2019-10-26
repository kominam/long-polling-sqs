import AWS from 'aws-sdk';
import uuid from 'uuid/v4';

const handler = async (event, _, callback) => {
  const sqs = new AWS.SQS();
  const body = JSON.parse(event.body);

  const params = {
    QueueUrl: process.env.QUEUE_URL,
    Entries: body.messages.map(message => ({
      Id: uuid(),
      MessageBody: message,
    }));
  }

  try {
    const data = await sqs.sendMessageBatch(params).promise();
    callback(null, {
      "statusCode": 201,
      "body": JSON.stringify(params.Entries),
      "headers": {
        "Content-Type": "application/json"
      },
      "isBase64Encoded": false
    });
  } catch(err) {
    callback(error, error.stack);
  }
};

export { handler };
