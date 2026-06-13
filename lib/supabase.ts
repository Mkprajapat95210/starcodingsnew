import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Database = {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string;
          author: string;
          imageUrl: string;
          cover_image: string;
          tags: string | string[];
          gallery: string | string[];
          images: string | string[];
          quote_text: string;
          quote_author: string;
          published_at: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['blogs']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['blogs']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          summary: string;
          imageUrl: string;
          link: string;
          url: string;
          category: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          project_id: string;
          name: string;
          rating: number;
          text: string;
          status: string;
          created_at: string;
          profile_image_url: string | null;
          projects: Database['public']['Tables']['projects']['Row'];
        };
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at' | 'projects'>;
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
      };
    };
  };
};
