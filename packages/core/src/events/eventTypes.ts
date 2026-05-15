export interface AtlasEvent<TPayload = unknown> {
  readonly payload?: TPayload;
  readonly timestamp: number;
  readonly type: string;
}

export type EventHandler<TPayload = unknown> = (
  event: AtlasEvent<TPayload>
) => void;
