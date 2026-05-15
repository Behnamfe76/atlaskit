export interface ApiRequest {
  readonly body?: unknown;
  readonly method?: string;
  readonly path: string;
}

export interface ApiClient {
  request<TResponse>(request: ApiRequest): Promise<TResponse>;
}
