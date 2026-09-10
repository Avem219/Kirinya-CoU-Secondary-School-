import bcrypt from "bcryptjs";

// bcryptjs (pure JavaScript, no native bindings) rather than node's native
// bcrypt or a hand-rolled scheme — this environment's sandbox reliably
// installs pure-JS npm packages, and bcrypt is a standard, well-reviewed
// password hashing algorithm. We are not inventing cryptography here.
const SALT_ROUNDS = 12;

export async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

export async function verifyPassword(
  plainPassword: string,
  passwordHash: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, passwordHash);
}
