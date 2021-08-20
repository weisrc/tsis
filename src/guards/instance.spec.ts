import { Context, ErrorLevel, instance, messages } from "..";

const isOk = instance(Array);

const data = {
	"instance - error level: none": [
		{
			level: ErrorLevel.None,
			input: "",
			errors: {},
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: [],
			errors: {},
			ok: true,
		},
	],
	"instance - error level: one": [
		{
			level: ErrorLevel.One,
			input: 0,
			errors: {
				"": [messages.instance("Array")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: [],
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
	expect(isOk([])).toBe(true);
});
