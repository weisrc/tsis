import { Context, ErrorLevel, type, messages } from "..";

const isOk = type<string>("string");

const data = {
	"type - error level: none": [
		{
			level: ErrorLevel.None,
			input: "string",
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: 0,
			errors: {},
			ok: false,
		},
	],
	"type - error level: one": [
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
			input: "string",
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
	expect(isOk("string")).toBe(true);
});
