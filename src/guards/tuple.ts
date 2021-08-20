import { array, Context, Guard, struct } from "..";

export const tuple = <T extends readonly Guard[]>(...guards: T): Guard<T> => {
	const guard = struct<T>(guards);
	return (value, context = new Context()): value is any =>
		array(value, context) && guard(value, context);
};
