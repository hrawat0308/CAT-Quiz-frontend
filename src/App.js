import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './component/login/login';
import Dashboard from "./component/dashboard/dashboard";

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  // { path: '/dashboard', element: <Dashboard /> }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
