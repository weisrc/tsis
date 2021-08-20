import { Messages } from "./types";

export const messages: Messages = {
	default: () => "expected something else",
	or: () => "expected something else",
	defined: () => "expected value",
	inside: (values) => "expected value inside " + values,
	instance: (name) => "expected instance " + name,
	len: (min, max) => `expected value with length between ${min} and ${max}`,
	lenless: () => "expected value with length",
	range: (min, max) => `expected number ranging from ${min} to ${max}`,
	format: (re) => "expected format " + re,
	type: (type) => "expected type " + type,
	value: (value) => "expected value " + value,
	field: (fields) => "unexpected field(s) " + fields,
} as const;
