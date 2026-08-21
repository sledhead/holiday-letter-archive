import React from 'react';
import {
  Search,
  X,
  SlidersHorizontal,
  LayoutGrid,
  BookOpen,
  GitCommit,
  Image,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import { FilterState, ViewMode } from '../types';
import { ALL_TAGS } from '../data/sampleLetters';

interface SearchFilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableYears: number[];
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  resultCount: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  onFilterChange,
  availableYears,
  viewMode,
  onViewModeChange,
  resultCount,
}) => {
  const handleSearchChange = (val: string) => {
    onFilterChange({ ...filters, searchQuery: val });
  };

  const handleYearChange = (year: number | 'all') => {
    onFilterChange({ ...filters, selectedYear: year });
  };

  const handleTagChange = (tag: string) => {
    onFilterChange({ ...filters, selectedTag: tag });
  };

  const handleSortChange = (sort: 'newest' | 'oldest' | 'photos') => {
    onFilterChange({ ...filters, sortOrder: sort });
  };

  const handleReset = () => {
    onFilterChange({
      searchQuery: '',
      selectedYear: 'all',
      selectedTag: 'all',
      selectedSender: 'all',
      sortOrder: 'newest',
      favoriteOnly: false,
    });
  };

  const hasActiveFilters =
    filters.searchQuery.trim() !== '' ||
    filters.selectedYear !== 'all' ||
    filters.selectedTag !== 'all' ||
    filters.favoriteOnly;

  return (
    <div
      id="search-and-filter-panel"
      className="rounded-3xl border border-[#e8dfd1] bg-white p-5 shadow-sm transition-all sm:p-6"
    >
      {/* Top Search Input & View Switchers */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input Bar */}
        <div className="relative flex-1">
          <label className="block font-sans text-[10px] uppercase tracking-widest text-[#8a8a70] mb-1.5 font-bold">
            Find a Memory
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8a70]" />
            <input
              id="letter-search-input"
              type="text"
              value={filters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search letters for stories, milestones, recipes, names, or locations..."
              className="w-full rounded-xl border border-[#e8dfd1] bg-[#f9f6f1] py-2.5 pl-10 pr-10 text-sm font-sans text-[#2c3e2d] placeholder-[#8a8a70] transition-all focus:border-[#1e3a1e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e3a1e]"
            />
            {filters.searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a70] hover:text-[#1e3a1e]"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* View Mode Buttons & Sort */}
        <div className="flex flex-col gap-1.5 sm:self-end">
          <label className="block font-sans text-[10px] uppercase tracking-widest text-[#8a8a70] font-bold">
            View Layout
          </label>
          <div className="flex items-center justify-between gap-2 sm:justify-start">
            <div className="flex rounded-xl border border-[#e8dfd1] bg-[#f9f6f1] p-1">
              <button
                onClick={() => onViewModeChange('reader')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-sans font-medium transition-all ${
                  viewMode === 'reader'
                    ? 'bg-[#1e3a1e] text-white shadow-sm font-semibold'
                    : 'text-[#5a5a40] hover:text-[#1e3a1e]'
                }`}
                title="Stationery Letter Reader View"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Letter Reader</span>
              </button>

              <button
                onClick={() => onViewModeChange('grid')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-sans font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#1e3a1e] text-white shadow-sm font-semibold'
                    : 'text-[#5a5a40] hover:text-[#1e3a1e]'
                }`}
                title="Festive Card Grid View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>

              <button
                onClick={() => onViewModeChange('timeline')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-sans font-medium transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-[#1e3a1e] text-white shadow-sm font-semibold'
                    : 'text-[#5a5a40] hover:text-[#1e3a1e]'
                }`}
                title="Chronological Memory Ribbon Timeline"
              >
                <GitCommit className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Timeline</span>
              </button>

              <button
                onClick={() => onViewModeChange('scrapbook')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-sans font-medium transition-all ${
                  viewMode === 'scrapbook'
                    ? 'bg-[#1e3a1e] text-white shadow-sm font-semibold'
                    : 'text-[#5a5a40] hover:text-[#1e3a1e]'
                }`}
                title="Polaroid Scrapbook Wall"
              >
                <Image className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Scrapbook</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 rounded-xl border border-[#e8dfd1] bg-[#f9f6f1] px-2.5 py-1.5 text-xs font-sans text-[#5a5a40]">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#1e3a1e]" />
              <select
                value={filters.sortOrder}
                onChange={(e) =>
                  handleSortChange(e.target.value as 'newest' | 'oldest' | 'photos')
                }
                className="bg-transparent text-xs text-[#2c3e2d] font-sans focus:outline-none cursor-pointer"
              >
                <option value="newest" className="bg-white text-[#2c3e2d]">
                  Newest First
                </option>
                <option value="oldest" className="bg-white text-[#2c3e2d]">
                  Oldest First
                </option>
                <option value="photos" className="bg-white text-[#2c3e2d]">
                  Most Photos
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Year Filter Pills */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-[#f1ebe3] pt-3.5">
        <span className="mr-1 text-[10px] font-sans font-bold uppercase tracking-widest text-[#8a8a70]">
          Filter by Year:
        </span>
        <button
          onClick={() => handleYearChange('all')}
          className={`rounded-full px-3.5 py-1 text-xs font-sans font-medium transition-all ${
            filters.selectedYear === 'all'
              ? 'border border-[#1e3a1e] bg-[#1e3a1e] text-white font-semibold shadow-sm'
              : 'border border-[#d1c7b7] bg-[#f9f6f1] text-[#5a5a40] hover:border-[#1e3a1e] hover:text-[#1e3a1e]'
          }`}
        >
          All Years
        </button>

        {availableYears.map((year) => (
          <button
            key={year}
            onClick={() => handleYearChange(year)}
            className={`rounded-full px-3.5 py-1 text-xs font-serif transition-all ${
              filters.selectedYear === year
                ? 'border border-[#1e3a1e] bg-[#1e3a1e] text-white font-semibold shadow-sm'
                : 'border border-[#d1c7b7] bg-[#f9f6f1] text-[#5a5a40] hover:border-[#1e3a1e] hover:text-[#1e3a1e]'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Tag Filter Chips & Reset */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#f1ebe3] pt-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[10px] font-sans font-bold uppercase tracking-widest text-[#8a8a70]">
            Tags:
          </span>
          {ALL_TAGS.map((tag) => {
            const active =
              (tag === 'All' && filters.selectedTag === 'all') ||
              filters.selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => handleTagChange(tag === 'All' ? 'all' : tag)}
                className={`rounded-full px-3 py-1 text-xs font-sans transition-all ${
                  active
                    ? 'bg-[#e8efea] text-[#1e3a1e] font-semibold border border-[#1e3a1e]/30 shadow-xs'
                    : 'bg-[#f1ebe3] text-[#5a5a40] hover:bg-[#e8efea] hover:text-[#1e3a1e]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Results summary and Reset */}
        <div className="flex items-center gap-3 text-xs font-sans text-[#8a8a70]">
          <span>
            Found <strong className="text-[#1e3a1e] font-bold">{resultCount}</strong> {resultCount === 1 ? 'letter' : 'letters'}
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[#b91c1c] font-semibold hover:underline"
            >
              <X className="h-3 w-3" /> Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
