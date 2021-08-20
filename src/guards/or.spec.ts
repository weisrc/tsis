import { Context, ErrorLevel, or, messages, string, number } from "..";

const isOk = or(string, number);

const data = {
	"or - error level: none": [
		{
			level: ErrorLevel.None,
			input: "",
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: 0,
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: false,
			errors: {},
			ok: false,
		},
	],
	"or - error level: one": [
		{
			level: ErrorLevel.One,
			input: false,
			errors: {
				"": [messages.or()],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: 0,
			errors: {},
			ok: true,
		},
	],
	"or - error level: all": [
		{
			level: ErrorLevel.All,
			input: false,
			errors: {
				"": [messages.or()],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: 0,
			errors: {},
			ok: true,
		},
	],
	"or - error level: gold": [
		{
			level: ErrorLevel.Gold,
			input: false,
			errors: {
				".#0": [messages.type("string")],
				".#1": [messages.type("number")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.Gold,
			input: 0,
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
	expect(isOk(0)).toBe(true);
});
