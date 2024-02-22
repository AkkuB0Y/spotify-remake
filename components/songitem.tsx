"use client";

import Image from "next/image";
import useLoadImage from "../hooks/useLoadImage";
import { Song } from "../types";
import PlayButton from "./playbutton";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void
};

const SongItem: React.FC<SongItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = useLoadImage(data);

    return (
        <div
            onClick={() => onClick(data.id)}
            className="relative group flex flex-col items-center justify-center rounded-md space-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
        >
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image
                    className="object-cover"
                    src={imagePath || '/images/liked.png'}
                    fill
                    alt="thumbnail"
                />
            </div>

            <div className="flex flex-col items-start w-full pt-4 space-y-1">
                <p className="font-semibold truncate w-full">
                    {data.title}
                </p>

                <p className="text-neutral-400 text-sm pb-4 w-full">
                    By {data.author}
                </p>

                <div className="absolute bottom-24 right-5">
                    <PlayButton />
                </div>
            </div>
        </div>
    );
}

export default SongItem;