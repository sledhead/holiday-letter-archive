import React, { useState } from 'react';
import {
  Heart,
  Printer,
  Share2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Sparkles,
  Utensils,
  Camera,
  Edit3,
  Check,
  ZoomIn,
  ZoomOut,
  Award,
  BookOpen,
  GraduationCap,
  Hammer,
  Dog,
  Compass,
  Music,
  Bike,
  Sprout,
  Home,
  Trees,
  Globe,
  Trophy,
  Palette,
  Shield,
  Snowflake,
  Smile,
  Cpu,
  Gift,
  Tent,
  Crown,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChristmasLetter, EnclosedPhoto } from '../types';

interface LetterReaderProps {
  letter: ChristmasLetter;
  allLetters: ChristmasLetter[];
  onSelectLetter: (letter: ChristmasLetter) => void;
  onToggleFavorite: (id: string) => void;
  onEditLetter: (letter: ChristmasLetter) => void;
  onSelectPhoto: (photo: EnclosedPhoto) => void;
}

// Icon helper for milestones
const getMilestoneIcon = (iconName?: string) => {
  switch (iconName) {
    case 'GraduationCap':
      return <GraduationCap className="h-4 w-4 text-[#c93b3b]" />;
    case 'BookOpen':
      return <BookOpen className="h-4 w-4 text-[#2e7d32]" />;
    case 'Hammer':
      return <Hammer className="h-4 w-4 text-[#b45309]" />;
    case 'Dog':
      return <Dog className="h-4 w-4 text-[#d97706]" />;
    case 'Compass':
      return <Compass className="h-4 w-4 text-[#2563eb]" />;
    case 'Music':
      return <Music className="h-4 w-4 text-[#7c3aed]" />;
    case 'Bike':
      return <Bike className="h-4 w-4 text-[#059669]" />;
    case 'Sprout':
      return <Sprout className="h-4 w-4 text-[#16a34a]" />;
    case 'Home':
      return <Home className="h-4 w-4 text-[#ea580c]" />;
    case 'Trees':
      return <Trees className="h-4 w-4 text-[#15803d]" />;
    case 'Globe':
      return <Globe className="h-4 w-4 text-[#0284c7]" />;
    case 'Trophy':
      return <Trophy className="h-4 w-4 text-[#eab308]" />;
    case 'Palette':
      return <Palette className="h-4 w-4 text-[#db2777]" />;
    case 'Shield':
      return <Shield className="h-4 w-4 text-[#4f46e5]" />;
    case 'Snowflake':
      return <Snowflake className="h-4 w-4 text-[#06b6d4]" />;
    case 'Smile':
      return <Smile className="h-4 w-4 text-[#f59e0b]" />;
    case 'Cpu':
      return <Cpu className="h-4 w-4 text-[#6366f1]" />;
    case 'Gift':
      return <Gift className="h-4 w-4 text-[#e11d48]" />;
    case 'Tent':
      return <Tent className="h-4 w-4 text-[#047857]" />;
    case 'Crown':
      return <Crown className="h-4 w-4 text-[#eab308]" />;
    default:
      return <Sparkles className="h-4 w-4 text-[#dfb76c]" />;
  }
};

export const LetterReader: React.FC<LetterReaderProps> = ({
  letter,
  allLetters,
  onSelectLetter,
  onToggleFavorite,
  onEditLetter,
  onSelectPhoto,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const currentIndex = allLetters.findIndex((l) => l.id === letter.id);
  const prevLetter = currentIndex < allLetters.length - 1 ? allLetters[currentIndex + 1] : null;
  const nextLetter = currentIndex > 0 ? allLetters[currentIndex - 1] : null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);

    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#dfb76c', '#c93b3b', '#2e7d32'],
    });
  };

  const fontSizeClasses = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-relaxed',
    xlarge: 'text-xl leading-loose',
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top Navigation & Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#e8dfd1] bg-white px-4 py-2.5 text-xs font-sans text-[#5a5a40] shadow-sm backdrop-blur">
        {/* Previous / Next Letter Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => prevLetter && onSelectLetter(prevLetter)}
            disabled={!prevLetter}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 transition-all ${
              prevLetter
                ? 'bg-[#f1ebe3] text-[#2c3e2d] hover:bg-[#e8efea] hover:text-[#1e3a1e]'
                : 'cursor-not-allowed text-[#8a8a70] opacity-40'
            }`}
            title={prevLetter ? `Go to ${prevLetter.year}` : 'No earlier letter'}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{prevLetter ? `${prevLetter.year} Letter` : 'Earliest'}</span>
          </button>

          <span className="font-serif text-sm font-bold text-[#1e3a1e] px-1">
            {letter.year}
          </span>

          <button
            onClick={() => nextLetter && onSelectLetter(nextLetter)}
            disabled={!nextLetter}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 transition-all ${
              nextLetter
                ? 'bg-[#f1ebe3] text-[#2c3e2d] hover:bg-[#e8efea] hover:text-[#1e3a1e]'
                : 'cursor-not-allowed text-[#8a8a70] opacity-40'
            }`}
            title={nextLetter ? `Go to ${nextLetter.year}` : 'No later letter'}
          >
            <span>{nextLetter ? `${nextLetter.year} Letter` : 'Latest'}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Text Zoom, Print, Share, Favorite, Edit */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Font Zoom */}
          <div className="flex items-center rounded-lg border border-[#e8dfd1] bg-[#f9f6f1] p-0.5">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 text-[11px] font-bold ${
                fontSize === 'normal' ? 'bg-[#1e3a1e] text-white rounded' : 'text-[#8a8a70] hover:text-[#1e3a1e]'
              }`}
              title="Standard Text Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 text-[12px] font-bold ${
                fontSize === 'large' ? 'bg-[#1e3a1e] text-white rounded' : 'text-[#8a8a70] hover:text-[#1e3a1e]'
              }`}
              title="Large Text Size"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-1 text-[14px] font-bold ${
                fontSize === 'xlarge' ? 'bg-[#1e3a1e] text-white rounded' : 'text-[#8a8a70] hover:text-[#1e3a1e]'
              }`}
              title="Extra Large Text Size"
            >
              A++
            </button>
          </div>

          {/* Favorite Toggle */}
          <button
            onClick={() => onToggleFavorite(letter.id)}
            className={`flex items-center gap-1 rounded-lg border border-[#e8dfd1] bg-[#f9f6f1] px-2.5 py-1.5 transition-all ${
              letter.favorite ? 'text-[#b91c1c] border-[#b91c1c]' : 'text-[#5a5a40] hover:text-[#1e3a1e]'
            }`}
            title={letter.favorite ? 'Remove from favorites' : 'Mark as favorite letter'}
          >
            <Heart className={`h-3.5 w-3.5 ${letter.favorite ? 'fill-[#b91c1c]' : ''}`} />
            <span className="hidden sm:inline">Favorite</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 rounded-lg border border-[#e8dfd1] bg-[#f9f6f1] px-2.5 py-1.5 text-[#5a5a40] hover:text-[#1e3a1e]"
            title="Copy share link"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[#1e3a1e]" /> : <Share2 className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1 rounded-lg border border-[#e8dfd1] bg-[#f9f6f1] px-2.5 py-1.5 text-[#5a5a40] hover:text-[#1e3a1e]"
            title="Print this Christmas letter"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Edit */}
          <button
            onClick={() => onEditLetter(letter)}
            className="flex items-center gap-1 rounded-lg bg-[#1e3a1e] px-2.5 py-1.5 text-white hover:bg-[#2d522d]"
            title="Edit this Christmas letter"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
      </div>

      {/* Physical Stationery Letter Sheet */}
      <article
        id={`letter-stationery-${letter.year}`}
        className="letter-page relative overflow-hidden rounded-3xl border border-[#e8dfd1] bg-white p-6 text-[#2c3e2d] shadow-sm transition-all sm:p-10 md:p-14"
      >
        {/* Subtle Inner Border */}
        <div className="pointer-events-none absolute inset-3 rounded-2xl border border-[#f1ebe3]" />

        {/* Vintage Postmark Stamp & Wax Seal in Top Right */}
        <div className="flex flex-col-reverse items-start justify-between gap-4 border-b border-[#e8dfd1] pb-6 sm:flex-row sm:items-center">
          <div>
            <span className="inline-block rounded-full bg-[#1e3a1e] px-3.5 py-1 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-xs">
              Christmas {letter.year} Edition
            </span>
            <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs font-sans text-[#8a8a70]">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="h-3.5 w-3.5 text-[#1e3a1e]" />
                {letter.dateSent}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="h-3.5 w-3.5 text-[#1e3a1e]" />
                {letter.location}
              </span>
            </div>
          </div>

          {/* Stamp Graphic */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#b91c1c] bg-[#fdfaf6] p-2.5 shadow-xs">
              <span className="text-[9px] font-sans font-bold tracking-widest text-[#b91c1c] uppercase">
                {letter.stampText || 'NORTH POLE POST'}
              </span>
              <div className="my-0.5 flex items-center gap-1 text-[#b91c1c]">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="font-serif text-xs font-black">{letter.year}</span>
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="text-[8px] font-sans uppercase tracking-wider text-[#8a8a70]">SPECIAL DELIVERY</span>
            </div>

            {/* Red Wax Seal Graphic */}
            <div className="hidden h-12 w-12 items-center justify-center rounded-full border-2 border-[#b91c1c] bg-gradient-to-br from-[#8f1a1a] to-[#b91c1c] text-white shadow-sm sm:flex">
              <span className="font-serif-heading text-sm font-bold tracking-tighter text-[#fdfaf6]">
                S
              </span>
            </div>
          </div>
        </div>

        {/* Letter Headline & Senders */}
        <div className="mt-8 text-center sm:text-left">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1e3a1e] sm:text-3xl md:text-4xl leading-tight">
            {letter.title}
          </h2>
          {letter.subtitle && (
            <p className="mt-2 font-serif text-sm italic text-[#5a5a40] sm:text-base">
              "{letter.subtitle}"
            </p>
          )}

          <div className="mt-3 inline-block rounded-full bg-[#f1ebe3] px-3.5 py-1 text-xs font-sans font-semibold text-[#5a5a40]">
            From: {letter.senders}
          </div>
        </div>

        {/* Annual Milestones Banner (Fast Facts) */}
        {letter.milestones && letter.milestones.length > 0 && (
          <div className="my-8 overflow-hidden rounded-3xl border border-[#e8dfd1] bg-[#f9f6f1] p-5 shadow-xs sm:p-6">
            <div className="flex items-center gap-2 border-b border-[#e8dfd1] pb-3">
              <Sparkles className="h-4 w-4 text-[#1e3a1e]" />
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#1e3a1e]">
                {letter.year} Family Milestones & Highlights
              </h3>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {letter.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-[#e8dfd1] bg-white p-3.5 shadow-xs"
                >
                  <div className="rounded-xl bg-[#e8efea] p-2 text-[#1e3a1e]">
                    {getMilestoneIcon(m.icon)}
                  </div>
                  <div>
                    <h4 className="font-serif text-xs font-bold text-[#2c3e2d]">{m.label}</h4>
                    <p className="mt-0.5 text-xs font-serif text-[#5a5a40]">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Salutation & Body Paragraphs */}
        <div className="mt-6 space-y-5">
          <p className="font-serif text-lg font-bold italic text-[#1e3a1e]">
            {letter.salutation}
          </p>

          <div className={`font-body-reading space-y-4 text-[#2c3e2d] ${fontSizeClasses[fontSize]}`}>
            {letter.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed text-justify">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Enclosed Photos Polaroid Gallery */}
        {letter.enclosedPhotos && letter.enclosedPhotos.length > 0 && (
          <div className="my-10 border-t border-b border-[#e8dfd1] py-8">
            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-[#1e3a1e]" />
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#1e3a1e]">
                  Enclosed Holiday Polaroids ({letter.enclosedPhotos.length})
                </h3>
              </div>
              <span className="text-[11px] font-sans text-[#8a8a70]">Click any photo to enlarge</span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {letter.enclosedPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => onSelectPhoto(photo)}
                  className="group cursor-pointer rounded-2xl border border-[#e8dfd1] bg-white p-3.5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-[#f9f6f1]">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="font-serif text-xs font-semibold text-[#2c3e2d]">
                      {photo.caption}
                    </p>
                    {photo.location && (
                      <p className="mt-0.5 text-[10px] font-sans text-[#8a8a70]">{photo.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Holiday Recipe Card (Enclosure) */}
        {letter.recipeCard && (
          <div className="my-8 overflow-hidden rounded-3xl border border-[#e8dfd1] bg-[#f9f6f1] p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-2 border-b border-[#e8dfd1] pb-3.5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#e8efea] p-2.5 text-[#1e3a1e]">
                  <Utensils className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#8a8a70] uppercase">
                    {letter.year} Holiday Recipe Card
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#1e3a1e]">
                    {letter.recipeCard.title}
                  </h4>
                </div>
              </div>

              {(letter.recipeCard.servings || letter.recipeCard.prepTime) && (
                <div className="flex items-center gap-3 text-xs font-sans text-[#5a5a40]">
                  {letter.recipeCard.servings && <span>🍽️ {letter.recipeCard.servings}</span>}
                  {letter.recipeCard.prepTime && <span>⏱️ {letter.recipeCard.prepTime}</span>}
                </div>
              )}
            </div>

            <p className="mt-3 text-xs italic font-serif text-[#5a5a40]">
              "{letter.recipeCard.description}"
            </p>

            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 border border-[#e8dfd1]">
                <h5 className="font-sans text-xs font-bold uppercase tracking-widest text-[#1e3a1e]">
                  Ingredients
                </h5>
                <ul className="mt-2.5 space-y-1.5 text-xs font-serif text-[#2c3e2d]">
                  {letter.recipeCard.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1e3a1e]" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-4 border border-[#e8dfd1]">
                <h5 className="font-sans text-xs font-bold uppercase tracking-widest text-[#1e3a1e]">
                  Instructions
                </h5>
                <ol className="mt-2.5 space-y-2 text-xs font-serif text-[#2c3e2d]">
                  {letter.recipeCard.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-[#1e3a1e]">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {letter.recipeCard.familyNote && (
              <div className="mt-4 rounded-xl bg-[#e8efea] p-3 text-xs font-sans text-[#1e3a1e]">
                <strong className="font-semibold">Family Note:</strong>{' '}
                {letter.recipeCard.familyNote}
              </div>
            )}
          </div>
        )}

        {/* Sign-off & Handwritten Signatures Block */}
        <div className="mt-10 border-t border-[#e8dfd1] pt-6">
          <p className="font-serif text-base italic text-[#5a5a40]">
            {letter.signOff}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-5 sm:gap-8">
            {letter.signatures.map((sig, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-handwriting text-3xl font-bold tracking-wide text-[#1e3a1e] sm:text-4xl">
                  {sig}
                </span>
              </div>
            ))}
          </div>

          {/* Footer Ribbon & Themes */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#e8dfd1] pt-4 text-xs font-sans text-[#8a8a70]">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold uppercase tracking-wider text-[#1e3a1e]">Themes:</span>
              {letter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#f1ebe3] px-3 py-0.5 text-xs text-[#5a5a40]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="font-sans text-[11px] text-[#8a8a70]">
              The Sterling Archive • {letter.year}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
