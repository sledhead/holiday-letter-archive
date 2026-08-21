import React from 'react';
import { Camera, Utensils, Calendar, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { ChristmasLetter, EnclosedPhoto } from '../types';

interface ScrapbookViewProps {
  letters: ChristmasLetter[];
  onSelectLetter: (letter: ChristmasLetter) => void;
  onSelectPhoto: (photo: EnclosedPhoto) => void;
}

export const ScrapbookView: React.FC<ScrapbookViewProps> = ({
  letters,
  onSelectLetter,
  onSelectPhoto,
}) => {
  // Flatten all enclosed photos
  const allPhotos: { photo: EnclosedPhoto; letter: ChristmasLetter }[] = [];
  letters.forEach((letter) => {
    if (letter && letter.enclosedPhotos) {
      letter.enclosedPhotos.forEach((photo) => {
        allPhotos.push({ photo, letter });
      });
    }
  });

  // Extract all recipes
  const allRecipes: ChristmasLetter[] = letters.filter(
    (l) => Boolean(l && l.recipeCard)
  );

  return (
    <div id="scrapbook-wall" className="space-y-10">
      {/* Intro Banner */}
      <div className="rounded-3xl border border-[#e8dfd1] bg-white p-6 text-[#2c3e2d] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-[#e8efea] p-3 text-[#1e3a1e]">
            <Camera className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1e3a1e] sm:text-2xl">
              Holiday Scrapbook & Polaroid Wall
            </h2>
            <p className="text-xs font-sans text-[#5a5a40] mt-0.5">
              Browse vintage family photos, holiday snapshots, and enclosed holiday recipes gathered across all archived years.
            </p>
          </div>
        </div>
      </div>

      {/* Polaroids Grid */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-[#1e3a1e]">
            Enclosed Polaroids ({allPhotos.length})
          </h3>
          <span className="text-xs font-sans text-[#8a8a70]">Click to view full-screen</span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allPhotos.map(({ photo, letter }, idx) => {
            const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-0'];
            const rot = rotations[idx % rotations.length];

            return (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className={`group cursor-pointer rounded-3xl border border-[#e8dfd1] bg-white p-3.5 shadow-sm transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-20 hover:shadow-md ${rot}`}
              >
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-[#f9f6f1]">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 rounded-full bg-[#1e3a1e] px-2.5 py-0.5 text-[10px] font-sans font-bold uppercase tracking-widest text-white shadow-xs">
                    {letter.year}
                  </span>
                </div>

                <div className="mt-3 text-center">
                  <p className="font-serif text-xs font-semibold text-[#2c3e2d]">
                    {photo.caption}
                  </p>
                  <div className="mt-1 flex items-center justify-center gap-2 text-[10px] font-sans text-[#8a8a70]">
                    {photo.location && (
                      <span className="flex items-center gap-0.5">
                        <MapPin className="h-2.5 w-2.5 text-[#1e3a1e]" />
                        {photo.location}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLetter(letter);
                    }}
                    className="mt-2 text-[11px] font-sans font-semibold text-[#1e3a1e] hover:text-[#b91c1c] hover:underline"
                  >
                    View {letter.year} Letter →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Holiday Recipe Cards Collage */}
      {allRecipes.length > 0 && (
        <div className="pt-6">
          <div className="mb-4 flex items-center gap-2">
            <Utensils className="h-5 w-5 text-[#1e3a1e]" />
            <h3 className="font-serif text-lg font-bold text-[#1e3a1e]">
              Archive of Enclosed Holiday Recipes ({allRecipes.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allRecipes.map((letter) => {
              if (!letter || !letter.recipeCard) return null;
              return (
                <div
                  key={`recipe-${letter.id}`}
                  onClick={() => onSelectLetter(letter)}
                  className="group cursor-pointer rounded-3xl border border-[#e8dfd1] bg-white p-5 text-[#2c3e2d] shadow-sm transition-all hover:-translate-y-1 hover:border-[#1e3a1e] hover:shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-[#f1ebe3] pb-2.5">
                    <span className="rounded-full bg-[#e8efea] px-3 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider text-[#1e3a1e]">
                      {letter.year} Recipe
                    </span>
                    <span className="font-serif text-xs font-bold text-[#1e3a1e]">
                      {letter.year}
                    </span>
                  </div>

                  <h4 className="mt-3 font-serif text-base font-bold text-[#1e3a1e] group-hover:text-[#b91c1c]">
                    {letter.recipeCard.title}
                  </h4>

                  <p className="mt-1 line-clamp-2 text-xs font-serif italic text-[#5a5a40]">
                    "{letter.recipeCard.description}"
                  </p>

                  <div className="mt-4 rounded-2xl bg-[#f9f6f1] p-3 text-xs border border-[#e8dfd1]">
                    <strong className="block font-sans text-[10px] uppercase tracking-widest text-[#8a8a70]">
                      Featured Ingredients:
                    </strong>
                    <p className="mt-1 line-clamp-2 font-serif text-[#2c3e2d]">
                      {letter.recipeCard.ingredients.join(' • ')}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#f1ebe3] pt-3 text-xs font-sans">
                    <span className="text-[11px] text-[#8a8a70]">
                      From: {letter.title}
                    </span>
                    <span className="font-bold text-[#1e3a1e] group-hover:text-[#b91c1c] group-hover:underline">
                      Open Letter →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
