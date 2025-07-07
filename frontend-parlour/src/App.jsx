import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Tasks from "./pages/Tasks";
import Attendance from "./pages/Attendance";
import socket from "./socket"; 
import Register from "./pages/Register";
import PunchAttendance from "./pages/PunchAttendance";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/dashboard" element={
            
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />

          <Route path="/employees" element={
            <ProtectedRoute>
              <RoleRoute allowed={["superadmin", "admin"]}>
                <Employees />
              </RoleRoute>
            </ProtectedRoute>
          } />

          <Route path="/tasks" element={
            <ProtectedRoute>
              <RoleRoute allowed={["superadmin", "admin"]}>
                <Tasks />
              </RoleRoute>
            </ProtectedRoute>
          } />

          <Route path="/attendance" element={
            <ProtectedRoute><Attendance /></ProtectedRoute>
          } />
              <Route path="/punch" element={<PunchAttendance />} />

          <Route path="*" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
