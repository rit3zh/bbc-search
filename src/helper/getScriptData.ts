export function getScriptData(html: string): string | null {
  const regex = /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/;
  const match = html.match(regex);

  return match ? match[1].trim() : null;
}
