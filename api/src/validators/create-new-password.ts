import z from "zod";

export const createNewPasswordSchema = z.object({
    newPassword: z.string().min(8, {
        message: "A senha nova deve conter no mínimo 8 caracteres.",
    }),
    repeatPassword: z.string().min(8, {
        message: "A confirmação de senha deve conter no mínimo 8 caracteres.",
    }),
});

export type CreateNewPasswordInput = z.infer<typeof createNewPasswordSchema>;
