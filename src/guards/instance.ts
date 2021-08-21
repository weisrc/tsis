import { Context } from "..";
import { Guard } from "../types";

export const instance = <T extends () => void>(
	expectedInstance: T,
	kind = "instance"
): Guard<ReturnType<T>> => {
	return (value, context = new Context()): value is any => {
		if (value instanceof expectedInstance) return true;
		context.error(kind, expectedInstance.name);
		return false;
	};
};
