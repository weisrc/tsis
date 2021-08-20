import { Context, ErrorLevel, messages, type } from "..";

const isOk = type<number>("number", "something that does not exist");

test("messages default", () => {
	const context = new Context(ErrorLevel.Gold);
	expect(isOk("not a number", context)).toBe(false);
	expect(context.errors).toEqual({ "": [messages.default()] });
});
