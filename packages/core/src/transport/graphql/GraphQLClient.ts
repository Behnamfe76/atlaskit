import type { ApiClient, ApiRequest } from "../ApiClient";

export class GraphQLClient implements ApiClient {
  constructor(
    private readonly handler: <TResponse>(
      request: ApiRequest
    ) => Promise<TResponse>
  ) {}

  request<TResponse>(request: ApiRequest): Promise<TResponse> {
    return this.handler<TResponse>(request);
  }
}
