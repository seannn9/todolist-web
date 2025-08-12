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

interface DialogProps {
    inputVal: string;
    onSubmit: (newTask: string) => void;
}

export default function DialogComponent({ inputVal, onSubmit }: DialogProps) {
    const [newTask, setNewTask] = useState(inputVal);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setNewTask(inputVal);
    }, [inputVal]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setError("");
        if (newTask.trim() === "") {
            setError("Input something first");
            return;
        } else {
            onSubmit(newTask);
        }
    };
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>
                    Update the details of your task here. Click save when you're
                    done.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="task">Updated Task</Label>
                    <Input
                        id="task"
                        name="task"
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="!ring-0"
                        required
                    />
                    {error && <span className="text-primary">{error}</span>}
                </div>
                <DialogFooter className="mt-4 justify-center">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setNewTask(inputVal);
                                setError("");
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit">Save Changes</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
