import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Song } from "../types"
import { cookies } from "next/headers"

const getSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
        .from('songs') // runs postgreSQL query to fetch!
        .select('*')
        .order('created_at', { ascending: false});

        if (error) {
            // change
            console.log(error);
        }

        return (data as any) || [];
}

export default getSongs;