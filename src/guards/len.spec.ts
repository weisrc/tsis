import { Context, ErrorLevel, len, messages } from "..";

const isOk = len(0, 3);

const data = {
	"len - error level: none": [
		{
			level: ErrorLevel.None,
			input: "",
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: [],
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: 1,
			errors: {},
			ok: false,
		},
		{
			level: ErrorLevel.None,
			input: [0, 1, 2, 3],
			errors: {},
			ok: false,
		},
	],
	"len - error level: one": [
		{
			level: ErrorLevel.One,
			input: 0,
			errors: {
				"": [messages.lenless()],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: "0123",
			errors: {
				"": [messages.len(0, 3)],
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
	expect(isOk("")).toBe(true);
});
