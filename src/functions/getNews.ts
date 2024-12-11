import { getImages } from "../filtrations/images";
import { isLevels } from "../filtrations/levels";
import { getScriptData } from "../helper/getScriptData";
import { request } from "../request";
import { traverse, traverseList, traverseString } from "../utils/traverse";
import type { INews } from "../typings/News";

export async function getNews<T extends string>(url: T): Promise<INews> {
  const html = await request(url);
  const script: object = JSON.parse(
    getScriptData(html) as string
  ) satisfies any;
  const pageProps = traverse(script, "pageProps");
  const contents = traverse(pageProps, "contents");
  const model = traverseList(contents);
  const paragraph: string[] = [];
  const images: string[] = [];
  const headline_text: string[] = [];
  const timestamp: string[] = [];
  const author_text: string[] = [];
  const topics = traverseList(pageProps, "topics")[0]?.map((topic: any) => ({
    title: topic?.title,
    url: topic?.url,
  }));
  const role: string[] = [];
  model.map((model) => {
    const headline = traverseString(model, "type") === "headline";
    if (headline) {
      const headlineText = !traverseString(
        model,
        "blocks",
        "model",
        "model",
        "text"
      )
        ? traverseString(
            model,
            "blocks",

            "text"
          )
        : traverseString(model, "blocks", "model", "model", "text");

      headline_text.push(headlineText);
    }
    const time = traverseString(model, "type") === "timestamp";
    if (time) {
      const stamp = traverseString(model, "timestamp");
      timestamp.push(stamp);
    }

    const author = traverseString(model, "type") === "byline";

    if (author) {
      const blocks = traverseString(model, "blocks", "text");
      const _role_ = traverseString(
        traverseString(model, "blocks", "model", "blocks")[1],
        "text"
      );
      role.push(_role_);

      author_text.push(blocks);
    }

    getImages(model).map((img) => images.push(img));
    model?.model?.blocks?.map((block: any) => {
      if (!block?.model.text) return;
      const modelBlock = block?.model?.text;
      paragraph.push(modelBlock);
    });
  });
  return {
    headline: headline_text[0],
    role: role[0],
    author: author_text[0],
    timestamp: timestamp[0],
    paragraph: paragraph,
    images,
    topics,
  };
}
