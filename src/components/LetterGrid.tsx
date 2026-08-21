import React from 'react';
import {
  Calendar,
  MapPin,
  Heart,
  BookOpen,
  Camera,
  Utensils,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { ChristmasLetter } from '../types';

interface LetterGridProps {
  letters: ChristmasLetter[];
  onSelectLetter: (letter: ChristmasLetter) => void;
  onToggleFavorite: (id: string) => void;
}

export const LetterGrid: React.FC<LetterGridProps> = ({
  letters,
  onSelectLetter,
  onToggleFavorite,
}) => {
  if (letters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-[#e8dfd1] bg-white p-12 text-center text-[#5a5a40] shadow-sm">
        <BookOpen className="h-12 w-12 text-[#8a8a70] opacity-60" />
        <h3 className="mt-4 font-serif text-xl font-bold text-[#1e3a1e]">
          No Christmas Letters Match Your Filters
        </h3>
        <p className="mt-1 text-sm font-sans text-[#8a8a70]">
          Try adjusting your search query, year selection, or selected themes.
        </p>
      </div>
    );
  }

  return (
    <div
      id="letters-grid-container"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {letters.map((letter) => {
        const previewExcerpt = letter.paragraphs[0] || '';

        return (
          <article
            key={letter.id}
            onClick={() => onSelectLetter(letter)}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#e8dfd1] bg-white text-[#2c3e2d] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1e3a1e] hover:shadow-md cursor-pointer"
          >
            {/* Top Cover Image with Year Badge & Postmark */}
            <div className="relative h-48 w-full overflow-hidden bg-[#f9f6f1]">
              <img
                src={letter.coverImage}
                alt={letter.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

              {/* Year Stamp Pill */}
              <div className="absolute top-3 left-3 rounded-full bg-[#1e3a1e] px-3.5 py-1 text-xs font-sans font-bold uppercase tracking-widest text-white shadow-sm">
                {letter.year} Edition
              </div>

              {/* Favorite Heart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(letter.id);
                }}
                className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-[#5a5a40] backdrop-blur transition-all hover:bg-white hover:text-[#b91c1c] shadow-xs"
                title={letter.favorite ? 'Remove favorite' : 'Mark as favorite'}
              >
                <Heart
                  className={`h-4 w-4 ${letter.favorite ? 'fill-[#b91c1c] text-[#b91c1c]' : ''}`}
                />
              </button>

              {/* Badges in bottom corner */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[11px] font-sans text-white">
                <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 backdrop-blur-sm">
                  <Calendar className="h-3 w-3 text-white" />
                  {letter.dateSent}
                </span>
                {letter.enclosedPhotos?.length > 0 && (
                  <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 backdrop-blur-sm">
                    <Camera className="h-3 w-3 text-white" />
                    {letter.enclosedPhotos.length}
                  </span>
                )}
                {letter.recipeCard && (
                  <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 backdrop-blur-sm">
                    <Utensils className="h-3 w-3 text-white" />
                    Recipe
                  </span>
                )}
              </div>
            </div>

            {/* Card Content Area */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="font-serif text-lg font-bold text-[#1e3a1e] transition-colors group-hover:text-[#b91c1c]">
                {letter.title}
              </h3>

              {letter.subtitle && (
                <p className="mt-1 line-clamp-1 text-xs italic font-serif text-[#8a8a70]">
                  {letter.subtitle}
                </p>
              )}

              <p className="mt-3 line-clamp-3 font-serif text-xs leading-relaxed text-[#5a5a40]">
                {previewExcerpt}
              </p>

              {/* Milestones Chips Preview */}
              {letter.milestones && letter.milestones.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#f1ebe3] pt-3">
                  {letter.milestones.slice(0, 2).map((m, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-full bg-[#e8efea] px-2.5 py-1 text-[11px] font-sans font-medium text-[#1e3a1e]"
                    >
                      <Sparkles className="h-2.5 w-2.5 text-[#1e3a1e]" />
                      {m.label}
                    </span>
                  ))}
                  {letter.milestones.length > 2 && (
                    <span className="rounded-full bg-[#f1ebe3] px-2 py-1 text-[10px] font-sans text-[#8a8a70]">
                      +{letter.milestones.length - 2} more
                    </span>
                  )}
                </div>
              )}

              {/* Footer Tags & Read Action */}
              <div className="mt-auto flex items-center justify-between border-t border-[#f1ebe3] pt-3.5 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {letter.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[11px] font-sans text-[#8a8a70]">
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="flex items-center gap-1 font-sans font-bold text-[#1e3a1e] transition-all group-hover:translate-x-1 group-hover:text-[#b91c1c]">
                  <span>Read Letter</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
