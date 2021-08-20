import { number } from ".";
import { Context, Guard } from "..";

export const range = (min: number, max: number, kind = "range"): Guard<number> => {
	return (value: unknown, context = new Context()): value is any => {
		if (!number(value, context)) return false;
		if (value >= min && value <= max) return true;
		return context.error(kind, min, max);
	};
};
