import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LoginPage } from './pages/login'
import { HomePage } from './pages/home'
import { ConversationPage } from './pages/conversation'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/contato/:id",
    element: <ConversationPage/>
  }
])

export function App() {

  return <RouterProvider router={router}/>

}
