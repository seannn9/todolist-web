export default function About() {
    return (
        <section className="flex flex-col items-center h-full gap-10 xl:gap-0 p-4">
            <header className="w-full flex flex-col gap-4 items-center justify-center">
                <h1 className="text-4xl text-primary text-center font-bold">
                    About Task Master
                </h1>
                <h2 className="text-xl text-center text-muted-foreground">
                    Task Master is a simple and minimalistic todo list.
                </h2>
            </header>
            <div className="w-full h-full flex flex-col justify-center items-center gap-10 self-center">
                <article className="px-4 py-5 w-full lg:w-1/2 flex flex-col sm:flex-row justify-around gap-8 bg-sidebar border-2 border-border rounded-md">
                    <h2 className="text-xl self-center text-primary font-bold min-w-1/5 text-center">
                        DASHBOARD
                    </h2>
                    <h3>
                        This is the main page where you can see your tasks. You
                        can add, update, and delete your tasks here.
                    </h3>
                </article>
                <article className="p-4 w-full lg:w-1/2 flex flex-col sm:flex-row justify-around gap-8 bg-sidebar border-2 border-border rounded-md">
                    <h2 className="text-xl self-center text-primary font-bold min-w-1/5 text-center">
                        TODAY
                    </h2>
                    <h3>
                        This is where you can see tasks that has deadline set to
                        the current date. Actions for this page is still in
                        development.
                    </h3>
                </article>
                <article className="p-4 w-full lg:w-1/2 flex flex-col sm:flex-row justify-around gap-8 bg-sidebar border-2 border-border rounded-md">
                    <h2 className="text-xl self-center text-primary font-bold min-w-1/5 text-center">
                        UPCOMING
                    </h2>
                    <h3>
                        This is where you can see tasks that are upcoming for
                        the week. Actions for this page is still in development.
                    </h3>
                </article>
                <article className="p-4 w-full lg:w-1/2 flex flex-col sm:flex-row justify-around gap-8 bg-sidebar border-2 border-border rounded-md">
                    <h2 className="text-xl self-center text-primary font-bold min-w-1/5 text-center">
                        COMPLETED
                    </h2>
                    <h3>
                        This is where you can see the tasks you have completed
                        and when you completed them. Actions will be added in
                        the future.
                    </h3>
                </article>
            </div>
        </section>
    );
}
