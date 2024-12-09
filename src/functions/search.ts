import { getScriptData } from "../helper/getScriptData";
import { parser } from "../parser";
import { request } from "../request";
import { traverse } from "../utils/traverse";
import type { SearchItems, SearchResult } from "../typings/SearchResults";
import { ISearchOptions } from "../typings/Options";
import * as constants from "../constants/index";

export async function search<T extends ISearchOptions>(
  options: T
): Promise<SearchResult> {
  const html = await request(
    constants.BASE_URL +
      `/?q=${options?.query?.toLowerCase()}&page=${options?.page || 0}`
  );
  const script: object = JSON.parse(
    getScriptData(html) as string
  ) satisfies any;
  const totalResult: number = traverse(script, "total");
  const results: any[] = traverse(script, "results");

  const items = results?.map((item, index) =>
    parser({ ...item })
  ) as SearchItems[];
  return {
    total: totalResult,
    items,
  };
}
