import React from 'react';
import {
  Sparkles,
  TreePine,
  CloudSnow,
  Plus,
  Heart,
  Calendar,
  BookOpen,
  Camera,
  Share2,
} from 'lucide-react';
import { AmbientAudio } from './AmbientAudio';

interface HeaderProps {
  totalLetters: number;
  totalPhotos: number;
  totalRecipes: number;
  snowEnabled: boolean;
  onToggleSnow: () => void;
  onOpenAddModal: () => void;
  favoritesCount: number;
  filterFavorites: boolean;
  onToggleFavorites: () => void;
  onOpenTrivia: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalLetters,
  totalPhotos,
  totalRecipes,
  snowEnabled,
  onToggleSnow,
  onOpenAddModal,
  favoritesCount,
  filterFavorites,
  onToggleFavorites,
  onOpenTrivia,
}) => {
  return (
    <header
      id="main-header"
      className="relative z-30 border-b border-[#e8dfd1] bg-white/75 backdrop-blur-md"
    >
      {/* Top Pine & Cranberry Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1e3a1e] via-[#b91c1c] to-[#1e3a1e]" />

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Brand & Archive Title */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1e3a1e] text-white shadow-sm">
              <TreePine className="h-6 w-6 text-[#fdfaf6]" />
              <Sparkles className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 text-[#dfb76c]" />
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-serif-heading text-xl font-bold tracking-tight text-[#1e3a1e] sm:text-2xl">
                  The Sterling Archive
                </h1>
                <span className="hidden rounded-full border border-[#d1c7b7] bg-[#e8efea] px-3 py-0.5 text-[10px] font-sans font-bold tracking-widest text-[#1e3a1e] uppercase sm:inline-block">
                  Christmas Letters
                </span>
              </div>
              <p className="text-xs text-[#5a5a40] sm:text-sm font-sans">
                A warm archive of Christmas letters, milestone stories & holiday recipes across the years
              </p>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Ambient Soundscape Player */}
            <AmbientAudio />

            {/* Snowfall Toggle */}
            <button
              id="snow-toggle-btn"
              onClick={onToggleSnow}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-sans font-medium transition-all ${
                snowEnabled
                  ? 'border-[#1e3a1e] bg-[#e8efea] text-[#1e3a1e] shadow-sm font-semibold'
                  : 'border-[#e8dfd1] bg-white text-[#5a5a40] hover:text-[#1e3a1e] hover:border-[#d1c7b7]'
              }`}
              title="Toggle falling snow"
            >
              <CloudSnow className={`h-3.5 w-3.5 ${snowEnabled ? 'text-[#1e3a1e]' : 'text-[#8a8a70]'}`} />
              <span className="hidden sm:inline">Snow:</span>
              <span>{snowEnabled ? 'On' : 'Off'}</span>
            </button>

            {/* Memory Trivia Button */}
            <button
              id="open-trivia-btn"
              onClick={onOpenTrivia}
              className="flex items-center gap-1.5 rounded-full border border-[#e8dfd1] bg-white px-3 py-1.5 text-xs font-sans font-medium text-[#5a5a40] transition-all hover:border-[#1e3a1e] hover:bg-[#f9f6f1] hover:text-[#1e3a1e]"
              title="Play Christmas Letter Memory Trivia"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#b91c1c]" />
              <span>Holiday Trivia</span>
            </button>

            {/* Favorites filter toggle */}
            <button
              id="favorites-toggle-btn"
              onClick={onToggleFavorites}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-sans font-medium transition-all ${
                filterFavorites
                  ? 'border-[#b91c1c] bg-[#faeceb] text-[#b91c1c] font-semibold'
                  : 'border-[#e8dfd1] bg-white text-[#5a5a40] hover:text-[#1e3a1e] hover:border-[#d1c7b7]'
              }`}
              title="Filter by favorite starred letters"
            >
              <Heart className={`h-3.5 w-3.5 ${filterFavorites ? 'fill-[#b91c1c] text-[#b91c1c]' : 'text-[#8a8a70]'}`} />
              <span className="hidden sm:inline">Favorites</span>
              <span className="rounded-full bg-[#e8dfd1] px-1.5 py-0.2 text-[10px] text-[#2c3e2d] font-bold">
                {favoritesCount}
              </span>
            </button>

            {/* Add / Archive New Letter */}
            <button
              id="add-letter-btn"
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 rounded-full bg-[#1e3a1e] px-4 py-2 text-xs font-sans font-semibold text-white shadow-sm transition-all hover:bg-[#2d522d]"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Letter</span>
            </button>
          </div>
        </div>

        {/* Sub-bar Archive Quick Stats */}
        <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-[#e8dfd1] pt-2.5 text-xs font-sans text-[#8a8a70]">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#1e3a1e]" />
            <strong className="text-[#2c3e2d] font-semibold">{totalLetters}</strong> Annual Letters
          </span>
          <span className="h-3 w-px bg-[#e8dfd1]" />
          <span className="flex items-center gap-1.5">
            <Camera className="h-3.5 w-3.5 text-[#1e3a1e]" />
            <strong className="text-[#2c3e2d] font-semibold">{totalPhotos}</strong> Enclosed Photos
          </span>
          <span className="h-3 w-px bg-[#e8dfd1]" />
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#1e3a1e]" />
            <strong className="text-[#2c3e2d] font-semibold">{totalRecipes}</strong> Holiday Recipes
          </span>
          <span className="h-3 w-px bg-[#e8dfd1]" />
          <span className="text-[11px] text-[#8a8a70]">
            Handwritten & Archived with Love
          </span>
        </div>
      </div>
    </header>
  );
};
