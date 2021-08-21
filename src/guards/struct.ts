import { Context, object } from "..";
import { Guard, KV } from "../types";

export const struct = <T extends KV<Guard> | readonly Guard[]>(
	members: T,
	strict = true
): Guard<{ [k in keyof T]: T[k] extends Guard<infer X> ? X : never }> => {
	const entries = Object.entries(members);
	return (value, context = new Context()): value is any => {
		if (!object(value, context)) return false;
		if (strict) {
			const remaining = new Set(Object.keys(value));
			for (const [key] of entries) remaining.delete(key);
			if (remaining.size !== 0) return context.error("field", [...remaining]);
		}
		let ok = true;
		for (const [key, guard] of entries) {
			if (!guard(value[key], context.extend(key))) {
				if (context.isShortCircuit()) return false;
				ok = false;
			}
		}
		return ok;
	};
};
