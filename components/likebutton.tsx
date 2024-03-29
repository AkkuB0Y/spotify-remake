"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "../hooks/useUser";
import useAuthModal from "../hooks/useAuthModal";
import { FaCircleCheck } from "react-icons/fa6";
import { LuPlusCircle } from "react-icons/lu";

interface LikeButtonProps {
  songId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  songId
}) => {

  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
  
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    }

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? FaCircleCheck : LuPlusCircle;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) { // if song is already liked!
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)

      if (error) {
        toast.error(error.message);
      } 
      
      else {
        setIsLiked(false);
      }
    } 
    
    else { // if song isn't liked yet
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({
          song_id: songId,
          user_id: user.id
        });

      if (error) {
        toast.error(error.message);
      } 
      
      else {
        setIsLiked(true);
        toast.success('Liked!');
      }

    }

    router.refresh();
  }

    return (

        <button 
            onClick={handleLike}
            className={isLiked ? "hover:opacity-75 transition" : "opacity-75 hover:opacity-100 transition"}
        >

            <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
        </button>
    )
}

export default LikeButton;