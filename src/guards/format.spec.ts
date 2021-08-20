import { Context, ErrorLevel, format, messages } from "..";

const isOkFn = format((v: string) => v.startsWith("hello"), "hello");
const isOkRe = format(/^hello/, "hello");

const data = {
	"format - error level: none": [
		{
			level: ErrorLevel.None,
			input: 0,
			errors: {},
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: "",
			errors: {},
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: "hello",
			errors: {},
			ok: true,
		},
	],
	"format - error level: one": [
		{
			level: ErrorLevel.One,
			input: 0,
			errors: {
				"": [messages.type("string")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: "",
			errors: {
				"": [messages.format("hello")],
			},
			ok: false,
		},
	],
	"format - error level: all": [
		{
			level: ErrorLevel.All,
			input: 0,
			errors: {
				"": [messages.type("string")],
			},
			ok: false,
		},
	],
};

for (const [title, examples] of Object.entries(data)) {
	describe(title, () => {
		for (const [i, { level, input, errors, ok }] of examples.entries()) {
			test(i + " function", () => {
				const context = new Context(level);
				expect(isOkFn(input, context)).toBe(ok);
				expect(context.errors).toEqual(errors);
			});
			test(i + "regex", () => {
				const context = new Context(level);
				expect(isOkRe(input, context)).toBe(ok);
				expect(context.errors).toEqual(errors);
			});
		}
	});
}

test("fn has default context", () => {
	expect(isOkFn("hello")).toBe(true);
});

test("re has default context", () => {
	expect(isOkRe("hello")).toBe(true);
});
