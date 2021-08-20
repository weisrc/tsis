import type { Context } from "./Context";

export type KV<T> = { [k: string]: T };

export type Narrowable = string | number | bigint | boolean | symbol | object;

export type Errors = KV<string[]>;

export type UnionToIntersection<U> = (U extends U ? (x: U) => any : never) extends (
	x: infer I
) => any
	? I
	: never;

export enum ErrorLevel {
	None,
	One,
	All,
	Gold,
}

export type Guard<T = unknown> = (value: unknown, context?: Context) => value is T;
export type GuardTypeOf<T extends Guard> = T extends Guard<infer X> ? X : never;

export type MessageProvider = (...data: any[]) => string;
export type Messages = KV<MessageProvider>;
