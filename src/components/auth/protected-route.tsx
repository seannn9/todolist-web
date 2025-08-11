import { Navigate } from "react-router";
import { useAuth } from "@/context/AuthProvider";

export function ProtectedRoute({ children }: any) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
}

export function LoggedInRoute({ children }: any) {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/dashboard" />;
    }
    return <>{children}</>;
}
