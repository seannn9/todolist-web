import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DeadlineProp {
    date: Date | undefined;
    time: string;
}

interface DatePickerProp {
    deadline: Date | undefined;
    onDataSend: ({ date, time }: DeadlineProp) => void;
}

export default function DatePicker({ deadline, onDataSend }: DatePickerProp) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [time, setTime] = useState("00:00:00");
    const d = new Date();
    let month = d.getMonth();
    let year = d.getFullYear();

    useEffect(() => {
        if (deadline) {
            setDate(new Date(deadline));
            onDataSend({ date: new Date(deadline), time: time });
        }
    }, [deadline]);

    useEffect(() => {
        if (date !== undefined) {
            onDataSend({ date: date, time: time });
        } else {
            console.log("no date and time set");
        }
    }, [date, time]);

    return (
        <div className="flex flex-col gap-3">
            <Label>Deadline</Label>
            <div className="flex flex-col min-[380px]:flex-row items-center">
                <Label htmlFor="date-picker" className="text-muted-foreground">
                    <span className="sr-only">Date</span>
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className="w-fit justify-between font-normal"
                        >
                            {date ? date.toDateString() : "Select date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            hidden={{ before: d }}
                            startMonth={new Date(year, month)}
                            endMonth={new Date(year + 5, 11)}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setDate(date);
                                setOpen(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
