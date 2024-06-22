# AWSNotificationService

Input Payload samples
Voice
{
  "notificationType": "voice",       // Specifies that this is a voice notification
  "phoneNumber": "+1234567890",      // The phone number to send the voice notification to
  "message": "Your verification code is 123456."  // The message to be conveyed
}

Text
{
  "notificationType": "text",       // Specifies that this is a voice notification
  "phoneNumber": "+1234567890",      // The phone number to send the voice notification to
  "message": "Your verification code is 123456."  // The message to be conveyed
}

Get Notification Transaction
Use a URL with a query parameter for the transactionId.
curl -X GET "https://your-api-id.execute-api.your-region.amazonaws.com/prod/notifications?transactionId=abcd1234-5678-90ef-ghij-klmnopqrstuv"


