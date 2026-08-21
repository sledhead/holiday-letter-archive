import React, { useState } from 'react';
import { Sparkles, Trophy, HelpCircle, RotateCcw, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChristmasLetter } from '../types';

interface MemoryTriviaProps {
  letters: ChristmasLetter[];
  onSelectLetter: (letter: ChristmasLetter) => void;
}

interface Question {
  question: string;
  correctYear: number;
  options: number[];
  explanation: string;
  letterId: string;
}

export const MemoryTrivia: React.FC<MemoryTriviaProps> = ({ letters, onSelectLetter }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Generate trivia questions from the letters' milestones and paragraphs
  const questions: Question[] = [
    {
      question: 'Which year did the family build a 40x20ft backyard ice skating rink and skate under string lights?',
      correctYear: 2021,
      options: [2018, 2020, 2021, 2024],
      explanation: 'In 2021, David transformed the sloping backyard with 2x4s and night floodlights!',
      letterId: 'letter-2021',
    },
    {
      question: 'In what year was Barnaby the Golden Retriever puppy welcomed into the home?',
      correctYear: 2023,
      options: [2021, 2022, 2023, 2025],
      explanation: 'In April 2023, Barnaby arrived with ears too big for his head and an affinity for wool socks.',
      letterId: 'letter-2023',
    },
    {
      question: 'Which year featured the epic 7,400-mile roadtrip in "Clementine" the camper van across 18 parks?',
      correctYear: 2024,
      options: [2020, 2022, 2023, 2024],
      explanation: 'In 2024, the family hit the open road in their retrofitted camper van Clementine!',
      letterId: 'letter-2024',
    },
    {
      question: 'In what year did the family take their ancestral voyage to the Norwegian fjords in Geirangerfjord?',
      correctYear: 2022,
      options: [2018, 2020, 2022, 2025],
      explanation: 'In 2022, they visited Sarah’s great-grandparents’ coastal homestead in Norway.',
      letterId: 'letter-2022',
    },
    {
      question: 'Which year did Liam enter high school and Maya debut as the Sugar Plum Fairy in the Nutcracker?',
      correctYear: 2025,
      options: [2022, 2023, 2024, 2025],
      explanation: '2025 was the big year of high school cross country and sold-out Nutcracker performances!',
      letterId: 'letter-2025',
    },
  ];

  const currentQ = questions[currentIdx];

  const handleAnswer = (year: number) => {
    if (isAnswered) return;
    setSelectedOption(year);
    setIsAnswered(true);

    if (year === currentQ.correctYear) {
      setScore((s) => s + 1);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#dfb76c', '#c93b3b', '#2e7d32', '#ffffff'],
      });
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (score >= 3) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#dfb76c', '#c93b3b', '#2e7d32', '#ffffff'],
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleViewRelatedLetter = () => {
    const letter = letters.find((l) => l.id === currentQ.letterId);
    if (letter) {
      onSelectLetter(letter);
    }
  };

  return (
    <div
      id="holiday-trivia-widget"
      className="relative overflow-hidden rounded-3xl border border-[#e8dfd1] bg-white p-5 text-[#2c3e2d] shadow-sm sm:p-6"
    >
      <div className="flex items-center justify-between border-b border-[#f1ebe3] pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-[#e8efea] p-2 text-[#1e3a1e]">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1e3a1e]">
              Holiday Memory Trivia
            </h3>
            <p className="text-xs font-sans text-[#5a5a40]">
              Test how well you remember milestones from our past Christmas letters!
            </p>
          </div>
        </div>

        <span className="rounded-full bg-[#f1ebe3] px-3 py-1 text-xs font-sans font-medium text-[#5a5a40]">
          {isFinished ? 'Complete' : `Question ${currentIdx + 1} of ${questions.length}`}
        </span>
      </div>

      {!isFinished ? (
        <div className="mt-5 space-y-4">
          <p className="text-base font-serif font-medium leading-snug text-[#2c3e2d] sm:text-lg">
            "{currentQ.question}"
          </p>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {currentQ.options.map((year) => {
              let btnClass = 'border-[#e8dfd1] bg-[#f9f6f1] text-[#2c3e2d] hover:border-[#1e3a1e] hover:bg-[#e8efea] hover:text-[#1e3a1e]';
              if (isAnswered) {
                if (year === currentQ.correctYear) {
                  btnClass = 'border-[#1e3a1e] bg-[#e8efea] text-[#1e3a1e] font-bold shadow-xs';
                } else if (selectedOption === year) {
                  btnClass = 'border-[#b91c1c] bg-rose-50 text-[#b91c1c] font-medium';
                } else {
                  btnClass = 'border-[#e8dfd1] bg-[#f9f6f1] text-[#8a8a70] opacity-50';
                }
              }

              return (
                <button
                  key={year}
                  onClick={() => handleAnswer(year)}
                  disabled={isAnswered}
                  className={`flex items-center justify-center rounded-2xl border py-3 text-base font-serif transition-all ${btnClass}`}
                >
                  {year}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-4 animate-fadeIn rounded-2xl border border-[#e8dfd1] bg-[#f9f6f1] p-4 text-sm">
              <div className="flex items-start gap-2.5">
                {selectedOption === currentQ.correctYear ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1e3a1e]" />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#b91c1c]" />
                )}
                <div>
                  <p className="font-serif font-bold text-[#1e3a1e]">
                    {selectedOption === currentQ.correctYear
                      ? 'Spot on!'
                      : `Nice try! The correct year is ${currentQ.correctYear}.`}
                  </p>
                  <p className="mt-0.5 text-xs font-serif text-[#5a5a40]">{currentQ.explanation}</p>
                </div>
              </div>

              <div className="mt-3.5 flex items-center justify-between border-t border-[#e8dfd1] pt-3">
                <button
                  onClick={handleViewRelatedLetter}
                  className="text-xs font-sans text-[#1e3a1e] underline hover:text-[#b91c1c]"
                >
                  Read the {currentQ.correctYear} Christmas Letter →
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 rounded-full bg-[#1e3a1e] px-4 py-1.5 text-xs font-sans font-semibold text-white transition-all hover:bg-[#2d522d]"
                >
                  <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center py-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8efea] text-[#1e3a1e]">
            <Trophy className="h-8 w-8 animate-bounce" />
          </div>
          <h4 className="mt-3 font-serif text-xl font-bold text-[#1e3a1e]">
            Memory Lane Champ!
          </h4>
          <p className="mt-1 text-sm font-serif text-[#5a5a40]">
            You scored <strong className="text-[#1e3a1e] font-bold">{score}</strong> out of {questions.length} correct!
          </p>

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 rounded-full border border-[#e8dfd1] bg-[#f9f6f1] px-4 py-2 text-xs font-sans font-medium text-[#2c3e2d] hover:bg-[#e8efea] hover:text-[#1e3a1e]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
