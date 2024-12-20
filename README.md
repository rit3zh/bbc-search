# bbc.ts 🌟

<div>
  <a href="https://www.npmjs.com/package/bbc.ts">
    <img src="https://img.shields.io/npm/v/bbc.ts.svg" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/bbc.ts">
    <img src="https://img.shields.io/npm/dm/bbc.ts.svg" alt="npm downloads" />
  </a>
  <a href="https://github.com/rit3zh/bbc.ts/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/bbc.ts.svg" alt="license" />
  </a>
</div>

**bbc.ts** is a lightweight library to fetch search suggestions and perform detailed searches with structured results from the BBC website.

---

## Installation

```bash
npm install bbc.ts
```

---

## Features

- Fetch search suggestions based on a query.
- Perform detailed searches with metadata-rich results.
- Retrieve news details including headlines, author, timestamp, paragraphs, images, and topics.

---

## Usage

### Importing the Functions

```typescript
import { suggestions, search, getNews } from "bbc.ts";
```

---

### 1. **Fetching Suggestions**

#### Description:

Fetch a list of search suggestions based on a given query.

#### Function Signature:

```typescript
async function suggestions<T extends string>(query: T): Promise<ISuggestions[]>;
```

#### Example:

```typescript
import { suggestions } from "bbc.ts";

(async () => {
  const query = "football";
  const suggestionList = await suggestions(query);
  console.log(suggestionList);
})();
```

#### Response:

An array of objects, where each object includes:

- **title**: The suggestion title.
- **url**: A URL leading to the suggestion.
- **type**: The category/type of the suggestion.
- **synopsis** (optional): A short description of the suggestion.

---

### 2. **Performing a Search**

#### Description:

Perform a search and retrieve structured results.

#### Function Signature:

```typescript
async function search<T extends ISearchOptions>(
  options: T
): Promise<SearchResult>;
```

#### Example:

```typescript
import { search } from "bbc.ts";

(async () => {
  const searchOptions = {
    query: "technology",
    page: 1,
  };
  const searchResults = await search(searchOptions);
  console.log(searchResults);
})();
```

#### Search Options:

- **query** (required): The search keyword (string).
- **page** (optional): The page number for paginated results (defaults to 0).

#### Response:

The function returns a `SearchResult` object with:

- **total** (optional): Total number of results.
- **items**: An array of `SearchItems`.

Each `SearchItem` contains:

- **title**: The item's title.
- **description** (optional): A brief description.
- **live** (optional): Boolean indicating if the item is live.
- **metadata**: An `ISearchMetaData` object containing:
  - published: The published date (string).
  - lastUpdated: The last updated date (string).
  - type: The content type (e.g., article, video).
  - subtype: Subcategory of the content.
- **image**: The URL to the item's image (string).
- **related**: Array of related items (if available).
- **href**: Link to the item's page.

---

### 3. **Getting News Details**

#### Description:

Fetches detailed news information from a given URL, including the headline, author, timestamp, paragraphs, images, and topics.

#### Function Signature:

```typescript
async function getNews<T extends string>(url: T): Promise<INews>;
```

#### Example:

```typescript
import { getNews } from "bbc.ts";

(async () => {
  const newsUrl = "https://www.bbc.com/news/articles/cd0enn3kekyo"; // example
  const newsDetails = await getNews(newsUrl);
  console.log(newsDetails);
})();
```

#### Response:

Returns an `INews` object containing:

- **headline**: The headline of the news article.
- **role**: The role of the person (e.g., reporter).
- **author**: The name of the author.
- **timestamp**: The time when the article was published.
- **paragraph**: An array of paragraphs from the news article.
- **images**: An array of image URLs associated with the article.
- **topics**: An array of topics related to the article.

---

## Typings

### Interfaces

#### ISearchOptions

```typescript
export interface ISearchOptions {
  query: string;
  page?: number;
}
```

#### ISuggestions

```typescript
export interface ISuggestions {
  title?: string;
  url?: string;
  type?: string;
  synopsis?: string;
}
```

#### SearchResult

```typescript
export interface SearchResult {
  total?: number;
  items: SearchItems[];
}
```

#### SearchItems

```typescript
export interface SearchItems {
  title?: string;
  description?: string;
  live?: boolean;
  metadata?: ISearchMetaData;
  image?: string;
  related?: any[];
  href?: string;
}
```

#### ISearchMetaData

```typescript
export interface ISearchMetaData {
  published?: string;
  lastUpdated?: string;
  type?: string;
  subtype?: string;
}
```

#### INews

```typescript
export interface INews {
  headline?: string;
  role?: string;
  author?: string;
  timestamp?: string;
  paragraph?: string[];
  images?: string[];
  topics?: ITopics;
}

export interface ITopics {
  title?: string;
  url?: string;
}
```

---

## Contributing

We welcome contributions! Feel free to submit issues or pull requests to help improve **bbc.ts**.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/rit3zh/bbc.ts/blob/main/LICENSE) file for more details.

---

## Links

- **GitHub Repository**: [bbc.ts on GitHub](https://github.com/rit3zh/bbc.ts)
