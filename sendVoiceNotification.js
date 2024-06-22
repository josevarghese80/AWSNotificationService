const { PinpointClient, SendVoiceMessageCommand } = require("@aws-sdk/client-pinpoint");
// Initialize Pinpoint client
const client = new PinpointClient({ region: process.env.AWS_REGION });

exports.handler = async (event) => {
  const params = {
    ApplicationId: process.env.PINPOINT_APP_ID,
    SendVoiceMessageRequest: {
      CallerId: process.env.CALLER_ID,
      DestinationPhoneNumber: event.phoneNumber,
      MessageBody: event.message,
    },
  };

  try {
    // Send the voice message using Pinpoint
    const data = await client.send(new SendVoiceMessageCommand(params));
    return { status: "Voice message sent", MessageId: data.MessageResponse.Result };
  } catch (err) {
    throw new Error(`Voice message failed: ${err.message}`);
  }
};
