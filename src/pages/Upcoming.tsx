import supabase from "@/utils/supabase";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import React from "react";

interface UpcomingTasks {
    id: number;
    task: string;
    deadline?: Date | undefined;
}

export default function Upcoming() {
    const [upcomingTasks, setUpcomingTasks] = useState<UpcomingTasks[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTasksToday();
    }, []);

    const fetchTasksToday = async () => {
        const today = new Date();
        const startOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ).toISOString();
        const endOfDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 7
        ).toISOString();

        try {
            const { data, error } = await supabase
                .from("tasks")
                .select("*")
                .gte("deadline", startOfDay)
                .lte("deadline", endOfDay);
            if (error) console.error(error);
            else setUpcomingTasks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="w-full bg-background flex flex-col flex-1 p-5 sm:px-10">
            <header className="text-xl sm:text-3xl font-bold text-primary tracking-wide">
                {upcomingTasks.length !== 0 ? (
                    <h1>Upcoming Tasks For The Week</h1>
                ) : isLoading ? (
                    <h1>Loading Tasks...</h1>
                ) : (
                    <h1>You Don't Have Any Upcoming Tasks</h1>
                )}
            </header>
            <div className="my-5">
                {!isLoading && upcomingTasks.length !== 0 && (
                    <section className="w-full h-fit border-2 p-4 border-border rounded-sm text-[1rem]">
                        <Separator className="mb-2" />
                        <div className="flex flex-col gap-2">
                            {upcomingTasks &&
                                upcomingTasks.map((task) => (
                                    <React.Fragment key={task.id}>
                                        <li className="flex items-center">
                                            <h4 className="flex flex-wrap m-2 w-full">
                                                <span className="text-primary">
                                                    {"-> "}{" "}
                                                    <span className="text-foreground">
                                                        {task.task}
                                                    </span>
                                                </span>

                                                <span className="ml-auto text-muted-foreground">
                                                    Deadline:{" "}
                                                    {task.deadline &&
                                                        new Date(
                                                            task.deadline
                                                        ).toDateString()}
                                                </span>
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
