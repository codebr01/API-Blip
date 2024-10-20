import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { env } from "../env";
import jwt from "jsonwebtoken";
import axios from "axios";

const JWT_SECRET = env.TOKEN_SECRET;

export async function authUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/auth",
    {
      schema: {
        body: z.object({
          api_key: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { api_key } = request.body;

      try {
        const response = await axios.post(
          "https://http.msging.net/commands",
          {
            id: "1",
            to: "postmaster@blip.ai",
            method: "get",
            uri: "/applications",
          },
          {
            headers: {
              Authorization: `${api_key}`,
            },
          }
        );

        if (response.status === 200) {
          const token = jwt.sign({ api_key }, JWT_SECRET, { expiresIn: "1h" });
          return { token };
        }
      } catch (error) {
        return reply.status(401).send({ message: "Chave de API inválida" });
      }
    }
  );
}
