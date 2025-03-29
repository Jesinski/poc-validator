import { ChainableValidator } from "../../../pkg/base/ChainableValidator";

export class EmailFormatValidation extends ChainableValidator {
  protected validateInternal(payload: any): string[] {
    const email = payload.email;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return ["Email is not in valid format"];
    } else {
      return [];
    }
  }
}
