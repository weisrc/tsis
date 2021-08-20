import { Context, Guard } from "..";

export const defined: Guard<Required<any>> = (value, context = new Context()): value is any => {
	if (value !== undefined) return true;
	context.error("defined");
	return false;
};
