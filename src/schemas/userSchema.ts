import { z } from "zod";

export const userBaseSchema = z.object({
  name: z
    .string({
      invalid_type_error: "O name precisa ser uma string",
      required_error: "O name é obrigatório",
    })
    .nonempty({ message: "O name não pode ser vazio" }),
  email: z
    .string({
      invalid_type_error: "O email precisa ser uma string",
      required_error: "O email é obrigatório",
    })
    .nonempty({ message: "O email não pode ser vazio" })
    .email("Email inválido"),
  password: z.string({
    invalid_type_error: "A senha precisa ser uma string",
    required_error: "A senha é obrigatória",
  }),
});

export const ceoSchema = z
  .object({
    cpf: z
      .string({
        invalid_type_error: "Cpf precisa ser uma string",
        required_error: "Cpf é obrigatório",
      })
      .nonempty({ message: "O cpf não pode ser vazio" })
      .length(11, { message: "O cpf precisa ter 11 dígitos" }),
  })
  .merge(userBaseSchema);

export type CreateUserSchema = z.infer<typeof userBaseSchema>;
export type CreateCeoSchema = z.infer<typeof ceoSchema>;
