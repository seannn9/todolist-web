import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
    task: string;
    onClick?: () => void;
}

export default function AlertDialogComponent({
    task,
    onClick,
}: AlertDialogProps) {
    return (
        <AlertDialogContent>
            <AlertDialogHeader className="flex flex-col">
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove
                    this task from your todo list:
                </AlertDialogDescription>
                <AlertDialogDescription className="my-2 text-primary self-center">
                    "{task}"
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onClick}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
}
