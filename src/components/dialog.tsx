import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { FormEventHandler } from "react";
import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import DatePicker from "./date-picker";

interface DialogProps {
    action: "update" | "add";
    inputVal: string;
    deadline?: Date | undefined;
    onSubmit: ({ task, date, time }: TaskType) => void;
    loading: boolean;
}

interface TaskType {
    task: string;
    date: Date | undefined;
    time?: string;
}

export default function DialogComponent({
    action,
    inputVal,
    deadline,
    onSubmit,
    loading,
}: DialogProps) {
    const [task, setTask] = useState(action === "update" ? inputVal : "");
    const [error, setError] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [time, setTime] = useState("");

    useEffect(() => {
        setTask(inputVal);
    }, [inputVal]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setError("");
        if (task.trim() === "") {
            setError("Input something first");
            return;
        } else {
            onSubmit({
                task: task,
                date: date,
                time: time,
            });
        }
        if (action === "add") {
            setTask("");
        }
    };
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-primary">
                    {action === "update" ? "Edit " : "Add "}Task
                </DialogTitle>
                <DialogDescription>
                    {action === "update"
                        ? "Update the details of your task here. Click save when you're done."
                        : "Add your task here. Click add when you're done"}
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <div className=" flex flex-col gap-2">
                        <Label htmlFor="task">Task</Label>
                        <Input
                            id="task"
                            name="task"
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            required
                        />
                        {error && <span className="text-primary">{error}</span>}
                    </div>
                    <DatePicker
                        deadline={deadline}
                        onDataSend={({ date, time }) => {
                            setDate(date);
                            setTime(time);
                        }}
                    />
                </div>
                <DialogFooter className="mt-4 justify-center">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setTask(inputVal);

                                setError("");
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" disabled={loading}>
                        {!loading && action === "update"
                            ? "Save Changes"
                            : !loading && action === "add"
                            ? "Add"
                            : "Loading..."}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
