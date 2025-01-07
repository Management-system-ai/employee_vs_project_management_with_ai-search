import { supabaseBrowserClient } from '@/utils/supabaseClient';

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


export const getDomainIdByName = async (domainName: string): Promise<string | null> => {
    const supabase = supabaseBrowserClient();
    const { data, error } = await supabase
        .from('Domain')
        .select('id')
        .eq('name', domainName)
        .single();

    if (error) {
        console.error(`Error fetching domainId for domain name "${domainName}":`, error);
        return null;
    }
    return data?.id || null;
};
