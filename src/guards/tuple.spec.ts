import { Context, ErrorLevel, tuple, messages, string, number } from "..";

const isOk = tuple(string, number);

const data = {
	"tuple - error level: none": [
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
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: ["", ""],
			errors: {},
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: ["", 0],
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: ["", 0, ""],
			errors: {},
			ok: false,
		},
	],
	"tuple - error level: one": [
		{
			level: ErrorLevel.One,
			input: "",
			errors: {
				"": [messages.instance("Array")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: [],
			errors: {
				".0": [messages.type("string")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: ["", ""],
			errors: {
				".1": [messages.type("number")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: ["", 0],
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.One,
			input: ["", 0, ""],
			errors: {
				"": [messages.field([2])],
			},
			ok: false,
		},
	],
	"tuple - error level: all": [
		{
			level: ErrorLevel.All,
			input: "",
			errors: {
				"": [messages.instance("Array")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.All,
			input: [],
			errors: {
				".0": [messages.type("string")],
				".1": [messages.type("number")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.All,
			input: ["", ""],
			errors: {
				".1": [messages.type("number")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.All,
			input: ["", 0],
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.All,
			input: ["", 0, ""],
			errors: {
				"": [messages.field([2])],
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
	expect(isOk(["", 0])).toBe(true);
});
