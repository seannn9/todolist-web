interface AboutCardProps {
    title: string;
    desc: string;
}
export default function AboutCard({ title, desc }: AboutCardProps) {
    return (
        <article className="px-4 py-5 w-full lg:w-10/12 2xl:w-1/2 flex flex-col sm:flex-row justify-around gap-4 sm:gap-8 bg-sidebar border-2 border-border rounded-md">
            <h2 className="text-lg self-center text-primary font-bold min-w-1/5 text-center">
                {title}
            </h2>
            <h3 className="text-justify text-base/relaxed">{desc}</h3>
        </article>
    );
}
