import 'express-session';

// Add userId to the session object
declare module 'express-session' {
  interface Session {
    userId: number;
  }
}

// Add optional user to the request object, excluding password
declare module "express-serve-static-core" {
  interface Request {
    user?: Omit<Awaited<ReturnType<typeof userRepository.getById>>, "password">;
  }
}
