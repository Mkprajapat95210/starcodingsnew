export interface Blog {
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
}

export interface Project {
  id: string;
  title: string;
  description: string;
  summary: string;
  portfoli_card_para?: string;
  imageUrl: string;
  link: string;
  url: string;
  category: string;
  featured?: boolean;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface Review {
  id: string;
  user_id: string;
  project_id: string;
  name: string;
  rating: number;
  text: string;
  status?: string;
  created_at?: string;
  profile_image_url?: string | null;
}
