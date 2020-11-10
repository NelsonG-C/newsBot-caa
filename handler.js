import { App } from "@slack/bolt";
import getFirstPost from "./scraper";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

async function publishMessage(id, text) {
  try {
    // scrape the latest article
    const article = await getFirstPost();

    // Call the chat.postMessage method using the built-in WebClient
    const result = await app.client.chat.postMessage({
      // The token you used to initialize your app
      token: "xoxb-1466612478967-1466635297799-m5tlNijXFgaMRmnMnmGb0VQj",
      channel: id,
      text: article,
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

export const hello = async (event, context) => {
  getFirstPost();
  console.log("Received event:", JSON.stringify(event, null, 2));
  const body = JSON.parse(event.body);
  console.log("Event Body:", body);
  const slackE = body.event;

  // run this when back home  `
  console.log("app", app);

  if (slackE.channel_type == "im" && slackE.type == "message") {
    console.log("OOOOOOOOOOOOOOOOOOSI'm in here");
    publishMessage(slackE.channel, `Hello World, <@${event.user}>!`);
  }

  return {
    statusCode: 200,
    body: slackE,
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
