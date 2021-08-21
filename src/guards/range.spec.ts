import { Context, ErrorLevel, messages, range } from "..";

const isOk = range(0, 3);

const data = {
	"range - error level: none": [
		{
			level: ErrorLevel.None,
			input: "",
			errors: {},
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: 1,
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: 4,
			errors: {},
			ok: false,
		},
	],
	"range - error level: one": [
		{
			level: ErrorLevel.One,
			input: "",
			errors: {
				"": [messages.type("number")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: 1,
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.One,
			input: 4,
			errors: { "": [messages.range(0, 3)] },
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
	expect(isOk(1)).toBe(true);
});
