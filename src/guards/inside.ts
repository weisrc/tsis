import { Narrowable, Guard } from "..";
import { Context } from "../Context";

export const inside = <T extends readonly Narrowable[]>(
	values: T,
	kind = "inside"
): Guard<T[number]> => {
	return (value, context = new Context()): value is any => {
		if (values.includes(value as T[number])) return true;
		context.error(kind, values);
		return false;
	};
};
