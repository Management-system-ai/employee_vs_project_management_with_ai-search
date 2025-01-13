import { supabaseBrowserClient } from "@/utils/supabaseClient";

const supabase = supabaseBrowserClient();

const getImageSrc = (fileName: string) => {
    const { data: imgUrl} = supabase.storage
         .from("avatar")
         .getPublicUrl(fileName);
      if (imgUrl) {
        return imgUrl;
  }
};

export default getImageSrc;
