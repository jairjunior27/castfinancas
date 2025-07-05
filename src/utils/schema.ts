import { z } from "zod";
export const signupSchema = z.object({
  nome: z
    .string({ message: "Favor inserir os dados" })
    .min(4, { message: "Minimo de 4 caracteres" }),
    idade: z.string()
    .min(1, "A idade é obrigatória.")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 120,
      {
        message: "A idade deve ser um número entre 1 e 120.",
      }
    ),
    email: z.string({ message: "Favor inserir os dados" }).email({message: "Email invalido"})
});
