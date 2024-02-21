"use client"
import { MdLibraryMusic } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import useAuthModal from "../hooks/useAuthModal";
import { useUser } from "../hooks/useUser";
import useUploadModal from "../hooks/useUploadModal";

const Library = () => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();

    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }

        return uploadModal.onOpen();
    };

    return (
        <div className="flex flex-col">
            <div className = "flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center space-x-2">
                    <MdLibraryMusic className="text-neutral-400" size={26}/>
                    <p className="text-neutral-400 font-medium text-md">
                        Your Library
                    </p>
                </div>
                <div className="flex flex-row space-x-3">
                    <AiOutlinePlus
                        onClick={onClick}
                        size={20}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                        />
                    <AiOutlineArrowRight className="text-neutral-400 cursor-pointer mt-[0.15rem] hover:text-white transition"/>
                </div>
            </div>
            <div className="flex-col gap-y-2 mt-4 px-3">
                List of Songs!
            </div>
            
        </div>
    );
}

export default Library;