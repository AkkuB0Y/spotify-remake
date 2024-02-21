import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useUploadModal from "../hooks/useUploadModal";
import Modal from "./modal"
import { useState } from "react";
import Input from "./input";
import ButtonCustom from "./buttoncustom";
import { toast } from "react-hot-toast";
import { useUser } from "../hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { unique } from "next/dist/build/utils";
import { useRouter } from "next/navigation";

const UploadModal = () => {

    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })
    const onChange = (open: boolean) => {

        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];
            
            if (!imageFile || !songFile || !user) {
                toast.error("Missing Fields!");
                return;
            }
            
            const uniqueID = uniqid();

            // uploading songs
            const {
                data: songData,
                error: songError,
            } = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                });
            
            if (songError) {
                setIsLoading(false);
                return toast.error("Failed song upload.");
            }

            // uploading image
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });
            
            if (imageError) {
                setIsLoading(false);
                return toast.error("Failed image upload.");
            }

            // created record in database
            const {
                error: supabaseError
            } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Song Created!");
            reset();
            uploadModal.onClose();

        } catch (error) {
            toast.error("Something went wrong...");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Upload Custom Song"
            description="Upload an MP3 File"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-4"
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song Title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Artist"
                />
                <div>
                    <div className="pb-1">
                        Select Audio File
                    </div>
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3, .wav, .aiff"
                        {...register('song', { required: true })}
                    />

                    <div className="pt-4 pb-1">
                        Select Cover Image
                    </div>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register('image', { required: true })}
                    />

                </div>
                <ButtonCustom disabled={isLoading} type="submit">
                    Create
                </ButtonCustom>
            </form>
        </Modal>
    );
}

export default UploadModal;