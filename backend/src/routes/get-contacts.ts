import type { FastifyInstance } from "fastify";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

interface Contact {
  id: string;
  name: string;
}

interface ApiResponse {
  resource: {
    items: Contact[];
  };
}

export async function getContacts(app: FastifyInstance) {
  app.get("/contacts", async (request, reply) => {
    const apiKey = request.headers.authorization?.split(" ")[1];

    if (!apiKey) {
      return reply.status(401).send({ message: "Chave de API não fornecida" });
    }

    try {
      const response = await axios.post<ApiResponse>(
        "https://http.msging.net/commands",
        {
          id: uuidv4(),
          to: "postmaster@crm.msging.net",
          method: "get",
          uri: "/contacts?$skip=0&$take=10",
        },
        {
          headers: {
            Authorization: `Key ${apiKey}`,
            "Content-Type": "application/json",
          }
        }
      );

      console.log(response.data.resource.items)

      return { contacts: response.data.resource.items }
      
    } catch (error) {
      console.error("Erro ao buscar os contatos:", error);

      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  });
}
