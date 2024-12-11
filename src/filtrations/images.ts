import { traverse, traverseString } from "../utils/traverse";
import * as constants from "../constants/index";

export function getImages(data: any) {
  const type = traverse(data, "type");
  const images: string[] = [];
  if (type === "image") {
    const originCode = traverseString(data, "model", "originCode");
    const locator = traverse(data, "model", "model", "locator");
    const image = `${constants.MEDIA_URL}${constants.RATIO}/${originCode}/${locator}`;
    images.push(image);
  }
  return images;
}
