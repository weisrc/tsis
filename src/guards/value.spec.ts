import { Context, ErrorLevel, messages, value } from "..";

const isOk = value("hello");

const data = {
	"value - error level: none": [
		{
			level: ErrorLevel.None,
			input: "hello",
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: "",
			errors: {},
			ok: false,
		},
	],
	"value - error level: one": [
		{
			level: ErrorLevel.One,
			input: 0,
			errors: {
				"": [messages.value("hello")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: "hello",
			errors: {},
			ok: true,
		},
	],
};

for (const [title, examples] of Object.entries(data)) {
	describe(title, () => {
		for (const [i, { level, input, errors, ok }] of examples.entries()) {
			test("" + i, () => {
				const context = new Context(level);
				expect(isOk(input, context)).toBe(ok);
				expect(context.errors).toEqual(errors);
			});
		}
	});
}

test("has default context", () => {
	expect(isOk("hello")).toBe(true);
});
