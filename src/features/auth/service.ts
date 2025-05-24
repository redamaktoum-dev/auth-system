import { userRepository } from "@/features/users/repository";
import { comparePassword } from "@/lib/hash";
import { omitPassword } from "@/lib/omitPassword";
import { AppError } from "@/lib/error";

const DUMMY_PASSWORD = "$2b$10$invalidsaltinvalidsaltinvAlidSaltInvAlid";

export const authService = {
  login: async (identifier: string, password: string) => {

    const user = await userRepository.getUserByEmailOrUsername(identifier);
    if (!user) {
      await comparePassword(password, DUMMY_PASSWORD); // Dummy compare
      throw new AppError("Invalid credentials.", 401);
    }
    
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new AppError("Invalid credentials.", 401);

    return omitPassword(user);
  },

};