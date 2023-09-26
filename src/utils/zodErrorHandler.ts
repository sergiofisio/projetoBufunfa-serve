import { z } from "zod";
type HandledError = {
  status: number;
  message: string | string[];
};

export const handleError = (error: unknown): HandledError => {
  if (error instanceof z.ZodError) {
    return {
      status: 400,
      message: error.errors.flatMap((err) => {
        if (err.code === "unrecognized_keys") {
          return [err.message, ...err.keys];
        } else {
          return err.message;
        }
      }),
    };
  }
  return {
    status: 500,
    message: "Internal server error",
  };
};
