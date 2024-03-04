"use client"
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import ButtonCustom from "./buttoncustom";
import useAuthModal from "../hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "../hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import usePlayer from "../hooks/usePlayer";
interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}


const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const player = usePlayer();
    const authModal =  useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const logoutHandle = async () => {
        const { error } = await supabaseClient.auth.signOut();
        player.reset();

        router.refresh();

        if (error) {
            toast.error(error.message);
        }
        else {
            toast.success('Logged Out!');
        }
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
                    
                    { user ? (
                        <div className="flex space-x-4 items-center">
                            <ButtonCustom
                                onClick={logoutHandle}
                                className="bg-white px-6 py-2"
                            >
                                Logout
                            </ButtonCustom>

                            <ButtonCustom
                                onClick={() => router.push('/account')}
                                className="bg-white"
                            >
                                <FaUserAlt/>
                            </ButtonCustom>
                        </div>
                    ) : (
                    <>
                        <div>
                            <ButtonCustom onClick={authModal.onOpen} className="bg-transparent text-neutral-300 font-medium">
                                Sign Up
                            </ButtonCustom>
                        </div>
                        <div>
                            <ButtonCustom 
                                onClick={authModal.onOpen}
                                className="bg-white px-6 py-2">
                                Login
                            </ButtonCustom>
                        </div>
                    </>

                    )}
                </div>

            </div>
            {children}
        </div>
    );
}

export default Header;