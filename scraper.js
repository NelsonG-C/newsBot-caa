import axios from "axios";
import cheerio from "cheerio";

export const getFirstPost = async () => {
  try {
    console.log("getting the page to scrape");
    const { data } = await axios.get(
      "https://www.proteinreport.org/cultivated"
    );
    console.log(data);
    const $ = cheerio.load(data);
    const firstPost = $("div.field-content > a").attr("href");
    console.log("First post", firstPost);
    return firstPost;
  } catch (error) {
    throw error;
  }
};
