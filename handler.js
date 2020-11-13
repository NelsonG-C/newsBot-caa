import { App } from "@slack/bolt";
import { getFirstPost } from "./scraper";

const success_response = {
  statusCode: 200,
  body: null,
};

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// slack slash command
//have option for aus or global news
//retrieve from CAA site for aus news
//use slash command details to choose

const messageResponse = async (slackE, callback) => {
  //callback sending Slack a 200 response
  callback(null, success_response);

  //determining type of request from slack
  if (slackE.bot_id == "B01E5B1LCMQ") {
    console.log("I know I am a bot, return this");
    return;
  } else if (
    slackE.text == "News" &&
    slackE.channel_type == "im" &&
    slackE.type == "message"
  ) {
    const article = await getFirstPost();
    await publishMessage(slackE.channel, article);
    return;
  } else {
    console.log("Nothing to report");
    return;
  }
};

async function publishMessage(id, text) {
  try {
    const result = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: id,
      text: text,
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

//the handler receiving the response
export const hello = (event, context, callback) => {
  const body = JSON.parse(event.body);
  const slackE = body.event;
  messageResponse(slackE, callback);
};
