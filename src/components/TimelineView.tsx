import React from 'react';
import { Calendar, Sparkles, Camera, Utensils, Heart, ArrowRight } from 'lucide-react';
import { ChristmasLetter } from '../types';

interface TimelineViewProps {
  letters: ChristmasLetter[];
  onSelectLetter: (letter: ChristmasLetter) => void;
  onToggleFavorite: (id: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  letters,
  onSelectLetter,
  onToggleFavorite,
}) => {
  // Sort letters chronologically from newest to oldest for the timeline flow
  const sorted = [...letters].sort((a, b) => b.year - a.year);

  if (sorted.length === 0) {
    return (
      <div className="rounded-3xl border border-[#e8dfd1] bg-white p-12 text-center text-[#5a5a40] shadow-sm">
        <Calendar className="mx-auto h-12 w-12 text-[#8a8a70] opacity-60" />
        <h3 className="mt-4 font-serif text-xl font-bold text-[#1e3a1e]">
          No Timeline Letters Found
        </h3>
        <p className="mt-1 text-sm font-sans text-[#8a8a70]">
          Adjust your filters to see the historical memory ribbon.
        </p>
      </div>
    );
  }

  return (
    <div id="timeline-view-container" className="relative mx-auto max-w-4xl py-6">
      {/* Central Timeline Stem */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e8dfd1] sm:left-1/2 sm:-translate-x-1/2" />

      <div className="space-y-12">
        {sorted.map((letter, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={letter.id}
              className={`relative flex flex-col sm:flex-row ${
                isEven ? 'sm:flex-row-reverse' : ''
              } items-start sm:items-center`}
            >
              {/* Central Year Node */}
              <div className="absolute left-4 z-10 -translate-x-1/2 rounded-full border-4 border-[#fdfaf6] bg-[#1e3a1e] p-2 text-center font-serif text-xs font-bold text-white shadow-md sm:left-1/2">
                <span className="block">{letter.year}</span>
              </div>

              {/* Card Container */}
              <div className="ml-10 w-full sm:ml-0 sm:w-1/2 sm:px-8">
                <div
                  onClick={() => onSelectLetter(letter)}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[#e8dfd1] bg-white p-5 text-[#2c3e2d] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1e3a1e] hover:shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-[#f1ebe3] pb-3">
                    <span className="rounded-full bg-[#f1ebe3] px-3 py-0.5 text-xs font-sans font-semibold text-[#5a5a40]">
                      {letter.dateSent}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(letter.id);
                      }}
                      className="rounded-full p-1 text-[#8a8a70] hover:text-[#b91c1c]"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          letter.favorite ? 'fill-[#b91c1c] text-[#b91c1c]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <h3 className="mt-3 font-serif text-lg font-bold text-[#1e3a1e] transition-colors group-hover:text-[#b91c1c]">
                    {letter.title}
                  </h3>

                  {letter.subtitle && (
                    <p className="mt-1 text-xs italic font-serif text-[#8a8a70]">
                      "{letter.subtitle}"
                    </p>
                  )}

                  <p className="mt-2.5 line-clamp-2 text-xs font-serif leading-relaxed text-[#5a5a40]">
                    {letter.paragraphs[0]}
                  </p>

                  {/* Thumbnail / Polaroid Preview if available */}
                  {letter.enclosedPhotos && letter.enclosedPhotos.length > 0 && (
                    <div className="mt-4 flex items-center gap-3 overflow-hidden rounded-2xl bg-[#f9f6f1] p-2.5 border border-[#e8dfd1]">
                      <img
                        src={letter.enclosedPhotos[0].url}
                        alt="Preview"
                        className="h-12 w-16 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 text-[11px] font-sans text-[#5a5a40]">
                        <p className="line-clamp-1 font-medium font-serif text-[#2c3e2d]">
                          {letter.enclosedPhotos[0].caption}
                        </p>
                        <span className="flex items-center gap-1 text-[10px] text-[#1e3a1e] font-medium">
                          <Camera className="h-3 w-3" />
                          {letter.enclosedPhotos.length} enclosed photo(s)
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Key Milestones List */}
                  {letter.milestones && letter.milestones.length > 0 && (
                    <div className="mt-3.5 space-y-1.5">
                      {letter.milestones.slice(0, 2).map((m, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 text-[11px] font-sans text-[#5a5a40]"
                        >
                          <Sparkles className="h-3 w-3 shrink-0 text-[#1e3a1e]" />
                          <strong className="text-[#2c3e2d] font-semibold">{m.label}:</strong>
                          <span className="truncate">{m.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between border-t border-[#f1ebe3] pt-3 text-xs">
                    <span className="text-[11px] font-sans text-[#8a8a70]">
                      {letter.location}
                    </span>
                    <span className="flex items-center gap-1 font-sans font-bold text-[#1e3a1e] group-hover:translate-x-1 group-hover:text-[#b91c1c] transition-all">
                      <span>Read Story</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
