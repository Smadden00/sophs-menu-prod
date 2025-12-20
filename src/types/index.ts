/***********
Recipe
***********/

export interface Recipe {
  recipe_id: number;
  recipe_name: string;
  ingredients: string[];
  prep_time_in_min: number;
  meal: string;
  instructions: string[];
  comments: Comment[];
  avg_rating: number;
  totalRatings?: number;
  userRating?: number;
  rec_img_url: string;
  soph_submitted: boolean;
}

export interface RecipeCardView {
  recipe_id?: number;
  recipe_name: string;
  prep_time_in_min: number;
  meal: string;
  rec_img_url: string;
  soph_submitted: boolean;
}

export interface RecipeRating {
  recipe_id: number;
  recipe_name: string;
  rating: number;
  user_encrypted: string;
}

/***********
Review
***********/

export interface Review {
  review_id: number;
  rest_name: string;
  description: string;
  experience: number;
  o_rating: number;
  price: number;
  taste: number;
  city: string;
  state_code: string;
  user_encrypted: string;
  soph_submitted: boolean;
  rest_type: string;
}

export interface ReviewCardView {
  review_id: number;
  rest_name: string;
  o_rating: number;
  city: string;
  state_code: string;
  soph_submitted: boolean;
  rest_type: string;
}

/***********
Other
***********/

export interface Comment {
  id: number;
  comment: string;
  author: string;
  created_at: string;
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