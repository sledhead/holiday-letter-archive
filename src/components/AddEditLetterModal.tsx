import React, { useState } from 'react';
import { X, Plus, Trash2, Image, Cookie, Sparkles, Check, BookOpen } from 'lucide-react';
import { ChristmasLetter, Milestone, EnclosedPhoto, RecipeCard } from '../types';
import { ALL_TAGS } from '../data/sampleLetters';

interface AddEditLetterModalProps {
  letterToEdit?: ChristmasLetter | null;
  onSave: (letter: ChristmasLetter) => void;
  onClose: () => void;
}

export const AddEditLetterModal: React.FC<AddEditLetterModalProps> = ({
  letterToEdit,
  onSave,
  onClose,
}) => {
  const [year, setYear] = useState<number>(letterToEdit?.year || new Date().getFullYear());
  const [title, setTitle] = useState(letterToEdit?.title || '');
  const [subtitle, setSubtitle] = useState(letterToEdit?.subtitle || '');
  const [dateSent, setDateSent] = useState(letterToEdit?.dateSent || `December 20, ${year}`);
  const [senders, setSenders] = useState(
    letterToEdit?.senders || 'The Montgomery Family (David, Sarah, Liam & Maya)'
  );
  const [location, setLocation] = useState(letterToEdit?.location || 'Evergreen Pines, Vermont');
  const [salutation, setSalutation] = useState(letterToEdit?.salutation || 'Dearest Family and Friends,');
  const [coverImage, setCoverImage] = useState(
    letterToEdit?.coverImage ||
      'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=1200&q=80'
  );
  const [stampText, setStampText] = useState(
    letterToEdit?.stampText || `HOLIDAY POST • ${year}`
  );
  const [paragraphsText, setParagraphsText] = useState(
    letterToEdit?.paragraphs.join('\n\n') ||
      'Warmest greetings as we gather around the Christmas tree!\n\nThis past year was filled with unforgettable adventures, laughter, and family milestones.'
  );
  const [signOff, setSignOff] = useState(letterToEdit?.signOff || 'With all our love and warmest wishes,');
  const [signaturesText, setSignaturesText] = useState(
    letterToEdit?.signatures.join(', ') || 'David, Sarah, Liam, Maya, 🐾 Barnaby'
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    letterToEdit?.tags || ['Milestones', 'Traditions']
  );

  // Milestones
  const [milestones, setMilestones] = useState<Milestone[]>(
    letterToEdit?.milestones || [
      { label: 'Milestone 1', text: 'Celebrated an exciting new family chapter' },
    ]
  );

  // Photos
  const [photos, setPhotos] = useState<EnclosedPhoto[]>(
    letterToEdit?.enclosedPhotos || [
      {
        id: `photo-${Date.now()}-1`,
        url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80',
        caption: 'Holiday tree gathering and cozy hot chocolate',
        location: 'Home Hearth',
        year: year,
      },
    ]
  );

  // Optional Recipe Card
  const [includeRecipe, setIncludeRecipe] = useState(!!letterToEdit?.recipeCard);
  const [recipeTitle, setRecipeTitle] = useState(letterToEdit?.recipeCard?.title || 'Holiday Peppermint Bark Cookies');
  const [recipeDescription, setRecipeDescription] = useState(
    letterToEdit?.recipeCard?.description || 'Crispy holiday cookies topped with crushed candy canes.'
  );
  const [recipeIngredientsText, setRecipeIngredientsText] = useState(
    letterToEdit?.recipeCard?.ingredients.join('\n') ||
      '2 cups all-purpose flour\n1 cup unsalted butter\n½ cup crushed peppermint candy'
  );
  const [recipeInstructionsText, setRecipeInstructionsText] = useState(
    letterToEdit?.recipeCard?.instructions.join('\n') ||
      'Mix ingredients until soft dough forms.\nBake at 350°F for 12 minutes.\nSprinkle crushed peppermint on warm cookies.'
  );

  const toggleTag = (tag: string) => {
    if (tag === 'All') return;
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddMilestone = () => {
    setMilestones([...milestones, { label: 'New Highlight', text: 'Description of milestone' }]);
  };

  const handleRemoveMilestone = (idx: number) => {
    setMilestones(milestones.filter((_, i) => i !== idx));
  };

  const handleAddPhoto = () => {
    setPhotos([
      ...photos,
      {
        id: `photo-${Date.now()}-${photos.length}`,
        url: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&q=80',
        caption: 'Family gathering around the hearth',
        location: location,
        year: year,
      },
    ]);
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos(photos.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please provide a letter title.');
      return;
    }

    const paragraphs = paragraphsText
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const signatures = signaturesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    let recipeCard: RecipeCard | undefined = undefined;
    if (includeRecipe && recipeTitle.trim()) {
      recipeCard = {
        title: recipeTitle,
        description: recipeDescription,
        ingredients: recipeIngredientsText.split('\n').map((i) => i.trim()).filter(Boolean),
        instructions: recipeInstructionsText.split('\n').map((i) => i.trim()).filter(Boolean),
      };
    }

    const newLetter: ChristmasLetter = {
      id: letterToEdit?.id || `letter-${year}-${Date.now()}`,
      year: Number(year),
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      dateSent: dateSent.trim(),
      senders: senders.trim(),
      location: location.trim(),
      coverImage: coverImage.trim(),
      stampText: stampText.trim() || `HOLIDAY POST • ${year}`,
      salutation: salutation.trim(),
      paragraphs: paragraphs.length > 0 ? paragraphs : ['Merry Christmas and Happy New Year!'],
      milestones: milestones.filter((m) => m.label.trim()),
      enclosedPhotos: photos,
      recipeCard,
      signOff: signOff.trim(),
      signatures: signatures.length > 0 ? signatures : ['With Love'],
      tags: selectedTags.length > 0 ? selectedTags : ['Traditions'],
      favorite: letterToEdit?.favorite || false,
      themeColor: letterToEdit?.themeColor || 'crimson',
    };

    onSave(newLetter);
  };

  return (
    <div
      id="add-edit-letter-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-3 backdrop-blur-xs sm:p-6"
    >
      <div
        id="add-edit-letter-modal-content"
        className="relative my-8 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#e8dfd1] bg-white p-6 text-[#2c3e2d] shadow-2xl sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-[#f9f6f1] p-2 text-[#5a5a40] hover:bg-[#e8efea] hover:text-[#1e3a1e] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-[#f1ebe3] pb-4">
          <div className="rounded-2xl bg-[#e8efea] p-2.5 text-[#1e3a1e]">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1e3a1e]">
              {letterToEdit ? `Edit ${letterToEdit.year} Christmas Letter` : 'Add a New Christmas Letter'}
            </h2>
            <p className="text-xs font-sans text-[#5a5a40] mt-0.5">
              Archive your family’s memories, milestones, photos, and holiday recipe.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Top Row: Year, Title, Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#5a5a40]">
                Year *
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 2026;
                  setYear(val);
                  setDateSent(`December 20, ${val}`);
                  setStampText(`HOLIDAY POST • ${val}`);
                }}
                className="mt-1 w-full rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] px-3.5 py-2 text-sm font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#5a5a40]">
                Letter Headline / Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Year of Mountain Trails & New Beginnings"
                className="mt-1 w-full rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] px-3.5 py-2 text-sm font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:bg-white focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#5a5a40]">
              Subtitle / Annual Theme (Optional)
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. From backyard campouts to Liam's first marathon"
              className="mt-1 w-full rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] px-3.5 py-2 text-sm font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Senders, Date & Location */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-sans font-semibold text-[#5a5a40]">Senders / Family</label>
              <input
                type="text"
                value={senders}
                onChange={(e) => setSenders(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] px-3.5 py-2 text-sm font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-sans font-semibold text-[#5a5a40]">Date Sent</label>
              <input
                type="text"
                value={dateSent}
                onChange={(e) => setDateSent(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] px-3.5 py-2 text-sm font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-sans font-semibold text-[#5a5a40]">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] px-3.5 py-2 text-sm font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Cover Photo & Stamp text */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-sans font-semibold text-[#5a5a40]">Cover Photo URL</label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
                className="mt-1 w-full rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] px-3.5 py-2 text-sm font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-sans font-semibold text-[#5a5a40]">Vintage Stamp Text</label>
              <input
                type="text"
                value={stampText}
                onChange={(e) => setStampText(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] px-3.5 py-2 text-sm font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Salutation & Paragraphs */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#5a5a40]">
                Salutation / Opening
              </label>
              <input
                type="text"
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] px-3.5 py-2 text-sm font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#5a5a40]">
                Letter Story & Paragraphs (Separate paragraphs with blank lines) *
              </label>
              <textarea
                rows={6}
                value={paragraphsText}
                onChange={(e) => setParagraphsText(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] p-3 text-sm text-[#2c3e2d] font-serif leading-relaxed focus:border-[#1e3a1e] focus:bg-white focus:outline-none"
                placeholder="Write your Christmas letter story here..."
                required
              />
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-sans font-semibold text-[#5a5a40]">Sign-off Closing</label>
              <input
                type="text"
                value={signOff}
                onChange={(e) => setSignOff(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] px-3.5 py-2 text-sm font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-sans font-semibold text-[#5a5a40]">
                Family Signatures (comma-separated)
              </label>
              <input
                type="text"
                value={signaturesText}
                onChange={(e) => setSignaturesText(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] px-3.5 py-2 text-sm font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#5a5a40]">
              Themes & Tags
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {ALL_TAGS.filter((t) => t !== 'All').map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-3.5 py-1 text-xs font-sans transition-all ${
                      active
                        ? 'border border-[#1e3a1e] bg-[#1e3a1e] text-white font-bold'
                        : 'border border-[#e8dfd1] bg-[#f9f6f1] text-[#5a5a40] hover:border-[#1e3a1e] hover:text-[#1e3a1e]'
                    }`}
                  >
                    {active && <Check className="mr-1 inline h-3 w-3" />}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Family Milestones Section */}
          <div className="rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1e3a1e]">
                Key Milestones & Fast Facts ({milestones.length})
              </span>
              <button
                type="button"
                onClick={handleAddMilestone}
                className="flex items-center gap-1 text-xs font-sans font-semibold text-[#1e3a1e] hover:text-[#b91c1c]"
              >
                <Plus className="h-3.5 w-3.5" /> Add Milestone
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {milestones.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={m.label}
                    onChange={(e) => {
                      const updated = [...milestones];
                      updated[idx].label = e.target.value;
                      setMilestones(updated);
                    }}
                    placeholder="Label (e.g., Liam's Cello)"
                    className="w-1/3 rounded-xl border border-[#e8dfd1] bg-white px-3 py-1.5 text-xs font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={m.text}
                    onChange={(e) => {
                      const updated = [...milestones];
                      updated[idx].text = e.target.value;
                      setMilestones(updated);
                    }}
                    placeholder="Details of milestone"
                    className="flex-1 rounded-xl border border-[#e8dfd1] bg-white px-3 py-1.5 text-xs font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMilestone(idx)}
                    className="p-1 text-[#8a8a70] hover:text-[#b91c1c]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Enclosed Photos Section */}
          <div className="rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1e3a1e]">
                Enclosed Holiday Photos ({photos.length})
              </span>
              <button
                type="button"
                onClick={handleAddPhoto}
                className="flex items-center gap-1 text-xs font-sans font-semibold text-[#1e3a1e] hover:text-[#b91c1c]"
              >
                <Plus className="h-3.5 w-3.5" /> Add Photo
              </button>
            </div>

            <div className="mt-3 space-y-3">
              {photos.map((p, idx) => (
                <div key={p.id} className="flex flex-col gap-2 rounded-xl border border-[#e8dfd1] bg-white p-3 sm:flex-row sm:items-center">
                  <img
                    src={p.url}
                    alt={p.caption}
                    className="h-12 w-12 rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <input
                    type="url"
                    value={p.url}
                    onChange={(e) => {
                      const copy = [...photos];
                      copy[idx].url = e.target.value;
                      setPhotos(copy);
                    }}
                    placeholder="Photo URL"
                    className="flex-1 rounded-lg border border-[#e8dfd1] bg-[#f9f6f1] px-2.5 py-1 text-xs font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={p.caption}
                    onChange={(e) => {
                      const copy = [...photos];
                      copy[idx].caption = e.target.value;
                      setPhotos(copy);
                    }}
                    placeholder="Caption"
                    className="flex-1 rounded-lg border border-[#e8dfd1] bg-[#f9f6f1] px-2.5 py-1 text-xs font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(p.id)}
                    className="self-end p-1 text-[#8a8a70] hover:text-[#b91c1c] sm:self-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recipe Card Toggle */}
          <div className="rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] p-4">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={includeRecipe}
                onChange={(e) => setIncludeRecipe(e.target.checked)}
                className="h-4 w-4 rounded accent-[#1e3a1e]"
              />
              <span className="text-sm font-sans font-semibold text-[#1e3a1e]">
                Include Annual Holiday Recipe Card
              </span>
            </label>

            {includeRecipe && (
              <div className="mt-4 space-y-3 border-t border-[#e8dfd1] pt-3">
                <input
                  type="text"
                  value={recipeTitle}
                  onChange={(e) => setRecipeTitle(e.target.value)}
                  placeholder="Recipe Title (e.g. Grandma's Spiced Gingerbread)"
                  className="w-full rounded-xl border border-[#e8dfd1] bg-white px-3.5 py-2 text-xs font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:outline-none"
                />
                <input
                  type="text"
                  value={recipeDescription}
                  onChange={(e) => setRecipeDescription(e.target.value)}
                  placeholder="Brief Description"
                  className="w-full rounded-xl border border-[#e8dfd1] bg-white px-3.5 py-2 text-xs font-sans text-[#2c3e2d] focus:border-[#1e3a1e] focus:outline-none"
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-sans text-[#5a5a40]">Ingredients (one per line)</label>
                    <textarea
                      rows={3}
                      value={recipeIngredientsText}
                      onChange={(e) => setRecipeIngredientsText(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#e8dfd1] bg-white p-2 text-xs font-serif text-[#2c3e2d] focus:border-[#1e3a1e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-sans text-[#5a5a40]">Instructions (one per line)</label>
                    <textarea
                      rows={3}
                      value={recipeInstructionsText}
                      onChange={(e) => setRecipeInstructionsText(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#e8dfd1] bg-white p-2 text-xs font-serif text-[#2c3e2d] focus:border-[#1e3a1e] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-[#f1ebe3] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#e8dfd1] bg-[#f9f6f1] px-5 py-2.5 text-xs font-sans font-medium text-[#5a5a40] hover:bg-[#f1ebe3]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full bg-[#1e3a1e] px-6 py-2.5 text-xs font-sans font-bold text-white shadow-sm transition-all hover:bg-[#2d522d]"
            >
              <Sparkles className="h-4 w-4" />
              {letterToEdit ? 'Save Changes' : 'Publish to Archive'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
