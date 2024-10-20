import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { env } from "../env";
import jwt from "jsonwebtoken";

const JWT_SECRET = env.TOKEN_SECRET;

export async function validateKey(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/validate",
    {
      schema: {
        body: z.object({
          token: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { token } = request.body;

      if(!token) {
        return reply.status(400).send({ message: "Token não fornecido" });
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET);
  
        return reply.status(200).send({ valid: true, decoded, message: "Token válido" });
      } catch (error) {
        
        return reply.status(401).send({ valid: false, message: "Token inválido ou expirado" });
      }

    }
  );
}
