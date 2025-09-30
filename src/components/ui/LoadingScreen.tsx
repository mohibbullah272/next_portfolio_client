import { LoaderCircle } from "lucide-react";



const LoadingScreen = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
     <h3 className="animate-spin w-96"><LoaderCircle className="w-96 text-primary/40"></LoaderCircle></h3>
        </div>
    );
};

export default LoadingScreen;