import supabase from "@/utils/supabase";
import { type Session, type User } from "@supabase/supabase-js";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext<{
    session: Session | null | undefined;
    user: User | null | undefined;
    loading: boolean;
    signOut: () => void;
}>({ session: null, user: null, loading: true, signOut: () => {} });

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User>();
    const [session, setSession] = useState<Session>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setData = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();
            if (error) console.error(error);
            setSession(session ?? undefined);
            setUser(session?.user);
            setLoading(false);
        };

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session ?? undefined);
                setUser(session?.user);
                setLoading(false);
            }
        );

        setData();

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const value = {
        session,
        user,
        loading,
        signOut: () => supabase.auth.signOut(),
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
