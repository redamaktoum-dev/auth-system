import { User } from "@/features/users/schema";
import { omit } from "@/lib/omit";

export const omitPassword = (user: User): Omit<User, "password"> => {
  return omit(user, ["password"]);
};