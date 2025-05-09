import { strict as assert } from "assert";
import { UserValidator } from "./mocks/validators/UserValidator";

const VALID_PAYLOAD = {
  name: "John Doe",
  age: 25,
  email: "john.doe@example.com",
  street: "123 Main St",
  zipCode: "12345",
};

describe("Class Based Validator", () => {
  it("should return no messages when the payload is valid", async () => {
    const validator = new UserValidator();

    const validationMessages = await validator.validate(VALID_PAYLOAD);
    assert.deepEqual(validationMessages, { valid: true, messages: [] });
  });

  it("should return an error when the name is too short", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, name: "Jo" };
    const validator = new UserValidator();

    const validationMessages = await validator.validate(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Name is too short"],
    });
  });

  it("should return an error when the user is too young", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, age: 17 };
    const validator = new UserValidator();

    const validationMessages = await validator.validate(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Age must be over 18"],
    });
  });

  it("should return an error when the email is missing", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: undefined };
    const validator = new UserValidator();

    const validationMessages = await validator.validate(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Email is required"],
    });
  });

  it("should return an error when the email is too short", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: "a@b." };
    const validator = new UserValidator();

    const validationMessages = await validator.validate(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Email must be at least 5 characters long"],
    });
  });

  it("should return an error when the email is too long", async () => {
    const invalidPayload = {
      ...VALID_PAYLOAD,
      email: "a".repeat(51) + "@example.com",
    };
    const validator = new UserValidator();

    const validationMessages = await validator.validate(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Email is too long"],
    });
  });

  it("should return an error when the email is missing '@' sign", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: "johndoeexample.com" };
    const validator = new UserValidator();

    const validationMessages = await validator.validate(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Email is missing @ sign"],
    });
  });

  it("should return an error when the email is missing a domain", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: "johndoe@" };
    const validator = new UserValidator();

    const validationMessages = await validator.validate(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Email is missing domain"],
    });
  });

  it("should return an error when the street is missing", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, street: undefined };
    const validator = new UserValidator();

    const validationMessages = await validator.validate(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Street is required"],
    });
  });

  it("should return an error when the zip code is invalid", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, zipCode: "1234" };
    const validator = new UserValidator();

    const validationMessages = await validator.validate(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Invalid zip code"],
    });
  });

  it("should return all errors in a composite", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, age: 16, street: undefined };
    const validator = new UserValidator();

    const validationMessages = await validator.validate(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Age must be over 18", "Street is required"],
    });
  });

  it("should return only the first error message of a chain", async () => {
    const invalidPayload = { ...VALID_PAYLOAD, email: "abc" };
    const validator = new UserValidator();

    const validationMessages = await validator.validate(invalidPayload);
    assert.deepEqual(validationMessages, {
      valid: false,
      messages: ["Email must be at least 5 characters long"],
    });
  });
});
