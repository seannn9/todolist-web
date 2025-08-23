import supabase from "@/utils/supabase";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import React from "react";
import { useAuth } from "@/context/AuthProvider";

interface CompletedTasks {
    id: number;
    task: string;
    date_completed?: Date | undefined;
}

export default function Completed() {
    const [completedTasks, setCompletedTasks] = useState<CompletedTasks[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const [guestTask, setGuestTask] = useState<
        {
            id: number;
            task: string;
            deadline: Date | undefined;
            date_completed: Date | undefined;
        }[]
    >([]);

    useEffect(() => {
        fetchCompletedTasks();
    }, []);

    const fetchCompletedTasks = async () => {
        try {
            if (user) {
                const { data, error } = await supabase
                    .from("completed_tasks")
                    .select("*")
                    .order("created_at", { ascending: false });
                if (error) console.error(error);
                else setCompletedTasks(data);
            } else {
                setGuestTask(
                    JSON.parse(localStorage.getItem("completed_tasks") || "[]")
                );
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
                {completedTasks.length !== 0 || guestTask.length !== 0 ? (
                    <h1>Completed Tasks</h1>
                ) : isLoading ? (
                    <h1>Loading Tasks...</h1>
                ) : (
                    <h1>You Haven't Completed Any Tasks Yet</h1>
                )}
            </header>
            <div className="my-5">
                {!isLoading
                    ? (user ? completedTasks : guestTask).length !== 0 && (
                          <section className="w-full h-fit border-2 p-4 border-border rounded-sm text-[1rem]">
                              <Separator className="mb-2" />
                              <div className="flex flex-col gap-2">
                                  {(user ? completedTasks : guestTask).map(
                                      (task) => (
                                          <React.Fragment key={task.id}>
                                              <li className="flex items-center">
                                                  <h4 className="flex flex-wrap m-2 w-full">
                                                      <span className="text-task-indicator-upcoming">
                                                          &#10003;
                                                          <span className="text-foreground ml-2">
                                                              {task.task}
                                                          </span>
                                                      </span>

                                                      <span className="ml-auto text-muted-foreground">
                                                          Date Completed:{" "}
                                                          {task.date_completed &&
                                                              new Date(
                                                                  task.date_completed
                                                              ).toDateString()}
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
