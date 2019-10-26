const handler = (event, _, callback) => {
  const messages = event.Records || [];

  if (messages) {
    console.log(messages)
    callback(null, messages);
  } else {
    callback("No message retrieved.");
  }
};

export { handler };
