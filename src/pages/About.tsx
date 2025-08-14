export default function About() {
    return (
        <section className="flex flex-col gap-4 h-full p-4">
            <div className="w-full flex justify-center">
                <h1 className="text-4xl text-primary font-bold">
                    About Task Master
                </h1>
            </div>
            <div className="flex justify-center">
                <p className="text-xl">
                    Task Master is a simple and minimalistic todo list.
                </p>
            </div>
        </section>
    );
}
