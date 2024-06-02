import { HashProvider } from "@authentication/infra/hash-provider";
import { SignupUseCase } from "../signup.usecase";

describe("Signup Usecase", () => {
  const hashProvider = new HashProvider();
  const userRepository = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  test("should throw an error if password and confirmPassword do not match", async () => {
    const input = {
      name: "any_name",
      email: "any_email",
      password: "any_password",
      confirmPassword: "different_password",
    };
    const sut = new SignupUseCase(userRepository, hashProvider);
    await expect(sut.execute(input)).rejects.toThrow("Passwords do not match");
  });

  test("should throw an error if user already exists", async () => {
    userRepository.findByEmail.mockResolvedValueOnce({ id: "any_id" });
    const input = {
      name: "any_name",
      email: "any_email",
      password: "any_password",
      confirmPassword: "any_password",
    };
    const sut = new SignupUseCase(userRepository, hashProvider);
    await expect(sut.execute(input)).rejects.toThrow("User already exists");
  });

  test("should realize signup user", async () => {
    userRepository.findByEmail.mockResolvedValueOnce(undefined);
    const hashSpy = jest.spyOn(hashProvider, "hash");
    const input = {
      name: "any_name",
      email: "any_email",
      password: "any_password",
      confirmPassword: "any_password",
    };
    const sut = new SignupUseCase(userRepository, hashProvider);
    await sut.execute(input);
    expect(hashSpy).toHaveBeenCalledWith("any_password");
    expect(userRepository.findByEmail).toHaveBeenCalledWith("any_email");
    expect(userRepository.create).toHaveBeenCalledTimes(1);
  });
});
