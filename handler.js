import { App } from "@slack/bolt";
import { getFirstPost } from "./scraper";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

async function publishMessage(id, text) {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await app.client.chat.postMessage({
      // The token you used to initialize your app
      token: null,
      channel: id,
      text: text,
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

export const hello = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  const body = JSON.parse(event.body);
  console.log("Event Body:", body);
  const slackE = body.event;

  // this isnt robust enough at the moment. I need it to handle non related commands and then end, rather than keep firing
  if (
    slackE.channel_type == "im" &&
    slackE.type == "message" &&
    slackE.text == "Hey this is a test"
  ) {
    // scrape the latest article
    const article = await getFirstPost();
    await publishMessage(slackE.channel, article);
    return {
      statusCode: 200,
      body: slackE,
    };
  } else {
    // need to implement a message that gives rules and ends, rather than throwing an error
    //could have a trycatch here as well to handle overall error
    throw Error("Something went wrong");
  }
  // throw new Error('Something went wrong');
};
