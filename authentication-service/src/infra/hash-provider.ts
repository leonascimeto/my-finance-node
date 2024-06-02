import bcrypt from "bcryptjs";

export class HashProvider {
  private readonly SALT = 10;

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.SALT);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
