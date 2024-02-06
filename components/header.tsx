"use client"
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import ButtonCustom from "./buttoncustom";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}


const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const router = useRouter();

    const logoutHandle = () => {
        // handle logout later

    }
    return (
        <div className={twMerge(`
            h-fit
            bg-gradient-to-b
            from-emerald-800
            p-8
        `,
        className
        )}
        >
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex space-x-2 items-center">
                    {/* add hidden b4 md:flex, and remove sm:flex */}
                    <button 
                        onClick={() => router.back()}
                        className="rounded-full bg-black/75 flex items-center justify-center hover:opacity-70 transition">
                        <RxCaretLeft className="text-white" size={35}/>
                    </button>
                    <button 
                        onClick={() => router.forward()}
                        className="rounded-full bg-black/75 flex items-center justify-center hover:opacity-70 transition">
                        <RxCaretRight className="text-white" size={35}/>
                    </button>               
                </div>
                
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <GoHome className="text-black" size={20}/>
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch className="text-black" size={20}/>
                    </button>
                </div>

                <div className="flex justify-between items-center space-x-4">
                    <>
                        <div>
                            <ButtonCustom className="bg-transparent text-neutral-300 font-medium">
                                Sign Up
                            </ButtonCustom>
                        </div>
                        <div>
                            <ButtonCustom 
                                onClick={() => {}}
                                className="bg-white px-6 py-2">
                                Login
                            </ButtonCustom>
                        </div>
                    
                    </>
                </div>

            </div>
            {children}
        </div>
    );
}

export default Header;