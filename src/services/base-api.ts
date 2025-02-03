export class BaseApi {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  fetch = async (
    requestUrl: string,
    signal?: AbortSignal,
    method: 'GET' = 'GET'
  ) => {
    const response = await fetch(this.url + requestUrl, {
      method,
      signal,
    });

    if (!response.ok)
      throw new Error(`${method} to ${this.url} request failed`);

    return await response.json();
  };
}
