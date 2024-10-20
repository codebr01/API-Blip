import type { FastifyInstance } from "fastify";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import z from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { env } from "../env";
import { ClientError } from "../errors/client-error";

interface Message {
  id: string;
  storageDate: string;
  content: string;
}

interface ApiResponse {
  resource: {
    items: Message[];
    total: number;
  },
  status: string;
}


export async function getComments(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/contato/:identity/messages', {
    schema: {
      params: z.object({
        identity: z.string()
      }),
    },
  },

    async (request, reply) => {

      const apiKey = request.headers.authorization?.split(" ")[1];
      const { identity } = request.params

      if (!apiKey) {
        return reply.status(401).send({ message: "Chave de API não fornecida" });
      }

      const response = await axios.post<ApiResponse>(
        `https://${env.CONTRACT_ID}.http.msging.net/commands`,
        {
          id: uuidv4(),
          to: "postmaster@crm.msging.net",
          method: "get",
          uri: `/contacts/${identity}/comments`
        },
        {
          headers: {
            Authorization: `Key ${apiKey}`,
            "Content-Type": "application/json",
          }
        }
      );

      if (response.data.status === "failure") {
        throw new ClientError("Nehuma mensagem encontrada")
      }

      return { messages: response.data.resource.items }

    });
}
