import routes from "./routes";
import { RouterProvider } from "react-router-dom";
import "./style.scss";
import { AuthProvider } from "./features/auth/auth.context";

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  )
}

export default App
