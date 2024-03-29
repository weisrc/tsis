import { messages as defaultMessages } from "./guards/messages";
import { Errors, Messages } from "./types";

export enum ErrorLevel {
	None,
	One,
	All,
	Gold,
}

export class Context {
	constructor(
		public errorLevel: ErrorLevel = ErrorLevel.None,
		public messages: Messages = defaultMessages,
		public path: string = "",
		public errors: Errors = {}
	) {}
	copy(): Context {
		return new Context(this.errorLevel, this.messages, this.path, { ...this.errors });
	}
	silent(): Context {
		return new Context(ErrorLevel.None, this.messages, this.path, this.errors);
	}
	extend(path: string) {
		return new Context(this.errorLevel, this.messages, this.path + "." + path, this.errors);
	}
	error(kind: string, ...data: any[]) {
		const message = this.messages[kind in this.messages ? kind : "default"](...data);
		if (this.errorLevel > ErrorLevel.None) {
			const { path } = this;
			if (path in this.errors) this.errors[path].push(message);
			else this.errors[path] = [message];
		}
		return false;
	}
	isShortCircuit(): boolean {
		return this.errorLevel <= ErrorLevel.One;
	}
	isGoldError(): boolean {
		return this.errorLevel >= ErrorLevel.Gold;
	}
}
