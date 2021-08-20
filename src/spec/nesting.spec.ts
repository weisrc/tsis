import { Context, ErrorLevel, messages, struct, or, value } from "..";

const isOk = struct({
	child: struct({
		child: struct({
			child: struct({
				child: struct({
					message: or(value("hello"), value("bye")),
				}),
			}),
		}),
	}),
});

const examples = [
	{
		input: "",
		ok: false,
		errors: {
			"": [messages.type("object")],
		},
	},
	{
		input: {},
		ok: false,
		errors: {
			".child": [messages.type("object")],
		},
	},
	{
		input: {
			child: {
				child: {
					child: {
						child: {
							message: "nope",
						},
					},
				},
			},
		},
		ok: false,
		errors: {
			".child.child.child.child.message.#0": [messages.value("hello")],
			".child.child.child.child.message.#1": [messages.value("bye")],
		},
	},
	{
		input: {
			child: {
				child: {
					child: {
						message: "hello",
					},
				},
			},
		},
		ok: false,
		errors: {
			".child.child.child": [messages.field(["message"])],
		},
	},
	{
		input: {
			child: {
				child: {
					child: {
						child: {
							message: "hello",
						},
					},
				},
			},
		},
		ok: true,
		errors: {},
	},
];

describe("spec nesting", () => {
	for (const [i, { input, ok, errors }] of examples.entries()) {
		test("" + i, () => {
			const context = new Context(ErrorLevel.Gold);
			expect(isOk(input, context)).toBe(ok);
			expect(context.errors).toEqual(errors);
		});
	}
});
