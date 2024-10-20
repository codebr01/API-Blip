import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from '../../lib/axios';
import { useNavigate } from "react-router-dom";

interface Contact {
  id: string;
  identity: string;
  name: string;
}

export function HomePage() {
  const [isAuth, setIsAuth] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5);
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
          localStorage.setItem("api_key", response.data.decoded.api_key)
          fetchContacts();
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

  const fetchContacts = async () => {
    try {

      const api_key = localStorage.getItem("api_key")

      const response = await api.get("/contacts", {
        headers: {
          Authorization: `${api_key}`
        }
      });

      setContacts(response.data.contacts);
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    }
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <ToastContainer />
      <div className="w-full max-w-2xl p-6 space-y-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Lista de Contatos</h2>
        {isAuth ? (
          <div>
            {currentContacts.length > 0 ? (
              <ul className="space-y-4">
                {currentContacts.map((contact) => (
                  <li
                    key={contact.identity}
                    className="p-4 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
                    onClick={() => navigate(`/contato/${contact.identity}`)}
                  >
                    {contact.name || "Nome não disponível"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Nenhum contato encontrado.</p>
            )}
            <div className="flex justify-center space-x-2 mt-4">
              {Array.from({ length: Math.ceil(contacts.length / contactsPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <h1>Redirecionando para o login...</h1>
        )}
      </div>
    </div>
  );
}
