import { supabaseBrowserClient } from "@/utils/supabaseClient";

const supabase = supabaseBrowserClient();

const uploadImage = async (fileName: string, data: any) => {
    try {
        const file = data;
        const { data: image, error: uploadError } = await supabase.storage.from("avatar")
            .upload(fileName, file);
        if (uploadError) {
            throw uploadError;
        }
    } catch (error) {
        console.log(error);
    }
};


export default uploadImage;
