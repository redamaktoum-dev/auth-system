import { userRepository } from "@/features/users/repository";
import { comparePassword } from "@/lib/hash";
import { omitPassword } from "@/lib/omitPassword";

const DUMMY_PASSWORD = "$2b$10$invalidsaltinvalidsaltinvAlidSaltInvAlid";

export const authService = {
  login: async (identifier: string, password: string) => {

    const user = await userRepository.getUserByEmailOrUsername(identifier);
    if (!user) {
      await comparePassword(password, DUMMY_PASSWORD); // Dummy compare
      throw new Error("Invalid credentials.");
    }
    
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials.");
    }

    return omitPassword(user);
  },

};