import { Context, ErrorLevel, list, messages, string } from "..";

const isOk = list(string);

const data = {
	"list - error level: none": [
		{
			level: ErrorLevel.None,
			input: "",
			errors: {},
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: [1],
			errors: {},
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: [],
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: ["string"],
			errors: {},
			ok: true,
		},
	],
	"list - error level: one": [
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
			input: [0, 1],
			errors: {
				".0": [messages.type("string")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: [],
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.One,
			input: ["string"],
			errors: {},
			ok: true,
		},
	],
	"list - error level: all": [
		{
			level: ErrorLevel.All,
			input: ["string", 0, 1],
			errors: {
				".1": [messages.type("string")],
				".2": [messages.type("string")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.All,
			input: ["string"],
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
	expect(isOk(["ok"])).toBe(true);
});
