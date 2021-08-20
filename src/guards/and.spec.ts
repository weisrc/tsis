import { Context, ErrorLevel, and, string, len, messages } from "..";

const isOk = and(string, len(0, 3));

const data = {
	"and - error level: none": [
		{
			level: ErrorLevel.None,
			input: "",
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: "1234",
			errors: {},
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: 1,
			errors: {},
			ok: false,
		},
	],
	"and - error level: one": [
		{
			level: ErrorLevel.One,
			input: "1234",
			errors: {
				"": [messages.len(0, 3)],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: 1,
			errors: {
				"": [messages.type("string")],
			},
			ok: false,
		},
	],
	"and - error level: all": [
		{
			level: ErrorLevel.All,
			input: 1,
			errors: {
				"": [messages.type("string"), messages.lenless()],
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
