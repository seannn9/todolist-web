import { Routes, Route } from "react-router";
import SidebarLayout from "./components/sidebar-layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/auth/Register";
import Confirm from "./pages/auth/Confirm";
import NotFound from "./pages/NotFound";
import {
    LoggedInRoute,
    ProtectedRoute,
} from "./components/auth/protected-route";
import Completed from "./pages/Completed";
import Today from "./pages/Today";

function App() {
    return (
        <SidebarLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={
                        <LoggedInRoute>
                            <Login />
                        </LoggedInRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <LoggedInRoute>
                            <Register />
                        </LoggedInRoute>
                    }
                />
                <Route path="/auth/confirm" element={<Confirm />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/completed"
                    element={
                        <ProtectedRoute>
                            <Completed />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/today"
                    element={
                        <ProtectedRoute>
                            <Today />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </SidebarLayout>
    );
}

export default App;
