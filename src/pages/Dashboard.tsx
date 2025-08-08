import supabase from "@/utils/supabase";
import { useState } from "react";

interface UserTasks {
    id: number;
    task: string;
}

export default function Dashboard() {
    const [tasks, setTasks] = useState<UserTasks[]>([]);
    const [userTask, setUserTask] = useState("");
    return (
        <section className="w-full flex flex-1 justify-center items-center">
            <h1>Dashboard</h1>
        </section>
    );
}
