import { Context, ErrorLevel, messages, or, struct, value } from "..";

const isOk = or(
	struct({
		data: value("A"),
		next: or(
			struct({
				data: value("B"),
				next: struct({
					data: value("C"),
				}),
			}),
			struct({
				data: value("C"),
				next: struct({
					data: value("B"),
				}),
			})
		),
	}),
	struct({
		data: value("B"),
		next: or(
			struct({
				data: value("A"),
				next: struct({
					data: value("C"),
				}),
			}),
			struct({
				data: value("C"),
				next: struct({
					data: value("A"),
				}),
			})
		),
	}),
	struct({
		data: value("C"),
		next: or(
			struct({
				data: value("B"),
				next: struct({
					data: value("A"),
				}),
			}),
			struct({
				data: value("A"),
				next: struct({
					data: value("B"),
				}),
			})
		),
	})
);

const examples = [
	{
		input: "",
		ok: false,
		errors: {
			".#0": [messages.type("object")],
			".#1": [messages.type("object")],
			".#2": [messages.type("object")],
		},
	},
	{
		input: {},
		ok: false,
		errors: {
			".#0.data": [messages.value("A")],
			".#0.next.#0": [messages.type("object")],
			".#0.next.#1": [messages.type("object")],
			".#1.data": [messages.value("B")],
			".#1.next.#0": [messages.type("object")],
			".#1.next.#1": [messages.type("object")],
			".#2.data": [messages.value("C")],
			".#2.next.#0": [messages.type("object")],
			".#2.next.#1": [messages.type("object")],
		},
	},
	{
		input: {
			next: {
				next: {},
			},
		},
		ok: false,
		errors: {
			".#0.data": [messages.value("A")],
			".#0.next.#0.data": [messages.value("B")],
			".#0.next.#0.next.data": [messages.value("C")],
			".#0.next.#1.data": [messages.value("C")],
			".#0.next.#1.next.data": [messages.value("B")],
			".#1.data": [messages.value("B")],
			".#1.next.#0.data": [messages.value("A")],
			".#1.next.#0.next.data": [messages.value("C")],
			".#1.next.#1.data": [messages.value("C")],
			".#1.next.#1.next.data": [messages.value("A")],
			".#2.data": [messages.value("C")],
			".#2.next.#0.data": [messages.value("B")],
			".#2.next.#0.next.data": [messages.value("A")],
			".#2.next.#1.data": [messages.value("A")],
			".#2.next.#1.next.data": [messages.value("B")],
		},
	},
	{
		input: {
			data: "B",
			next: {
				data: "C",
				next: {
					data: "A",
				},
			},
		},
		ok: true,
		errors: {},
	},
];

describe("spec gold", () => {
	for (const [i, { input, ok, errors }] of examples.entries()) {
		test("" + i, () => {
			const context = new Context(ErrorLevel.Gold);
			expect(isOk(input, context)).toBe(ok);
			expect(context.errors).toEqual(errors);
		});
	}
});
