import supabase from "@/utils/supabase";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import React from "react";

interface CompletedTasks {
    id: number;
    task: string;
    date_completed?: Date | undefined;
}

export default function Completed() {
    const [completedTasks, setCompletedTasks] = useState<CompletedTasks[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCompletedTasks();
    }, []);

    const fetchCompletedTasks = async () => {
        try {
            const { data, error } = await supabase
                .from("completed_tasks")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) console.error(error);
            else setCompletedTasks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="w-full bg-background flex flex-col flex-1 p-5 sm:px-10">
            <header className="text-xl sm:text-3xl font-bold text-primary tracking-wide">
                {completedTasks.length !== 0 ? (
                    <h1>Completed Tasks</h1>
                ) : isLoading ? (
                    <h1>Loading Tasks...</h1>
                ) : (
                    <h1>You Haven't Completed Any Tasks Yet</h1>
                )}
            </header>
            <div className="my-5">
                {!isLoading && completedTasks.length !== 0 && (
                    <section className="w-full h-fit border-2 p-4 border-border rounded-sm text-[1rem]">
                        <Separator className="mb-2" />
                        <div className="flex flex-col gap-2">
                            {completedTasks &&
                                completedTasks.map((task) => (
                                    <React.Fragment key={task.id}>
                                        <li className="flex items-center">
                                            <h4 className="m-2">
                                                <span className="text-primary">
                                                    {"-> "}
                                                </span>
                                                {task.task}
                                            </h4>
                                        </li>
                                        <Separator />
                                    </React.Fragment>
                                ))}
                        </div>
                    </section>
                )}
            </div>
        </section>
    );
}
