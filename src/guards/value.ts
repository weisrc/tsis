import { Narrowable, Guard, Context } from "..";

export const value = <T extends Narrowable>(expectedValue: T, kind = "value"): Guard<T> => {
	return (value, context = new Context()): value is any => {
		if (value === expectedValue) return true;
		context.error(kind, expectedValue);
		return false;
	};
};
