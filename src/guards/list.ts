import { array, Context } from "..";
import { Guard } from "../types";

export const list =
	<T extends Guard>(guard: T): Guard<(T extends Guard<infer X> ? X : never)[]> =>
	(value, context = new Context()): value is any => {
		if (!array(value, context)) return false;
		let ok = true;
		for (const [i, v] of value.entries()) {
			if (!guard(v, context.extend("" + i))) {
				if (context.isShortCircuit()) return false;
				ok = false;
			}
		}
		return ok;
	};
