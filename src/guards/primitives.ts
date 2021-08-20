import { type, value, instance } from ".";

export const bool = type<boolean>("boolean");
export const string = type<string>("string");
export const number = type<number>("number");
export const bigint = type<bigint>("bigint");
export const none = type<undefined>("undefined");
export const nil = value<null>(null);
export const object = type<object>("object");
export const array = instance(Array);
