import { formatDate } from "../helper/format";
import { imageModifier } from "../helper/modifiers";
import { traverse } from "../utils/traverse";

export function parser(item: any) {
  return {
    title: item?.title,
    description: item?.description,
    live: item?.isLiveNow,
    metadata: {
      published: formatDate(item?.metadata?.firstUpdated),
      lastUpdated: formatDate(item?.metadata?.lastUpdated),
      type: item?.metadata?.contentType,
      subtype: item?.metadata?.subtype,
    },
    image: imageModifier(traverse(item, "src")),
    related: item?.relatedUrls,
    href: item?.href,
  };
}
