import { Context, FAILURE } from "..";
import { Contract } from "../types";

export const guardql = (contract: Contract, value: unknown, context: Context = new Context()) => {
	if (typeof value !== "object") return { ___fatal___: "a query is an object" };
	const returned = {};
	for (const [k, v] of Object.entries(value)) {
		const splitted = k.split(/\s*:\s*/, 2);
		const [alias, name] = splitted.length === 2 ? splitted : [k, k];
		if (name in contract) {
			const c = context.copy();
			const data = contract[name](v, c);
			if (data === FAILURE) returned[alias] = { errors: context.errors };
			else returned[alias] = { data };
		} else {
			returned[alias] = { fatal: "requested function does not exist" };
		}
	}
	return returned;
};
