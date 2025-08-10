import Particles from "@/components/animated/ParticlesBg";
import { RegisterForm } from "@/components/auth/register-form";

export default function Register() {
    return (
        <div className="h-full flex justify-center items-center relative">
            <div className="w-full h-full -z-10 absolute">
                <Particles alphaParticles={true} moveParticlesOnHover={false} />
            </div>
            <div className="w-full max-w-md">
                <RegisterForm />
            </div>
        </div>
    );
}
