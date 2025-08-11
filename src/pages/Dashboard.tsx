import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import supabase from "@/utils/supabase";
import React, { useState, useEffect } from "react";
import { Pen, Trash, X } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import DialogComponent from "@/components/dialog";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AlertDialogComponent from "@/components/alert-dialog";

interface UserTasks {
    id: number;
    task: string;
    deadline?: Date;
}

interface FormError {
    task?: string;
}

export default function Dashboard() {
    const [tasks, setTasks] = useState<UserTasks[]>([]);
    const [userTask, setUserTask] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<FormError>({});

    useEffect(() => {
        const channels = supabase
            .channel("custom-all-channel")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "Tasks" },
                (payload) => {
                    console.log("Change received!", payload);
                    fetchUserTasks();
                }
            )
            .subscribe();
        return () => {
            supabase.removeChannel(channels);
        };
    }, []);

    useEffect(() => {
        // const cachedTasks = localStorage.getItem("tasks");
        // if (cachedTasks) {
        //     setTasks(JSON.parse(cachedTasks));
        // } else {
        //     fetchUserTasks();
        // }
        fetchUserTasks();
    }, []);

    const fetchUserTasks = async () => {
        try {
            const { data, error } = await supabase
                .from("Tasks")
                .select("*, created_at")
                .order("id", { ascending: true });
            if (error) {
                console.log(error);
            } else setTasks(data);
            // localStorage.setItem("tasks", JSON.stringify(data));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const addTask = async () => {
        const { error } = await supabase
            .from("Tasks")
            .insert({ task: userTask });
        if (error) {
            console.log(error);
        }
        fetchUserTasks();
        setUserTask("");
    };

    const updateTask = async ({ id, task }: UserTasks) => {
        const { error } = await supabase
            .from("Tasks")
            .update({ task: task })
            .eq("id", id);
        if (error) {
            console.log(error);
        }
        console.log(id, task);
        fetchUserTasks();
    };

    const deleteTask = async (removeTaskId: number) => {
        const { error } = await supabase
            .from("Tasks")
            .delete()
            .eq("id", removeTaskId);
        if (error) {
            console.log(error);
        }
        fetchUserTasks();
    };

    const handleSubmit = (e: React.FormEvent) => {
        setError({ task: "" });
        e.preventDefault();
        const errors = validate(userTask);
        setError(errors);
        if (Object.keys(errors).length === 0) {
            addTask();
        } else {
            console.log(errors.task);
        }
    };

    const validate = (userTask: string): FormError => {
        const errors: FormError = {};
        if (!userTask) {
            errors.task = "Enter a task first...";
        }
        return errors;
    };

    return (
        <section className="w-full bg-background flex flex-col flex-1 py-5 px-5 sm:px-10">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div>
                <form
                    className="flex items-center my-5 gap-4"
                    onSubmit={handleSubmit}
                >
                    <div className="relative">
                        <Input
                            type="text"
                            className={cn(
                                "md:w-[350px] font-bold pr-8",
                                error?.task
                                    ? "!placeholder-red-400"
                                    : "!placeholder-muted-foreground"
                            )}
                            value={userTask.trimStart()}
                            placeholder={error?.task || "Type something..."}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setUserTask(e.target.value)}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted/50"
                            onClick={() => setUserTask("")}
                        >
                            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            <span className="sr-only">Clear input</span>
                        </Button>
                    </div>
                    <Button
                        disabled={isLoading ? true : false}
                        className="cursor-pointer"
                        type="submit"
                    >
                        Add Task
                    </Button>
                </form>
            </div>

            <section className="w-full h-fit border-2 p-4 border-border text-[1rem]">
                {tasks.length !== 0 ? (
                    <h2 className="text-xl font-semibold">Your To-Dos</h2>
                ) : isLoading ? (
                    <h2 className="text-xl font-semibold">Loading Tasks...</h2>
                ) : (
                    <h2 className="text-xl font-semibold">
                        Start By Adding To-Dos
                    </h2>
                )}
                <Separator className="mt-2" />
                {!isLoading && (
                    <div className=" flex flex-col gap-2 mt-4">
                        {tasks &&
                            tasks.map((task) => (
                                <React.Fragment key={task.id}>
                                    <li
                                        className="flex justify-between"
                                        key={task.id}
                                    >
                                        <h4>
                                            Task {task.id}: {task.task}
                                        </h4>
                                        <div className="flex items-center gap-4">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Pen
                                                        color="gray"
                                                        className="cursor-pointer"
                                                    />
                                                </DialogTrigger>
                                                <DialogComponent
                                                    inputVal={task.task}
                                                    onSubmit={(newTask) => {
                                                        updateTask({
                                                            id: task.id,
                                                            task: newTask,
                                                        });
                                                    }}
                                                />
                                            </Dialog>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Trash
                                                        color="var(--primary)"
                                                        className="cursor-pointer"
                                                    />
                                                </AlertDialogTrigger>
                                                <AlertDialogComponent
                                                    task={task.task}
                                                    onClick={() =>
                                                        deleteTask(task.id)
                                                    }
                                                />
                                            </AlertDialog>
                                        </div>
                                    </li>
                                    <Separator />
                                </React.Fragment>
                            ))}
                    </div>
                )}
            </section>
        </section>
    );
}
