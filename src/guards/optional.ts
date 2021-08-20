import { none } from ".";
import { Context, Guard, GuardTypeOf } from "..";

export const optional = <T extends Guard>(guard: T): Guard<GuardTypeOf<T>> => {
	return (value, context = new Context()): value is any => {
		if (none(value, context.silent())) return true;
		return guard(value, context);
	};
};
