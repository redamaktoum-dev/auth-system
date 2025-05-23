import bcryptjs from "bcryptjs";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export const hashPassword = async (password: string) => {
  return await bcryptjs.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcryptjs.compare(password, hashedPassword);
};
