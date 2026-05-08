import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import CreateJob from "./pages/CreateJob";

import ProtectedRoute from "./routes/ProtectedRoute";

import Executions from "./pages/Executions";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/create-job"
          element={
            <ProtectedRoute>

              <CreateJob />

            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:jobId/executions"
          element={
            <ProtectedRoute>

              <Executions />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;