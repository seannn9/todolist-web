import { Routes, Route } from "react-router";
import SidebarLayout from "./components/sidebar-layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/auth/Register";
import Confirm from "./pages/auth/Confirm";
import NotFound from "./pages/NotFound";
import supabase from "./utils/supabase";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const { data } = await supabase.auth.getUser();
        console.log(data);
    };
    return (
        <SidebarLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth/confirm" element={<Confirm />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </SidebarLayout>
    );
}

export default App;
