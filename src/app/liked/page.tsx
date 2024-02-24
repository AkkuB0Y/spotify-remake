import Image from "next/image";
import getSongsLiked from "../../../actions/getSongsLiked";
import Header from "../../../components/header";
import LikedContent from "./likedComponents/likedcontent";

export const revalidate = 0; // not cached!

const Liked = async () => {
    const songs = await getSongsLiked();

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header>
                <div className="mt-20">
                    <div className="flex flex-col md:flex-row items-center space-x-5">
                        <div className="relative h-32 w-32 lg:h-44 lg:w-44">
                            <Image
                                fill
                                alt="Liked Songs"
                                className="object-cover"
                                src="/images/liked.png"
                            />
                        </div>
                        <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                            <p className="hidden md:block text-sm">
                                Playlist
                            </p>
                            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                                Liked Songs
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>

            <LikedContent songs={songs} />
        </div>
    )
}

export default Liked;