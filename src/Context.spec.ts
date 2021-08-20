import { Context, ErrorLevel } from ".";

test("Context default error level is none", () => {
	const context = new Context();
	expect(context.errorLevel).toBe(ErrorLevel.None);
});
