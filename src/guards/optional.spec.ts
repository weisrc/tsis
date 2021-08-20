import { Context, ErrorLevel, optional, messages, string } from "..";

const isOk = optional(string);

const data = {
	"optional - error level: none": [
		{
			level: ErrorLevel.None,
			input: undefined,
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: null,
			errors: {},
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: "string",
			errors: {},
			ok: true,
		},
	],
	"optional - error level: one": [
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
			input: undefined,
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.One,
			input: null,
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
			test("" + i, () => {
				const context = new Context(level);
				expect(isOk(input, context)).toBe(ok);
				expect(context.errors).toEqual(errors);
			});
		}
	});
}

test("has default context", () => {
	expect(isOk("ok")).toBe(true);
});
