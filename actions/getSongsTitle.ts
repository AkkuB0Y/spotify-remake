import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Song } from "../types"
import { cookies } from "next/headers"
import getSongs from "./getSongs";

const getSongsTitle = async (title: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!title) {
        const allSongs = await getSongs();
        return allSongs;
    }

    const { data, error } = await supabase
        .from('songs') // runs postgreSQL query to fetch!
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', { ascending: false});

        if (error) {
            // change
            console.log(error);
        }

        return (data as any) || [];
}

export default getSongsTitle;