import AboutCard from "@/components/about-card";
import { Separator } from "@/components/ui/separator";

export default function About() {
    return (
        <section className="flex flex-col items-center h-full gap-10 p-4">
            <header className="w-full flex flex-col mb-4 gap-4 items-center justify-center">
                <h1 className="text-4xl text-primary text-center font-bold">
                    About Task Master
                </h1>
                <h2 className="text-xl text-center text-muted-foreground">
                    Task Master is a simple and minimalistic todo list.
                </h2>
            </header>
            <Separator />
            <div className="w-full flex flex-col justify-center items-center gap-4">
                <h2 className="text-primary text-xl font-semibold">
                    User Experience
                </h2>
                <div className="w-full flex flex-col items-center gap-10">
                    <AboutCard
                        title="GUEST MODE"
                        desc="When not logged in, you are in guest mode which
                    allows you to access all website features, but it
                    saves your tasks in local storage, which means that all your
                    tasks will be deleted if you clear your browser's cookies
                    and site data."
                    />
                    <AboutCard
                        title="USER MODE"
                        desc="When logged in, you are in user mode which also allows you to access all website features, but instead of local storage, it saves your tasks in a secure supabase table, which only you can access. The advantage of this is that your data will not be deleted if you delete your browser data."
                    />
                </div>
            </div>
            <Separator />
            <div className="w-full h-full mb-10 flex flex-col justify-center items-center gap-4">
                <h2 className="text-primary text-xl font-semibold">
                    Navigation Guide
                </h2>
                <div className="w-full flex flex-col items-center gap-10">
                    <AboutCard
                        title="DASHBOARD"
                        desc="This is the main page where you can see your tasks. You
                            can add, update, and delete your tasks here."
                    />
                    <AboutCard
                        title="TODAY"
                        desc="This is where you can see tasks that has deadline set to
                            the current date. Actions for this page is still in
                            development."
                    />
                    <AboutCard
                        title="UPCOMING"
                        desc="This is where you can see tasks that are upcoming for
                            the week. Actions for this page is still in development."
                    />
                    <AboutCard
                        title="COMPLETED"
                        desc="This is where you can see the tasks you have completed
                            and when you completed them. Actions will be added in
                            the future."
                    />
                </div>
            </div>
        </section>
    );
}
