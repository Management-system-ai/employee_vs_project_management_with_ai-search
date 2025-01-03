import { supabaseBrowserClient } from '@/utils/supabaseClient';

export const fetchProjects = async () => {
    try {
        const supabase = supabaseBrowserClient();
        const { data: projects, error } = await supabase.from('Projects').select('*');
        if (error) throw error;
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};

export const addProject = async (newProject: Project) => {
    try {
        const supabase = supabaseBrowserClient();
        const { data, error } = await supabase.from('Projects').insert([newProject]); // POST dữ liệu vào bảng
        if (error) throw error;
        return data; // Trả về dữ liệu vừa thêm
    } catch (error) {
        console.error('Error adding project:', error);
        throw error; // Ném lỗi để xử lý ở nơi khác
    }
};

// project_api.ts
interface Domain {
    id: string;
    name: string;
}

export const fetchDomains = async () => {
    try {
        const supabase = supabaseBrowserClient();
        const { data: domains, error } = await supabase
            .from('Domain')
            .select('id, name');
        
        if (error) throw error;
        return domains;
    } catch (error) {
        console.error('Error fetching domains:', error);
        return [];
    }
};