import { Context, ErrorLevel, messages, defined } from "..";

const isOk = defined;

const data = {
	"defined - error level: none": [
		{
			level: ErrorLevel.None,
			input: 0,
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: undefined,
			errors: {},
			ok: false,
		},
	],
	"defined - error level: one": [
		{
			level: ErrorLevel.One,
			input: undefined,
			errors: {
				"": [messages.defined()],
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
	expect(isOk("")).toBe(true);
});
