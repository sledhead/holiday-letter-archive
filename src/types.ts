export interface Milestone {
  icon?: string;
  label: string;
  text: string;
}

export interface EnclosedPhoto {
  id: string;
  url: string;
  caption: string;
  location?: string;
  year?: number;
}

export interface RecipeCard {
  title: string;
  servings?: string;
  prepTime?: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  familyNote?: string;
}

export interface ChristmasLetter {
  id: string;
  year: number;
  title: string;
  subtitle?: string;
  dateSent: string;
  senders: string;
  location: string;
  coverImage: string;
  stampText?: string;
  salutation: string;
  paragraphs: string[];
  milestones: Milestone[];
  enclosedPhotos: EnclosedPhoto[];
  recipeCard?: RecipeCard;
  signOff: string;
  signatures: string[];
  tags: string[];
  favorite?: boolean;
  themeColor?: 'crimson' | 'emerald' | 'gold' | 'navy' | 'forest';
}

export type ViewMode = 'reader' | 'grid' | 'timeline' | 'scrapbook';

export interface FilterState {
  searchQuery: string;
  selectedYear: number | 'all';
  selectedTag: string | 'all';
  selectedSender: string | 'all';
  sortOrder: 'newest' | 'oldest' | 'photos';
  favoriteOnly: boolean;
}
