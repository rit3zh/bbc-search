enum Method {
  Get = "GET",
}

export async function request(url: string) {
  const response = await fetch(url, {
    method: Method.Get,
  });
  const text = await response?.text();
  return text;
}

export async function getRequest(url: string) {
  const response = await fetch(url, {
    method: Method.Get,
  });
  const text = await response?.json();
  return text;
}
