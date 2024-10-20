import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from '../../lib/axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Message {
  id: string;
  content: string;
  direction: "sent" | "received";
  storageDate: string;
}

export function ConversationPage() {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAuth, setIsAuth] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const validToken = async () => {
      try {
        if (!token) {
          setIsAuth(false);
          navigate('/login');
          return;
        }

        const response = await api.post("/validate", { token });
        const isValid = response.data.valid;

        if (isValid) {
          setIsAuth(true);
          fetchMessages();
        } else {
          setIsAuth(false);
          toast.error(`${response.data.message}`);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } catch (error) {
        setIsAuth(false);
        navigate('/login');
      }
    };
    validToken();
  }, [navigate, token]);

  const fetchMessages = async () => {

    const api_key = localStorage.getItem("api_key");
    const response = await api.get(`/contato/${id}/messages`, {
      headers: {
        Authorization: `${api_key}`,
      },
    });

    if (response.status !== 200) {
      setMessages([])
      return;
    }

    setMessages(response.data.messages);

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <ToastContainer />
      <div className="w-full max-w-3xl p-6 space-y-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Conversa com o Contato</h2>
        {isAuth ? (
          <div className="space-y-4">
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${message.direction === "sent" ? "bg-blue-500 text-white self-end" : "bg-gray-100 text-gray-800 self-start"
                      }`}
                    style={{ maxWidth: "75%", marginLeft: message.direction === "sent" ? "auto" : "0" }}
                  >
                    <p>{message.content}</p>
                    <span className="block mt-2 text-xs text-gray-500">
                      {new Date(message.storageDate).toLocaleString("pt-BR", {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </span>

                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">Nenhuma mensagem encontrada.</p>
            )}
          </div>
        ) : (
          <h1>Redirecionando para o login...</h1>
        )}
      </div>
    </div>
  );
}
