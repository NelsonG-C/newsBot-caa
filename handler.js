"use strict";

module.exports.default = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.hello = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  const body = JSON.parse(event.body);
  console.log(body);
  const challenge = body.challenge;
  console.log(challenge);

  return {
    statusCode: 200,
    body: challenge,
  };
  // throw new Error('Something went wrong');
};
