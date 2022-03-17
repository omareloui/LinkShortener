import type { IncomingMessage, ServerResponse } from "http";

export type APIRequest = IncomingMessage;
export type APIResponse = ServerResponse;

export type APIFunction<T = any> = (req: APIRequest, res: APIResponse) => T;
