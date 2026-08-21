import React from 'react';
import { X, Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { EnclosedPhoto } from '../types';

interface PhotoLightboxProps {
  photo: EnclosedPhoto | null;
  allPhotos: EnclosedPhoto[];
  onClose: () => void;
  onSelectPhoto: (p: EnclosedPhoto) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  allPhotos,
  onClose,
  onSelectPhoto,
}) => {
  if (!photo) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allPhotos.length - 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasPrev) onSelectPhoto(allPhotos[currentIndex - 1]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasNext) onSelectPhoto(allPhotos[currentIndex + 1]);
  };

  return (
    <div
      id="photo-lightbox-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        id="photo-lightbox-modal"
        className="relative max-h-[92vh] max-w-4xl overflow-hidden rounded-3xl border border-[#e8dfd1] bg-white p-3 text-[#2c3e2d] shadow-2xl sm:p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-lightbox-btn"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full bg-[#f9f6f1] p-2 text-[#5a5a40] transition-all hover:bg-[#e8efea] hover:text-[#1e3a1e]"
          title="Close Lightbox"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Polaroid frame styled display */}
        <div className="flex flex-col items-center">
          <div className="relative flex max-h-[70vh] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#1e3a1e]/5 p-2">
            <img
              src={photo.url}
              alt={photo.caption}
              className="max-h-[66vh] w-auto rounded-xl object-contain shadow-xs transition-all"
              referrerPolicy="no-referrer"
            />

            {/* Navigation Arrows */}
            {hasPrev && (
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-[#1e3a1e] shadow-md backdrop-blur transition-all hover:bg-[#1e3a1e] hover:text-white"
                title="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            {hasNext && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-[#1e3a1e] shadow-md backdrop-blur transition-all hover:bg-[#1e3a1e] hover:text-white"
                title="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          <div className="mt-4 flex w-full flex-col justify-between gap-2 border-t border-[#f1ebe3] pt-3 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-serif text-lg font-bold text-[#1e3a1e] sm:text-xl">
                {photo.caption}
              </p>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-3 text-xs font-sans text-[#5a5a40] sm:justify-start">
                {photo.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#1e3a1e]" />
                    {photo.location}
                  </span>
                )}
                {photo.year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#1e3a1e]" />
                    {photo.year}
                  </span>
                )}
              </div>
            </div>

            <div className="text-xs font-sans text-[#8a8a70] self-center sm:self-auto">
              Photo {currentIndex + 1} of {allPhotos.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
