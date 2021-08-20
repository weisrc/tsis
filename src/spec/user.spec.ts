import {
	and,
	Context,
	ErrorLevel,
	format,
	formats,
	len,
	messages,
	or,
	range,
	string,
	struct,
	value,
} from "..";

const isUser = struct({
	name: and(string, len(5, 255)),
	age: range(0, 127),
	gender: or(value("male"), value("female"), value("other")),
	contact: struct({
		email: format(formats.email, "email"),
		phone: format(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "phone"),
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
			".age": [messages.type("number")],
			".contact": [messages.type("object")],
			".gender.#0": [messages.value("male")],
			".gender.#1": [messages.value("female")],
			".gender.#2": [messages.value("other")],
			".name": [messages.type("string"), messages.lenless()],
		},
	},
	{
		input: {
			name: "Bob123",
			age: 20,
			gender: "male",
			contact: {
				email: "bob123@domain.tld",
				phone: "123-456-7890",
			},
		},
		ok: true,
		errors: {},
	},
];

describe("spec user", () => {
	for (const [i, { input, ok, errors }] of examples.entries()) {
		test("" + i, () => {
			const context = new Context(ErrorLevel.Gold);
			expect(isUser(input, context)).toBe(ok);
			expect(context.errors).toEqual(errors);
		});
	}
});
