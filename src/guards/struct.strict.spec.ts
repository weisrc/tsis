import { Context, ErrorLevel, struct, messages, string, number } from "..";

const isOk = struct({
	name: string,
	age: number,
});

const data = {
	"struct.strict - error level: none": [
		{
			level: ErrorLevel.None,
			input: "",
			errors: {},
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: {},
			errors: {},
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: {
				name: 0,
				age: 0,
			},
			errors: {},
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: {
				name: "",
				age: 0,
			},
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: {
				name: "",
				age: 0,
				extra: 0,
			},
			errors: {},
			ok: false,
		},
	],
	"struct.strict - error level: one": [
		{
			level: ErrorLevel.One,
			input: "",
			errors: {
				"": [messages.type("object")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: {},
			errors: {
				".name": [messages.type("string")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: {
				name: "",
				age: "",
			},
			errors: {
				".age": [messages.type("number")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: {
				name: "",
				age: 0,
			},
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.One,
			input: {
				name: "",
				age: 0,
				extra: 0,
			},
			errors: {
				"": [messages.field(["extra"])],
			},
			ok: false,
		},
	],
	"struct.strict - error level: all": [
		{
			level: ErrorLevel.All,
			input: "",
			errors: {
				"": [messages.type("object")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.All,
			input: {},
			errors: {
				".name": [messages.type("string")],
				".age": [messages.type("number")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.All,
			input: {
				name: "",
				age: "",
			},
			errors: {
				".age": [messages.type("number")],
			},
			ok: false,
		},
		{
			level: ErrorLevel.All,
			input: {
				name: "",
				age: 0,
			},
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.All,
			input: {
				name: "",
				age: 0,
				extra: 0,
			},
			errors: {
				"": [messages.field(["extra"])],
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
	expect(
		isOk({
			name: "",
			age: 0,
		})
	).toBe(true);
});
