import { array, Context, struct } from "..";
import { Guard } from "../types";

export const tuple = <T extends readonly Guard[]>(...guards: T): Guard<T> => {
	const guard = struct<T>(guards);
	return (value, context = new Context()): value is any =>
		array(value, context) && guard(value, context);
};
