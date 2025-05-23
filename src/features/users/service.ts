import { userRepository } from "./repository";
import { CreateUserSchema, SafeUser } from "./types";
import { NewUser } from "./schema";
import { omitPassword } from "@/lib/omitPassword";
import { hashPassword } from "@/lib/hash";

export const userService = {
  createUser: async (user: CreateUserSchema): Promise<SafeUser> => {

    // Check if user already exists with username
    const existingUserUsername = await userRepository.getByUsername(user.username);
    if (existingUserUsername) {
      throw new Error("Username or email may already be in use.");
    }

    // Check if user already exists with email
    const existingUserEmail = await userRepository.getByEmail(user.email);
    if (existingUserEmail) {
      throw new Error("Username or email may already be in use.");
    }

    // Hash password
    const hashedPassword = await hashPassword(user.password);
  
    // Create user object with hashed password
    const safeUser: NewUser = {
      ...user,
      password: hashedPassword
    }


    // Create user in database
    const createdUser = await userRepository.create(safeUser);
    if (!createdUser) {
      throw new Error("Unable to register. Please try again or use different credentials.");
    }

    // Return user
    return omitPassword(createdUser);
  },
  
};