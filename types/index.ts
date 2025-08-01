export interface Recipe {
  recipe_id?: number;
  recipe_name: string;
  ingredients: string[];
  prep_time_in_min: number;
  rating: number;
  meal: string;
  instructions: string[];
  comments?: Comment[];
}

export interface Review {
  review_id?: number;
  rest_name: string;
  description: string;
  experience: number;
  o_rating: number;
  price: number;
  taste: number;
  city: string;
  state_code: string;
  cuisine?: string;
  location?: string;
}

export interface Comment {
  id?: number;
  comment: string;
  author?: string;
  created_at?: string;
}

export interface City {
  city: string;
  state_code: string;
}

export interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
