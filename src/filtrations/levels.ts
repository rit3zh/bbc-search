import { traverseString } from "../utils/traverse";

export function getLevelsContent(data: any) {
  return;
}

export function isLevels(data: any) {
  const level = traverseString(data, "level");
  return level ? true : false;
}
