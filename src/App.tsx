/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchFilterBar } from './components/SearchFilterBar';
import { LetterReader } from './components/LetterReader';
import { LetterGrid } from './components/LetterGrid';
import { TimelineView } from './components/TimelineView';
import { ScrapbookView } from './components/ScrapbookView';
import { SnowCanvas } from './components/SnowCanvas';
import { PhotoLightbox } from './components/PhotoLightbox';
import { MemoryTrivia } from './components/MemoryTrivia';
import { AddEditLetterModal } from './components/AddEditLetterModal';
import { ChristmasLetter, EnclosedPhoto, FilterState, ViewMode } from './types';
import { INITIAL_LETTERS } from './data/sampleLetters';
import { Sparkles, Heart, TreePine, Gift, BookOpen, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'holiday_letters_archive_v1';
const SNOW_KEY = 'holiday_letters_snow_enabled';

export default function App() {
  // Letters state (initialized from localStorage or default)
  const [letters, setLetters] = useState<ChristmasLetter[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not parse saved letters:', e);
    }
    return INITIAL_LETTERS;
  });

  // Selected letter for LetterReader
  const [selectedLetterId, setSelectedLetterId] = useState<string>(() => {
    return letters[0]?.id || 'letter-2025';
  });

  // View Mode
  const [viewMode, setViewMode] = useState<ViewMode>('reader');

  // Snowfall state
  const [snowEnabled, setSnowEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(SNOW_KEY);
    return saved !== null ? saved === 'true' : true;
  });

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedYear: 'all',
    selectedTag: 'all',
    selectedSender: 'all',
    sortOrder: 'newest',
    favoriteOnly: false,
  });

  // Modals
  const [activePhoto, setActivePhoto] = useState<EnclosedPhoto | null>(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [letterToEdit, setLetterToEdit] = useState<ChristmasLetter | null>(null);
  const [isTriviaOpen, setIsTriviaOpen] = useState(false);

  // Save letters on update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
    } catch (e) {
      console.warn('Could not save letters:', e);
    }
  }, [letters]);

  // Save snow setting
  useEffect(() => {
    localStorage.setItem(SNOW_KEY, String(snowEnabled));
  }, [snowEnabled]);

  // Available unique years in dataset
  const availableYears = useMemo<number[]>(() => {
    const years: number[] = Array.from(new Set(letters.map((l) => l.year)));
    return years.sort((a, b) => b - a);
  }, [letters]);

  // Filtered and sorted letters
  const filteredLetters = useMemo(() => {
    return letters
      .filter((letter) => {
        // Search query match (title, subtitle, body paragraphs, milestones, recipes, senders, location, tags)
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchesTitle = letter.title.toLowerCase().includes(q);
          const matchesSubtitle = letter.subtitle?.toLowerCase().includes(q) || false;
          const matchesSenders = letter.senders.toLowerCase().includes(q);
          const matchesLocation = letter.location.toLowerCase().includes(q);
          const matchesParagraphs = letter.paragraphs.some((p) => p.toLowerCase().includes(q));
          const matchesMilestones = letter.milestones?.some(
            (m) => m.label.toLowerCase().includes(q) || m.text.toLowerCase().includes(q)
          );
          const matchesRecipe =
            letter.recipeCard?.title.toLowerCase().includes(q) ||
            letter.recipeCard?.ingredients.some((ing) => ing.toLowerCase().includes(q));
          const matchesTags = letter.tags?.some((t) => t.toLowerCase().includes(q));

          if (
            !matchesTitle &&
            !matchesSubtitle &&
            !matchesSenders &&
            !matchesLocation &&
            !matchesParagraphs &&
            !matchesMilestones &&
            !matchesRecipe &&
            !matchesTags
          ) {
            return false;
          }
        }

        // Year filter
        if (filters.selectedYear !== 'all' && letter.year !== filters.selectedYear) {
          return false;
        }

        // Tag filter
        if (filters.selectedTag !== 'all' && !letter.tags.includes(filters.selectedTag)) {
          return false;
        }

        // Favorite filter
        if (filters.favoriteOnly && !letter.favorite) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortOrder === 'newest') {
          return b.year - a.year;
        }
        if (filters.sortOrder === 'oldest') {
          return a.year - b.year;
        }
        if (filters.sortOrder === 'photos') {
          return (b.enclosedPhotos?.length || 0) - (a.enclosedPhotos?.length || 0);
        }
        return 0;
      });
  }, [letters, filters]);

  // Currently active selected letter object
  const activeLetter = useMemo(() => {
    return (
      letters.find((l) => l.id === selectedLetterId) ||
      filteredLetters[0] ||
      letters[0]
    );
  }, [letters, selectedLetterId, filteredLetters]);

  // All photos for lightbox navigation
  const allEnclosedPhotos = useMemo(() => {
    const photos: EnclosedPhoto[] = [];
    letters.forEach((l) => {
      l.enclosedPhotos.forEach((p) => photos.push(p));
    });
    return photos;
  }, [letters]);

  // Stats
  const totalPhotosCount = useMemo(() => {
    return letters.reduce((acc, l) => acc + (l.enclosedPhotos?.length || 0), 0);
  }, [letters]);

  const totalRecipesCount = useMemo(() => {
    return letters.filter((l) => !!l.recipeCard).length;
  }, [letters]);

  const favoritesCount = useMemo(() => {
    return letters.filter((l) => l.favorite).length;
  }, [letters]);

  // Handlers
  const handleSelectLetter = (letter: ChristmasLetter) => {
    setSelectedLetterId(letter.id);
    setViewMode('reader');
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleToggleFavorite = (id: string) => {
    setLetters((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const newFav = !l.favorite;
          if (newFav) {
            confetti({
              particleCount: 20,
              spread: 40,
              origin: { y: 0.7 },
              colors: ['#e11d48', '#dfb76c', '#ffffff'],
            });
          }
          return { ...l, favorite: newFav };
        }
        return l;
      })
    );
  };

  const handleOpenAddModal = () => {
    setLetterToEdit(null);
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (letter: ChristmasLetter) => {
    setLetterToEdit(letter);
    setIsAddEditModalOpen(true);
  };

  const handleSaveLetter = (letter: ChristmasLetter) => {
    setLetters((prev) => {
      const exists = prev.some((l) => l.id === letter.id);
      if (exists) {
        return prev.map((l) => (l.id === letter.id ? letter : l));
      } else {
        return [letter, ...prev].sort((a, b) => b.year - a.year);
      }
    });

    setSelectedLetterId(letter.id);
    setIsAddEditModalOpen(false);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#dfb76c', '#c93b3b', '#2e7d32', '#ffffff'],
    });
  };

  return (
    <div className="relative min-h-screen bg-[#fdfaf6] text-[#2c3e2d]">
      {/* Snowfall Canvas Background */}
      <SnowCanvas enabled={snowEnabled} intensity="normal" />

      {/* Main Header */}
      <Header
        totalLetters={letters.length}
        totalPhotos={totalPhotosCount}
        totalRecipes={totalRecipesCount}
        snowEnabled={snowEnabled}
        onToggleSnow={() => setSnowEnabled((prev) => !prev)}
        onOpenAddModal={handleOpenAddModal}
        favoritesCount={favoritesCount}
        filterFavorites={filters.favoriteOnly}
        onToggleFavorites={() =>
          setFilters((f) => ({ ...f, favoriteOnly: !f.favoriteOnly }))
        }
        onOpenTrivia={() => setIsTriviaOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-20 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Filter Controls */}
        <SearchFilterBar
          filters={filters}
          onFilterChange={setFilters}
          availableYears={availableYears}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          resultCount={filteredLetters.length}
        />

        {/* View Switcher Output */}
        {viewMode === 'reader' && (
          <div>
            {filteredLetters.length === 0 ? (
              <div className="rounded-3xl border border-[#e8dfd1] bg-white p-12 text-center text-[#5a5a40] shadow-sm">
                <BookOpen className="mx-auto h-12 w-12 text-[#8a8a70] opacity-60" />
                <h3 className="mt-4 font-serif text-xl font-bold text-[#1e3a1e]">
                  No Letters Match Your Active Filters
                </h3>
                <p className="mt-1 text-sm font-sans text-[#8a8a70]">
                  Try clearing the search text or selecting "All Years".
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      searchQuery: '',
                      selectedYear: 'all',
                      selectedTag: 'all',
                      selectedSender: 'all',
                      sortOrder: 'newest',
                      favoriteOnly: false,
                    })
                  }
                  className="mt-4 rounded-full bg-[#1e3a1e] px-5 py-2 text-xs font-sans font-semibold text-white hover:bg-[#2d522d]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <LetterReader
                letter={activeLetter}
                allLetters={filteredLetters}
                onSelectLetter={handleSelectLetter}
                onToggleFavorite={handleToggleFavorite}
                onEditLetter={handleOpenEditModal}
                onSelectPhoto={(photo) => setActivePhoto(photo)}
              />
            )}
          </div>
        )}

        {viewMode === 'grid' && (
          <LetterGrid
            letters={filteredLetters}
            onSelectLetter={handleSelectLetter}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {viewMode === 'timeline' && (
          <TimelineView
            letters={filteredLetters}
            onSelectLetter={handleSelectLetter}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {viewMode === 'scrapbook' && (
          <ScrapbookView
            letters={filteredLetters}
            onSelectLetter={handleSelectLetter}
            onSelectPhoto={(photo) => setActivePhoto(photo)}
          />
        )}
      </main>

      {/* Memory Trivia Modal */}
      {isTriviaOpen && (
        <div
          id="trivia-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
          onClick={() => setIsTriviaOpen(false)}
        >
          <div
            className="relative w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsTriviaOpen(false)}
              className="absolute -top-3 -right-3 z-10 rounded-full bg-white p-2 text-[#5a5a40] border border-[#e8dfd1] shadow-md hover:bg-[#e8efea] hover:text-[#1e3a1e]"
            >
              <X className="h-4 w-4" />
            </button>
            <MemoryTrivia
              letters={letters}
              onSelectLetter={(l) => {
                setIsTriviaOpen(false);
                handleSelectLetter(l);
              }}
            />
          </div>
        </div>
      )}

      {/* Lightbox for Photos */}
      <PhotoLightbox
        photo={activePhoto}
        allPhotos={allEnclosedPhotos}
        onClose={() => setActivePhoto(null)}
        onSelectPhoto={(p) => setActivePhoto(p)}
      />

      {/* Add / Edit Letter Modal */}
      {isAddEditModalOpen && (
        <AddEditLetterModal
          letterToEdit={letterToEdit}
          onSave={handleSaveLetter}
          onClose={() => setIsAddEditModalOpen(false)}
        />
      )}

      {/* Festive Footer */}
      <footer className="relative z-20 mt-20 border-t border-[#e8dfd1] bg-white py-10 text-center text-[#5a5a40]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-[#1e3a1e]">
              <TreePine className="h-5 w-5" />
              <Sparkles className="h-4 w-4" />
              <TreePine className="h-5 w-5" />
            </div>

            <p className="font-serif text-sm italic text-[#2c3e2d]">
              "Christmas is doing a little something extra for someone." — Charles M. Schulz
            </p>

            <p className="text-xs font-sans text-[#8a8a70]">
              Holiday Chronicles Personal Christmas Letter Archive • Preserving family memories, recipes & joy
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
