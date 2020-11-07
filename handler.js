import { App } from "@slack/bolt";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

export const hello = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  app.event("message.im", ({ event, say }) => {
    console.log("In here");
    say(`Hello World, <@${event.user}>!`);
  });

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

/*
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
*/
