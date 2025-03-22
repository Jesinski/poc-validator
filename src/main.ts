import { UserValidator } from "./validators/UserValidator";

// Main validator encapsulates all the required validations
const userValidator = new UserValidator();

const payload1 = {
  name: "A", // Invalid
  age: 25,
  email: "aaa@aaa.",
  street: "123 Main St",
  zipCode: "12345",
};

const payload2 = {
  name: "John",
  age: 19,
  email: "a@a.com",
  street: "aaaaaa",
  zipCode: "123",
};

console.log("payload1");
console.log(userValidator.validate(payload1));
console.log("payload2");
console.log(userValidator.validate(payload2));
