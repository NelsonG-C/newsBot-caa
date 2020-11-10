import { JSDOM } from "jsdom";
import axios from "axios";

export const getFirstPost = async () => {
  try {
    const { data } = await axios.get(
      "https://www.proteinreport.org/cultivated"
    );
    console.log(data);
    const dom = new JSDOM(data, {
      runScripts: "dangerously",
      resources: "usable",
    });
    const { document } = dom.window;
    const firstPost = document.querySelector("div.field-content > a").href;
    console.log("First post", firstPost);
  } catch (error) {
    throw error;
  }
};
