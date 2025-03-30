import { ChainableValidator } from "../../../../../../src/pkg";

export class EmailHasAtSignValidation extends ChainableValidator {
  protected async validateInternal(payload: any): Promise<string[]> {
    const email = payload.email;
    if (!email.includes("@")) {
      return ["Email is missing @ sign"];
    } else {
      return [];
    }
  }
}
