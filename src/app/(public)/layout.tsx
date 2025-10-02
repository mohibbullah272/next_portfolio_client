import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";


const publicLayout = ({children}:{
    children:ReactNode
}) => {
    return (
        <div className="lg:p-10 p-5 max-w-7xl mx-auto">
            <Navbar></Navbar>
            <main className="min-h-dvh ">{children}</main>
            <Footer></Footer>
        </div>
    );
};
// to do  3D Marquee
export default publicLayout;