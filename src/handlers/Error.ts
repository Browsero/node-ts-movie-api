export default class WebError extends Error {
  code: number;
  message: string;

  constructor(message: string, code = 500) {
    super(message);
    this.code = code;
    this.message = message;
  }
}
