import { Context, ErrorLevel, Guard, GuardTypeOf, UnionToIntersection } from "..";

export const and = <T extends Guard[]>(
	...guards: T
): Guard<UnionToIntersection<GuardTypeOf<T[number]>>> => {
	return (value, context = new Context()): value is any => {
		let ok = true;
		for (const guard of guards) {
			if (!guard(value, context)) {
				if (context.errorLevel < ErrorLevel.All) return false;
				ok = false;
			}
		}
		return ok;
	};
};
