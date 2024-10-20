import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from '../../lib/axios';
import { useNavigate } from "react-router-dom";

export function LoginPage() {

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const apiKey = data.get('apiKey')?.toString();

    try {

      const response = await api.post("/auth", { api_key: apiKey })

      const { token } = response.data

      localStorage.setItem("token", token)

      toast.success("Chave de API válida");

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      toast.error("Chave de API inválida");

      setTimeout(() => {
        navigate('/login')
      }, 2000);
    }
    
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <ToastContainer/>
      <div className="w-full max-w-sm p-6 space-y-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-semibold text-gray-700">
              Chave de API do Blip
            </label>
            <input
              type="text"
              name="apiKey"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Insira a chave de API"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Entrar
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Por favor, insira uma chave de API válida para continuar.
        </p>
      </div>
    </div>
  );
}
