import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { type EmailOtpType } from "@supabase/supabase-js";
import supabase from "@/utils/supabase";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Confirm() {
    const navigate = useNavigate();
    const query = useQuery();

    const confirm_email = async () => {
        const token_hash = query.get("token_hash");
        const type = query.get("type") as EmailOtpType | null;

        const allowedTypes: EmailOtpType[] = [
            "email",
            "signup",
            "invite",
            "magiclink",
            "recovery",
            "email_change",
        ];

        if (token_hash && type && allowedTypes.includes(type)) {
            const { error } = await supabase.auth.verifyOtp({
                type,
                token_hash,
            });

            if (!error) {
                navigate("/dashboard");
            } else {
                console.error("Verification error:", error.message);
            }
        } else {
            console.error("Missing or invalid token/type");
        }
    };

    useEffect(() => {
        confirm_email();
    }, []);

    return <div>Verifying your email...</div>;
}
