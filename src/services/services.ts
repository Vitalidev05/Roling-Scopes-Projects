interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);

  try {
    response.parsedBody = (await response.json()) as T;
  } catch (ex) {
    throw new Error(response.statusText);
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export default http;
