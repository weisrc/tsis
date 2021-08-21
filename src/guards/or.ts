import { Context } from "..";
import { Guard } from "../types";

export const or = <T extends Guard[]>(...guards: T): T[number] => {
	return (value, context = new Context()): value is any => {
		if (context.isGoldError()) {
			const errors = { ...context.errors };
			for (const [i, guard] of Object.entries(guards)) {
				if (guard(value, context.extend(`#${i}`))) {
					context.errors = errors;
					return true;
				}
			}
		} else {
			for (const guard of guards) if (guard(value, context.silent())) return true;
			context.error("or");
		}
		return false;
	};
};
