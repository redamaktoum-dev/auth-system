import { userRepository } from "./repository";
import { CreateUserSchema, SafeUser } from "./types";
import { NewUser } from "./schema";
import { omitPassword } from "@/lib/omitPassword";
import { hashPassword } from "@/lib/hash";
import { AppError } from "@/lib/error";


export const userService = {
  createUser: async (user: CreateUserSchema): Promise<SafeUser> => {

    // Check if user already exists with username
    const existingUserUsername = await userRepository.getByUsername(user.username);
    if (existingUserUsername) throw new AppError("Username or email may already be in use.", 409);

    // Check if user already exists with email
    const existingUserEmail = await userRepository.getByEmail(user.email);
    if (existingUserEmail) throw new AppError("Username or email may already be in use.", 409);

    // Hash password
    const hashedPassword = await hashPassword(user.password);
  
    // Create user object with hashed password
    const safeUser: NewUser = {
      ...user,
      password: hashedPassword
    }


    // Create user in database
    const createdUser = await userRepository.create(safeUser);
    if (!createdUser) throw new AppError("Unable to register. Please try again or use different credentials.", 422);

    // Return user
    return omitPassword(createdUser);
  },
  
};