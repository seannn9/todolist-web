import { Button } from "@/components/ui/button";
import supabase from "@/utils/supabase";
import React, { useState, useEffect } from "react";
import { Ellipsis, SquarePen, Trash, CircleCheckBig, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DialogComponent from "@/components/dialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AlertDialogComponent from "@/components/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthProvider";

interface UserTasks {
    id: number;
    task: string;
    deadline?: Date | undefined;
}

export default function Dashboard() {
    const [tasks, setTasks] = useState<UserTasks[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openAddTaskDialog, setOpenAddTaskDialiog] = useState(false);
    const [openDialogTaskId, setOpenDialogTaskId] = useState<number | null>(
        null
    );
    const [openDropdownTaskId, setOpenDropdownTaskId] = useState<number | null>(
        null
    );
    const [taskActionLoading, setTaskActionLoading] = useState(false);
    const today = new Date();
    const tomorrow = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
    ).toDateString();
    const { user } = useAuth();
    const [guestTask, setGuestTask] = useState<
        { id: number; task: string; deadline?: Date | undefined }[]
    >([]);

    useEffect(() => {
        const channels = supabase
            .channel("custom-all-channel")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "tasks" },
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
        fetchUserTasks();
    }, []);

    const fetchUserTasks = async () => {
        try {
            if (user) {
                const { data, error } = await supabase
                    .from("tasks")
                    .select("*, created_at")
                    .order("id", { ascending: true });
                if (error) {
                    console.error(error);
                } else {
                    setTasks(data);
                }
            } else {
                setGuestTask(JSON.parse(localStorage.getItem("tasks") || "[]"));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const addTask = async (task: string, deadline: Date | undefined) => {
        setTaskActionLoading(true);
        try {
            if (user) {
                const { error } = await supabase
                    .from("tasks")
                    .insert({ task: task, deadline: deadline });
                if (error) {
                    console.error(error);
                }
            } else {
                const existingTasks = localStorage.getItem("tasks");
                const tasksArray = existingTasks
                    ? JSON.parse(existingTasks)
                    : [];
                const nextId =
                    tasksArray.length > 0
                        ? Math.max(
                              ...tasksArray.map((t: { id: number }) => t.id)
                          ) + 1
                        : 1;
                const newTask = {
                    id: nextId,
                    task: task,
                    deadline: deadline,
                };
                tasksArray.push(newTask);
                localStorage.setItem("tasks", JSON.stringify(tasksArray));
            }
            fetchUserTasks();
        } finally {
            setOpenAddTaskDialiog(false);
            setTaskActionLoading(false);
        }
    };

    const updateTask = async ({ id, task, deadline }: UserTasks) => {
        setTaskActionLoading(true);
        try {
            if (user) {
                const { error } = await supabase
                    .from("tasks")
                    .update({ task: task, deadline: deadline })
                    .eq("id", id);
                if (error) {
                    console.error(error);
                }
            } else {
                const existingTasks = localStorage.getItem("tasks");
                const tasksArray = existingTasks
                    ? JSON.parse(existingTasks)
                    : [];
                const updatedTask = {
                    id: id,
                    task: task,
                    deadline: deadline,
                };
                const updatedTaskArray = tasksArray.map((t: { id: number }) =>
                    t.id === id ? updatedTask : t
                );
                localStorage.setItem("tasks", JSON.stringify(updatedTaskArray));
            }
            fetchUserTasks();
        } finally {
            setOpenDialogTaskId(null);
            setTaskActionLoading(false);
        }
    };

    const completeTask = async ({ task, id, deadline }: UserTasks) => {
        try {
            if (user) {
                const { error } = await supabase
                    .from("completed_tasks")
                    .insert({ task: task, task_id: id, deadline: deadline });
                if (error) {
                    console.error(error);
                } else {
                    console.log("Removed task from main task table");
                    deleteTask(id);
                }
            } else {
                const completedTasks = localStorage.getItem("completed_tasks");
                const completedTasksArray = completedTasks
                    ? JSON.parse(completedTasks)
                    : [];
                const nextId =
                    completedTasksArray.length > 0
                        ? Math.max(
                              ...completedTasksArray.map(
                                  (t: { id: number }) => t.id
                              )
                          ) + 1
                        : 1;
                const completedTask = {
                    id: nextId,
                    task_id: id,
                    task: task,
                    deadline: deadline,
                    date_completed: new Date(),
                };
                completedTasksArray.push(completedTask);
                localStorage.setItem(
                    "completed_tasks",
                    JSON.stringify(completedTasksArray)
                );
                deleteTask(id);
            }
        } finally {
            fetchUserTasks();
        }
    };

    const deleteTask = async (removeTaskId: number) => {
        if (user) {
            const { error } = await supabase
                .from("tasks")
                .delete()
                .eq("id", removeTaskId);
            if (error) {
                console.error(error);
            }
        } else {
            const existingTasks = localStorage.getItem("tasks");
            const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
            const updatedTaskArray = tasksArray.filter(
                (t: { id: number }) => t.id !== removeTaskId
            );
            localStorage.setItem("tasks", JSON.stringify(updatedTaskArray));
        }
        fetchUserTasks();
    };

    return (
        <section className="w-full bg-background flex flex-col flex-1 py-5 px-5 sm:px-10">
            <header className="text-xl sm:text-3xl font-bold text-primary tracking-wide">
                {tasks.length !== 0 || guestTask.length !== 0 ? (
                    <h1>Your Tasks</h1>
                ) : isLoading ? (
                    <h1>Loading Tasks...</h1>
                ) : (
                    <h1>Start By Adding To-Dos</h1>
                )}
            </header>
            <div className="my-5">
                <Dialog
                    open={openAddTaskDialog}
                    onOpenChange={setOpenAddTaskDialiog}
                >
                    <DialogTrigger asChild>
                        <Button type="button">
                            <Plus />
                            <span>Add Task</span>
                        </Button>
                    </DialogTrigger>
                    <DialogComponent
                        action="add"
                        inputVal=""
                        onSubmit={(TaskType) => {
                            addTask(TaskType.task, TaskType.date);
                        }}
                        loading={taskActionLoading}
                    />
                </Dialog>
            </div>
            {!isLoading
                ? (user ? tasks : guestTask).length !== 0 && (
                      <section className="w-full h-fit border-2 p-4 border-border rounded-sm text-[1rem]">
                          <Separator className="mb-2" />
                          <div className=" flex flex-col gap-2">
                              {(user ? tasks : guestTask).map((task) => (
                                  <React.Fragment key={task.id}>
                                      <li
                                          className="flex items-center"
                                          key={task.id}
                                      >
                                          <h4 className="flex flex-wrap m-2 w-full items-center">
                                              <span className="flex items-center">
                                                  <span
                                                      className={`text-3xl ${
                                                          task.deadline &&
                                                          (new Date(
                                                              task.deadline
                                                          ).toDateString() ===
                                                              today.toDateString() ||
                                                              new Date(
                                                                  task.deadline
                                                              ) < today)
                                                              ? "text-task-indicator-today"
                                                              : task.deadline &&
                                                                new Date(
                                                                    task.deadline
                                                                ).toDateString() ===
                                                                    tomorrow
                                                              ? "text-task-indicator-tomorrow"
                                                              : "text-task-indicator-upcoming"
                                                      }`}
                                                  >
                                                      &bull;
                                                  </span>
                                                  <span className="text-foreground ml-2">
                                                      {task.task}
                                                  </span>
                                              </span>
                                              {task.deadline && (
                                                  <span className="ml-auto text-muted-foreground">
                                                      {new Date(
                                                          task.deadline
                                                      ).setHours(0, 0, 0, 0) <
                                                      new Date().setHours(
                                                          0,
                                                          0,
                                                          0,
                                                          0
                                                      ) ? (
                                                          <span className="text-primary">
                                                              Overdue!{" "}
                                                          </span>
                                                      ) : (
                                                          "Deadline: "
                                                      )}
                                                      {new Date(
                                                          task.deadline
                                                      ).toDateString()}
                                                  </span>
                                              )}
                                          </h4>
                                          <div className="flex ml-auto items-center gap-4">
                                              <Dialog
                                                  open={
                                                      openDialogTaskId ===
                                                      task.id
                                                  }
                                                  onOpenChange={(isOpen) =>
                                                      setOpenDialogTaskId(
                                                          isOpen
                                                              ? task.id
                                                              : null
                                                      )
                                                  }
                                              >
                                                  <AlertDialog>
                                                      <DropdownMenu
                                                          open={
                                                              openDropdownTaskId ===
                                                              task.id
                                                          }
                                                          onOpenChange={(
                                                              isOpen
                                                          ) =>
                                                              setOpenDropdownTaskId(
                                                                  isOpen
                                                                      ? task.id
                                                                      : null
                                                              )
                                                          }
                                                      >
                                                          <DropdownMenuTrigger className="transition-all rounded-md data-[state=open]:bg-muted hover:bg-muted px-3 py-2 mr-2">
                                                              <Ellipsis />
                                                          </DropdownMenuTrigger>
                                                          <DropdownMenuContent
                                                              side="top"
                                                              align="end"
                                                              className="flex flex-col gap-1"
                                                          >
                                                              <DropdownMenuItem
                                                                  className="cursor-pointer"
                                                                  onSelect={() =>
                                                                      completeTask(
                                                                          {
                                                                              task: task.task,
                                                                              id: task.id,
                                                                              deadline:
                                                                                  task.deadline,
                                                                          }
                                                                      )
                                                                  }
                                                              >
                                                                  <CircleCheckBig />
                                                                  <span>
                                                                      Complete
                                                                  </span>
                                                              </DropdownMenuItem>
                                                              <DialogTrigger
                                                                  asChild
                                                              >
                                                                  <DropdownMenuItem
                                                                      className="cursor-pointer"
                                                                      onSelect={(
                                                                          e
                                                                      ) => {
                                                                          e.preventDefault();
                                                                          setOpenDropdownTaskId(
                                                                              null
                                                                          );
                                                                      }}
                                                                  >
                                                                      <SquarePen />
                                                                      <span>
                                                                          Edit
                                                                      </span>
                                                                  </DropdownMenuItem>
                                                              </DialogTrigger>
                                                              <AlertDialogTrigger className="w-full">
                                                                  <DropdownMenuItem
                                                                      className="cursor-pointer"
                                                                      onSelect={(
                                                                          e
                                                                      ) => {
                                                                          e.preventDefault();
                                                                          setOpenDropdownTaskId(
                                                                              null
                                                                          );
                                                                      }}
                                                                  >
                                                                      <Trash />
                                                                      <span>
                                                                          Delete
                                                                      </span>
                                                                  </DropdownMenuItem>
                                                              </AlertDialogTrigger>
                                                          </DropdownMenuContent>
                                                      </DropdownMenu>
                                                      <AlertDialogComponent
                                                          task={task.task}
                                                          onClick={() =>
                                                              deleteTask(
                                                                  task.id
                                                              )
                                                          }
                                                      />
                                                      <DialogComponent
                                                          action="update"
                                                          inputVal={task.task}
                                                          deadline={
                                                              task.deadline
                                                                  ? new Date(
                                                                        task.deadline
                                                                    )
                                                                  : undefined
                                                          }
                                                          onSubmit={(
                                                              TaskType
                                                          ) => {
                                                              updateTask({
                                                                  id: task.id,
                                                                  task: TaskType.task,
                                                                  deadline:
                                                                      TaskType.date,
                                                              });
                                                          }}
                                                          loading={
                                                              taskActionLoading
                                                          }
                                                      />
                                                  </AlertDialog>
                                              </Dialog>
                                          </div>
                                      </li>
                                      <Separator />
                                  </React.Fragment>
                              ))}
                          </div>
                      </section>
                  )
                : null}
        </section>
    );
}
