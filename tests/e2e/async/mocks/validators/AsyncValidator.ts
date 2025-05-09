import {
  CreateChain,
  CreateComposite,
  CreateValidation,
} from "../../../../../src/pkg";
import { AddressChain } from "../chains/AddressChain";
import { simulateAsyncCall } from "../simulateAsyncCall";
import { AgeValidation } from "../validations/AgeValidation";

export const asyncValidator = CreateComposite([
  CreateComposite([
    new AgeValidation(),
    CreateChain([
      CreateValidation(async (payload: any) => {
        await simulateAsyncCall();
        if (!payload.email) {
          return { valid: false, messages: ["Email is required"] };
        } else {
          return { valid: true, messages: [] };
        }
      }),
      CreateValidation(async (payload: any) => {
        await simulateAsyncCall();
        const email = payload.email;
        if (email.length < 5) {
          return {
            valid: false,
            messages: ["Email must be at least 5 characters long"],
          };
        } else {
          return { valid: true, messages: [] };
        }
      }),
    ]),
  ]),
  new AddressChain(),
]);

export const AsyncValidator = async (payload: any) => {
  return await asyncValidator.validate(payload);
};
