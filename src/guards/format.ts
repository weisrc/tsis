import { Context, string } from "..";
import { Guard } from "../types";

type Validator = RegExp | ((v: string) => boolean);

export const format = (validator: Validator, format: string, kind = "format"): Guard<string> => {
	if (typeof validator === "function") {
		return (value, context = new Context()): value is any => {
			if (!string(value, context)) return false;
			if (!validator(value)) return context.error(kind, format);
			return true;
		};
	}
	return (value, context = new Context()): value is any => {
		if (!string(value, context)) return false;
		if (!validator.test(value)) return context.error(kind, format);
		return true;
	};
};
