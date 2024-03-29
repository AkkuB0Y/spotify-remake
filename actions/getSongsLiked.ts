import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Song } from "../types"
import { cookies } from "next/headers"

const getSongsLiked = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
        .from('liked_songs') // runs postgreSQL query to fetch!
        .select('*, songs(*)')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false});

        if (error) {
            // change
            console.log(error);
            return [];
        }

        if (!data) {
            return [];
        }
        return data.map((item) => ({
            ...item.songs
        }))
}

export default getSongsLiked;