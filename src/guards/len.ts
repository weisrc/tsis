import { Context } from "..";
import { Guard } from "../types";

export const len = (min: number, max: number, kind = "len"): Guard<[] | string> => {
	return (value: unknown, context = new Context()): value is any => {
		const length = Object(value).length;
		if (length === undefined) return context.error("lenless");
		if (length >= min && length <= max) return true;
		return context.error(kind, min, max);
	};
};
