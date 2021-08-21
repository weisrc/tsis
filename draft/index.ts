import { struct, string, Guard, GuardTypeOf } from "../src";

type FN<I extends Guard> = (i: GuardTypeOf<I>) => any;

function bond<I extends Guard>(i: I, fn: FN<I>) {}

bond(
	struct({
		name: string,
	}),
	({ name }) => ({ name })
);
