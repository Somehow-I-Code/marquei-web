import { FastifyInstance } from "fastify";
import HttpError from "./utils/http-error";
import { toggleProfile } from "./utils/toggle-profile";
import httpCodes from "./utils/http-codes";

export async function updateProfileActivate(server: FastifyInstance) {
    server.patch("/profile/activate/:profileId", async (request, reply) => {
        try {
            const res = await toggleProfile(request, true);
            return reply.status(httpCodes.SUCCESS).send(res);
        } catch (e) {
            if (e instanceof HttpError) {
                return reply.status(e.code).send({ message: e.message });
            }
            return reply.status(httpCodes.SERVER_ERROR).send({ message: "Algo deu errado!" });
        }
    });
}