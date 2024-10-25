import { Level } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { verify } from "jsonwebtoken";
import profileRepository from "../../repositories/profiles";
import { getJwtSecret } from "./utils/get-jwt-secret";
import { getToken } from "./utils/get-token";
import httpCodes from "./utils/http-codes";

export async function ProfilesList(server: FastifyInstance) {
    server.get("/profiles-list", async (request, reply) => {
        const token = getToken(request.headers);
        const secretKey = getJwtSecret();

        if (!token) {
            return reply.status(httpCodes.BAD_REQUEST).send({ message: "Token inválido!" });
        }

        const userProfile = verify(token, secretKey) as {
            level: Level;
            companyId: number;
        };
        if (userProfile.level === Level.USER) {
            return reply.status(httpCodes.UNAUTHORIZED).send({
                message: "Você não tem permissão para acessar esta tela!",
            });
        }

        const isSudo = userProfile.level == Level.SUDO;
        const profiles = await profileRepository.findAll(
            userProfile.companyId,
            isSudo,
        );
        return reply.status(httpCodes.SUCCESS).send(profiles);
    });
}

