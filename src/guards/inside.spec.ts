import { Context, ErrorLevel, inside, messages } from "..";

const insideValues = [1, "ok"];
const isOk = inside(insideValues);

const data = {
	"inside - error level: none": [
		{
			level: ErrorLevel.None,
			input: "ok",
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: 1,
			errors: {},
			ok: true,
		},
		{
			level: ErrorLevel.None,
			input: "no",
			errors: {},
			ok: false,
		},
	],
	"inside - error level: one": [
		{
			level: ErrorLevel.One,
			input: 0,
			errors: {
				"": [messages.inside(insideValues)],
			},
			ok: false,
		},
		{
			level: ErrorLevel.One,
			input: "ok",
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
	expect(isOk("ok")).toBe(true);
});
