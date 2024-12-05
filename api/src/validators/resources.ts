import { z } from "zod";

export const createResource = z.object({
    name: z.string({
        required_error: "Nome do recurso é obrigatório!",
        invalid_type_error: "Nome do recurso é obrigatório!",
    }),
    description: z.string({
        required_error: "A descrição é obrigatório!",
        invalid_type_error: "A descrição é obrigatório!",
    }),
    categoryId: z.number({
        required_error: "A categoria é obrigatório!",
        invalid_type_error: "A categoria é obrigatório!",
    }),
});

export type CreateResourceInput = z.infer<typeof createResource> & {
    companyId: number;
};
