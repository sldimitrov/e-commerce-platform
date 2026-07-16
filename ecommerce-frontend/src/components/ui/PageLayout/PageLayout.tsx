import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import type {ReactNode} from "react";

interface PageLayoutProps {
    children: ReactNode;
}

export default function PageLayout({children} :PageLayoutProps ) {
    return (
        <>
           <Header/>
                {children}
            <Footer/>
        </>
    )
}