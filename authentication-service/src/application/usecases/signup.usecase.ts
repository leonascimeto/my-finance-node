import { HashProvider } from "@authentication/infra/hash-provider";

export class SignupUseCase {
  constructor(
    private readonly userRepository: any,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({ name, email, password, confirmPassword }: Input) {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new Error("User already exists");
    }
    const hashedPassword = await this.hashProvider.hash(password);
    await this.userRepository.create({ name, email, hashedPassword });
  }
}

export type Input = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
