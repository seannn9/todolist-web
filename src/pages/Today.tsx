import supabase from "@/utils/supabase";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import React from "react";
import { useAuth } from "@/context/AuthProvider";

interface TasksToday {
    id: number;
    task: string;
    deadline?: Date | undefined;
}

export default function Today() {
    const [tasksToday, setTasksToday] = useState<TasksToday[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const [guestTask, setGuestTask] = useState<
        { id: number; task: string; deadline: Date | undefined }[]
    >([]);

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
            today.getDate() + 1
        ).toISOString();

        try {
            if (user) {
                const { data, error } = await supabase
                    .from("tasks")
                    .select("*")
                    .gte("deadline", startOfDay)
                    .lt("deadline", endOfDay);
                if (error) console.error(error);
                else setTasksToday(data);
            } else {
                const guestTaskToday = localStorage.getItem("tasks");
                const taskArray = guestTaskToday
                    ? JSON.parse(guestTaskToday)
                    : [];
                const showOnlyTaskToday = taskArray.filter(
                    (t: { deadline: Date | undefined }) =>
                        t.deadline &&
                        new Date(t.deadline).setHours(0, 0, 0, 0) ==
                            new Date().setHours(0, 0, 0, 0)
                );
                setGuestTask(showOnlyTaskToday);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="w-full bg-background flex flex-col flex-1 py-10 px-5 sm:px-10">
            <header className="text-2xl sm:text-3xl font-bold text-primary tracking-wide">
                {tasksToday.length !== 0 || guestTask.length !== 0 ? (
                    <h1>Tasks Today</h1>
                ) : isLoading ? (
                    <h1>Loading Tasks...</h1>
                ) : (
                    <h1>You Don't Have Any Deadlines Today</h1>
                )}
            </header>
            <div className="my-5">
                {!isLoading
                    ? (user ? tasksToday : guestTask).length !== 0 && (
                          <section className="w-full h-fit border-2 p-4 border-border rounded-sm text-[1rem]">
                              <Separator className="mb-2" />
                              <div className="flex flex-col gap-2">
                                  {(user ? tasksToday : guestTask).map(
                                      (task) => (
                                          <React.Fragment key={task.id}>
                                              <li className="flex items-center">
                                                  <h4 className="m-2">
                                                      <span className="flex items-center">
                                                          <span className="text-task-indicator-today text-3xl">
                                                              &bull;
                                                          </span>
                                                          <span className="ml-2">
                                                              {task.task}
                                                          </span>
                                                      </span>
                                                  </h4>
                                              </li>
                                              <Separator />
                                          </React.Fragment>
                                      )
                                  )}
                              </div>
                          </section>
                      )
                    : null}
            </div>
        </section>
    );
}
