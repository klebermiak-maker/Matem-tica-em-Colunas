import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, GameMode } from '@/src/components/Navbar.tsx';
import { PositionalHeader } from '@/src/components/PositionalHeader.tsx';
import { ColumnCalculator } from '@/src/components/ColumnCalculator.tsx';
import { PositionalRiddleView } from '@/src/components/PositionalRiddle.tsx';
import { PosterOverview } from '@/src/components/PosterOverview.tsx';
import { CustomAccountLab } from '@/src/components/CustomAccountLab.tsx';
import { BnccChallengeView } from '@/src/components/BnccChallengeView.tsx';
import { StudentGradeSelection } from '@/src/components/StudentGradeSelection.tsx';
import { QvlModal } from '@/src/components/QvlModal.tsx';
import {
  OperationType,
  DifficultyLevel,
  DIFFICULTIES,
  ColumnProblem,
  PosterCardItem,
  OrderKey,
  GradeLevel,
  GRADE_CONFIGS,
  BnccChallenge,
} from '@/src/types/math.ts';
import {
  generateRandomProblem,
  generatePositionalRiddles,
  generateBnccChallenges,
  shuffleArray,
  buildAdditionProblem,
  buildSubtractionProblem,
  buildMultiplicationProblem,
  buildDivisionProblem,
} from '@/src/utils/mathGenerator.ts';
import { sound } from '@/src/utils/sound.ts';
import { Sparkles, Trophy, BookOpen, Layers, X } from 'lucide-react';

export default function App() {
  const [currentOperation, setCurrentOperation] = useState<OperationType>('adicao');
  const [currentMode, setCurrentMode] = useState<GameMode>('bncc');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medio');

  // Student & Grade Selection State
  const [hasSelectedGrade, setHasSelectedGrade] = useState<boolean>(() => {
    try {
      return localStorage.getItem('math_grade_confirmed') === 'true';
    } catch {
      return false;
    }
  });

  const [studentName, setStudentName] = useState<string>(() => {
    try {
      return localStorage.getItem('math_student_name') || '';
    } catch {
      return '';
    }
  });

  const [currentGrade, setCurrentGrade] = useState<GradeLevel>(() => {
    try {
      const saved = localStorage.getItem('math_student_grade') as GradeLevel;
      if (saved && GRADE_CONFIGS[saved]) return saved;
    } catch {}
    return '3ano';
  });

  const [isGradeModalOpen, setIsGradeModalOpen] = useState<boolean>(false);

  // BNCC Challenges State
  const [bnccChallenges, setBnccChallenges] = useState<BnccChallenge[]>(() =>
    generateBnccChallenges(currentGrade)
  );
  const [currentBnccIndex, setCurrentBnccIndex] = useState<number>(0);

  // Gamification state
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isQvlOpen, setIsQvlOpen] = useState<boolean>(false);

  // Column Problem State
  const [currentProblem, setCurrentProblem] = useState<ColumnProblem>(() =>
    generateRandomProblem('adicao', 'medio')
  );

  // Riddle questions state
  const [riddles, setRiddles] = useState(() => generatePositionalRiddles(20));
  const [riddleIndex, setRiddleIndex] = useState<number>(0);

  // When student confirms or changes their grade
  const handleConfirmGradeSelection = (grade: GradeLevel, name: string) => {
    setCurrentGrade(grade);
    setStudentName(name);
    setHasSelectedGrade(true);
    setIsGradeModalOpen(false);

    try {
      localStorage.setItem('math_grade_confirmed', 'true');
      localStorage.setItem('math_student_grade', grade);
      localStorage.setItem('math_student_name', name);
    } catch {}

    // Regenerate and shuffle challenges for chosen grade
    const fresh = generateBnccChallenges(grade);
    setBnccChallenges(fresh);
    setCurrentBnccIndex(0);

    // Sync difficulty orders
    if (grade === '1ano' || grade === '2ano') {
      setDifficulty('facil');
    } else if (grade === '3ano') {
      setDifficulty('medio');
    } else if (grade === '4ano') {
      setDifficulty('avancado');
    } else {
      setDifficulty('mestre');
    }
  };

  // Handle grade change directly
  const handleSelectGrade = (grade: GradeLevel) => {
    setCurrentGrade(grade);
    try {
      localStorage.setItem('math_student_grade', grade);
    } catch {}
    const newChallenges = generateBnccChallenges(grade);
    setBnccChallenges(newChallenges);
    setCurrentBnccIndex(0);

    if (grade === '1ano' || grade === '2ano') {
      setDifficulty('facil');
    } else if (grade === '3ano') {
      setDifficulty('medio');
    } else if (grade === '4ano') {
      setDifficulty('avancado');
    } else {
      setDifficulty('mestre');
    }
  };

  // Shuffle current grade challenges
  const handleShuffleBncc = () => {
    const fresh = generateBnccChallenges(currentGrade);
    setBnccChallenges(fresh);
    setCurrentBnccIndex(0);
  };

  const handleNextBnccChallenge = () => {
    if (currentBnccIndex + 1 < bnccChallenges.length) {
      setCurrentBnccIndex((prev) => prev + 1);
    } else {
      const fresh = generateBnccChallenges(currentGrade);
      setBnccChallenges(fresh);
      setCurrentBnccIndex(0);
    }
  };

  // When changing operation or difficulty in 'conta' mode, generate a new random problem
  const handleSelectOperation = (op: OperationType) => {
    setCurrentOperation(op);
    const newProblem = generateRandomProblem(op, difficulty);
    setCurrentProblem(newProblem);
  };

  const handleSelectDifficulty = (d: DifficultyLevel) => {
    setDifficulty(d);
    const newProblem = generateRandomProblem(currentOperation, d);
    setCurrentProblem(newProblem);
  };

  const handleNextProblem = () => {
    const newProblem = generateRandomProblem(currentOperation, difficulty);
    setCurrentProblem(newProblem);
  };

  const handleSuccess = (points: number) => {
    setScore((prev) => prev + points * (1 + Math.floor(streak / 3) * 0.5));
    setStreak((prev) => prev + 1);
  };

  const handlePenalty = () => {
    setStreak(0);
  };

  const handleToggleMute = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  // Convert poster card to playable column problem
  const handleSelectPosterCard = (card: PosterCardItem) => {
    setCurrentOperation(card.operation);
    let problem: ColumnProblem;

    if (card.operation === 'adicao') {
      problem = buildAdditionProblem(card.num1, card.num2);
    } else if (card.operation === 'subtracao') {
      problem = buildSubtractionProblem(card.num1, card.num2);
    } else if (card.operation === 'multiplicacao') {
      problem = buildMultiplicationProblem(card.num1, card.num2);
    } else {
      problem = buildDivisionProblem(card.num1, card.num2);
    }

    setCurrentProblem(problem);
    setCurrentMode('conta');
  };

  // Custom Lab problem loader
  const handleLoadCustomProblem = (problem: ColumnProblem) => {
    setCurrentOperation(problem.operation);
    setCurrentProblem(problem);
    setCurrentMode('conta');
  };

  // Handle next riddle
  const handleNextRiddle = () => {
    if (riddleIndex + 1 < riddles.length) {
      setRiddleIndex(riddleIndex + 1);
    } else {
      const fresh = generatePositionalRiddles(20);
      setRiddles(fresh);
      setRiddleIndex(0);
    }
  };

  // Determine active order for PositionalHeader highlight
  const currentActiveOrder: OrderKey | undefined = useMemo(() => {
    if (currentMode === 'bncc') {
      const active = bnccChallenges[currentBnccIndex];
      if (active) {
        if (active.type === 'coluna' && active.columnProblem?.steps.length) {
          return active.columnProblem.steps[0].order;
        }
        if (active.type === 'enigma' && active.riddle) {
          return active.riddle.targetOrder;
        }
      }
    }
    if (currentMode === 'conta' && currentProblem.steps.length > 0) {
      return currentProblem.steps[0].order;
    }
    if (currentMode === 'enigma' && riddles[riddleIndex]) {
      return riddles[riddleIndex].targetOrder;
    }
    return undefined;
  }, [currentMode, bnccChallenges, currentBnccIndex, currentProblem, riddles, riddleIndex]);

  // Determine highlighted orders for PositionalHeader
  const currentHighlightedOrders = useMemo(() => {
    if (currentMode === 'bncc') {
      return GRADE_CONFIGS[currentGrade].orders;
    }
    return DIFFICULTIES[difficulty].ordersCovered;
  }, [currentMode, currentGrade, difficulty]);

  // If student has NOT yet selected their grade, present the initial selection screen!
  if (!hasSelectedGrade) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-10 px-4">
        <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          <StudentGradeSelection
            currentGrade={currentGrade}
            studentName={studentName}
            onConfirm={handleConfirmGradeSelection}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        currentOperation={currentOperation}
        onSelectOperation={handleSelectOperation}
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        difficulty={difficulty}
        onSelectDifficulty={handleSelectDifficulty}
        currentGrade={currentGrade}
        studentName={studentName}
        onOpenGradeSelection={() => setIsGradeModalOpen(true)}
        score={score}
        streak={streak}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenQvl={() => setIsQvlOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">
        {/* Quadro Valor de Lugar Header Banner */}
        <PositionalHeader
          activeOrder={currentActiveOrder}
          highlightedOrders={currentHighlightedOrders}
        />

        {/* Difficulty Selector Bar (Available on Conta and Enigma modes) */}
        {(currentMode === 'conta' || currentMode === 'enigma') && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Nível de Ordens:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {(Object.keys(DIFFICULTIES) as DifficultyLevel[]).map((level) => {
                const diffDef = DIFFICULTIES[level];
                const isActive = difficulty === level;

                return (
                  <button
                    key={level}
                    onClick={() => {
                      sound.playDigitClick();
                      handleSelectDifficulty(level);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {diffDef.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Mode Content */}
        <div className="flex-1 flex flex-col justify-center">
          {currentMode === 'bncc' && (
            <BnccChallengeView
              currentGrade={currentGrade}
              studentName={studentName}
              onSelectGrade={handleSelectGrade}
              challenges={bnccChallenges}
              currentIndex={currentBnccIndex}
              onShuffle={handleShuffleBncc}
              onNextChallenge={handleNextBnccChallenge}
              onSuccess={handleSuccess}
              onPenalty={handlePenalty}
            />
          )}

          {currentMode === 'conta' && (
            <ColumnCalculator
              problem={currentProblem}
              onNextProblem={handleNextProblem}
              onSuccess={handleSuccess}
              onPenalty={handlePenalty}
            />
          )}

          {currentMode === 'enigma' && riddles[riddleIndex] && (
            <PositionalRiddleView
              riddle={riddles[riddleIndex]}
              onNext={handleNextRiddle}
              onSuccess={handleSuccess}
              onPenalty={handlePenalty}
            />
          )}

          {currentMode === 'poster' && (
            <PosterOverview onSelectProblem={handleSelectPosterCard} />
          )}

          {currentMode === 'laboratorio' && (
            <CustomAccountLab onLoadCustomProblem={handleLoadCustomProblem} />
          )}
        </div>
      </main>

      {/* Grade Switcher Modal */}
      {isGradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 relative">
            <button
              onClick={() => setIsGradeModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <StudentGradeSelection
              currentGrade={currentGrade}
              studentName={studentName}
              onConfirm={handleConfirmGradeSelection}
              onCancel={() => setIsGradeModalOpen(false)}
              isModal
            />
          </div>
        </div>
      )}

      {/* QVL Learning Modal */}
      <QvlModal isOpen={isQvlOpen} onClose={() => setIsQvlOpen(false)} />

      {/* Educational Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              Matemática Posicional alinhada à BNCC (1º ao 5º Ano do Ensino Fundamental I).
            </span>
          </div>
          <div>
            Baseado no cartaz pedagógico das 4 Operações em Colunas.
          </div>
        </div>
      </footer>
    </div>
  );
}
