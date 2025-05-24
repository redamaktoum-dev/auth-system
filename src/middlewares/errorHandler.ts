import { Request, Response, NextFunction } from "express";
import { AppError } from "@/lib/error";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = err instanceof AppError
    ? err
    : new AppError("Internal Server Error");

  res.status(error.statusCode).json({
    error: error.message,
  });
}
