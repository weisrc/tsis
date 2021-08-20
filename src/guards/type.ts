import { Context, Guard } from "..";

export const type = <T>(expectedType: string, kind = "type"): Guard<T> => {
	return (value, context = new Context()): value is any => {
		if (typeof value === expectedType) return true;
		context.error(kind, expectedType);
		return false;
	};
};
