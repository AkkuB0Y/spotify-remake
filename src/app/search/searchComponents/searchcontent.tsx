"use client";

import LikeButton from "../../../../components/likebutton";
import MediaItem from "../../../../components/mediaitem";
import useOnPlay from "../../../../hooks/useOnPlay";
import { Song } from "../../../../types";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);


    if (songs.length === 0) {

        return (
            <div className="flex flex-col space-y-2 w-full px-6 text-neutral-400">
                No results found.
            </div>
        )
    }

    return (
        <div className="flex flex-col space-y-2 w-full px-6">
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="flex-items-center space-x-4 w-full"
                >
                    <div className="flex space-x-4 flex-1">
                        <MediaItem 
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                        <LikeButton songId={song.id} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SearchContent;