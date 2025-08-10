import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { useState, type FormEventHandler } from "react";
import supabase from "@/utils/supabase";
import { AuthError } from "@supabase/supabase-js";

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState<AuthError>();
    const [isLoading, setIsLoading] = useState(false);

    const signUpNewUser: FormEventHandler = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        first_name: username,
                    },
                },
            });
            if (error) {
                console.log(error.code);
                setAuthError(error);
            } else {
                setIsLoading(false);
                setEmail("");
                setUsername("");
                setPassword("");
                setAuthError(undefined);
                console.log("User created: ", data);
                navigate("/");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Create an account</CardTitle>
                    <CardDescription>
                        Enter your email below to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={signUpNewUser}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="display_name">Username</Label>
                                <Input
                                    id="display_name"
                                    name="display_name"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            {authError && (
                                <div className="text-primary">
                                    {authError.message}
                                </div>
                            )}
                            <div className="flex flex-col gap-3">
                                <Button
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-full"
                                >
                                    {isLoading ? "Processing..." : "Register"}
                                </Button>
                                <Button
                                    disabled
                                    variant="outline"
                                    className="w-full"
                                >
                                    Login with Google
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="underline underline-offset-4"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
