const { PinpointClient, SendMessagesCommand } = require("@aws-sdk/client-pinpoint");
// Initialize Pinpoint client
const client = new PinpointClient({ region: process.env.AWS_REGION });

exports.handler = async (event) => {
  const params = {
    ApplicationId: process.env.PINPOINT_APP_ID,
    MessageRequest: {
      Addresses: {
        [event.phoneNumber]: {
          ChannelType: "SMS",
        },
      },
      MessageConfiguration: {
        SMSMessage: {
          Body: event.message,
          MessageType: "TRANSACTIONAL",
        },
      },
    },
  };

  try {
    // Send the text message using Pinpoint
    const data = await client.send(new SendMessagesCommand(params));
    return { status: "Text message sent", MessageId: data.MessageResponse.Result };
  } catch (err) {
    throw new Error(`Text message failed: ${err.message}`);
  }
};
