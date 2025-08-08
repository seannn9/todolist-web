import { Routes, Route } from "react-router";
import SidebarLayout from "./components/sidebar-layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <SidebarLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </SidebarLayout>
    );
}

export default App;
