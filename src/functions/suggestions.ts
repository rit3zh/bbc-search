import { getRequest } from "../request";
import * as constants from "../constants";
import type { ISuggestions } from "../typings/Suggestions";

export async function suggestions<T extends string>(
  query: T
): Promise<ISuggestions[]> {
  const response: any = await getRequest(
    constants.SUGGESTION_URL + `?q=${query}&apikey=${constants.API_KEY}`
  );
  const results: any[] = response?.results satisfies any[];
  const items: ISuggestions[] = results?.map((item, index) => ({
    title: item?.title,
    url: item?.url,
    type: item?.type,
    synopsis: item?.synopsis,
  }));
  return items;
}
