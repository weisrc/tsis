import { Context } from "..";
import { Guard, Executor, GuardTypeOf, Resource } from "../types";

export const FAILURE = Symbol("FAILURE");

export const resource =
	<I extends Guard, O extends Guard = Guard>(
		guard: I,
		executor: Executor<GuardTypeOf<I>, GuardTypeOf<O>>,
		_output: O
	): Resource =>
	(value: GuardTypeOf<I>, context: Context) => {
		if (guard(value, context)) {
			return executor(value, context);
		}
		return FAILURE;
	};
