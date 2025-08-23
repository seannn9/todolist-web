import Particles from "@/components/animated/ParticlesBg";
import TextType from "@/components/animated/TextType";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="font-jbmono w-full flex-1 flex justify-center items-center relative">
            <div className="w-full h-full -z-10 absolute">
                <Particles alphaParticles={true} moveParticlesOnHover={false} />
            </div>
            <section className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl md:text-5xl font-black text-center">
                        TASK MASTER
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-gray-500 dark:text-gray-400 font-extrabold text-center mb-10">
                        <TextType
                            text="Conquer Your To-Do List with Ease."
                            typingSpeed={40}
                            cursorCharacter="_"
                            textColors={["text-gray-400"]}
                        />
                    </h2>
                </div>
                <div className="flex flex-col px-4 justify-center gap-5 md:px-0 md:gap-10 md:flex-row">
                    <Button
                        onClick={() => navigate("/login")}
                        variant="default"
                        size="default"
                        className="text-xl cursor-pointer py-6"
                    >
                        Get Started
                    </Button>
                    <Button
                        onClick={() => navigate("/about")}
                        variant="outline"
                        size="default"
                        className="text-xl cursor-pointer py-6"
                    >
                        Learn More
                    </Button>
                </div>
            </section>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a
                        href="https://github.com/seannn9/todolist-web"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-10 right-10 [&_path]:transition-all hover:[&_path]:fill-gray-400 cursor-pointer [&_svg]:sm:w-[40px] [&_svg]:sm:h-[40px]"
                    >
                        <svg
                            height={32}
                            width={32}
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>GitHub</title>
                            <path
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                fill="white"
                            />
                        </svg>
                    </a>
                </TooltipTrigger>
                <TooltipContent side="left">
                    <p className="font-bold">Source Code</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
