import React from 'react';
import {
  Volume2,
  VolumeX,
  HelpCircle,
  Trophy,
  Flame,
  Grid,
  HelpCircle as QuestionIcon,
  LayoutTemplate,
  Sliders,
  GraduationCap,
} from 'lucide-react';
import { OperationType, DifficultyLevel, DIFFICULTIES, GradeLevel, GRADE_CONFIGS } from '@/src/types/math.ts';
import { sound } from '@/src/utils/sound.ts';

export type GameMode = 'bncc' | 'conta' | 'enigma' | 'poster' | 'laboratorio';

interface NavbarProps {
  currentOperation: OperationType;
  onSelectOperation: (op: OperationType) => void;
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  difficulty: DifficultyLevel;
  onSelectDifficulty: (d: DifficultyLevel) => void;
  currentGrade: GradeLevel;
  studentName: string;
  onOpenGradeSelection: () => void;
  score: number;
  streak: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenQvl: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentOperation,
  onSelectOperation,
  currentMode,
  onSelectMode,
  difficulty,
  onSelectDifficulty,
  currentGrade,
  studentName,
  onOpenGradeSelection,
  score,
  streak,
  isMuted,
  onToggleMute,
  onOpenQvl,
}) => {
  const operations: { key: OperationType; label: string; symbol: string; color: string; activeStyle: string }[] = [
    {
      key: 'adicao',
      label: 'ADIÇÃO',
      symbol: '+',
      color: 'hover:text-sky-600',
      activeStyle: 'bg-sky-600 text-white shadow-md shadow-sky-600/20 border-sky-600',
    },
    {
      key: 'subtracao',
      label: 'SUBTRAÇÃO',
      symbol: '−',
      color: 'hover:text-red-600',
      activeStyle: 'bg-red-600 text-white shadow-md shadow-red-600/20 border-red-600',
    },
    {
      key: 'multiplicacao',
      label: 'MULTIPLICAÇÃO',
      symbol: '×',
      color: 'hover:text-emerald-700',
      activeStyle: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 border-emerald-600',
    },
    {
      key: 'divisao',
      label: 'DIVISÃO',
      symbol: '÷',
      color: 'hover:text-purple-700',
      activeStyle: 'bg-purple-600 text-white shadow-md shadow-purple-600/20 border-purple-600',
    },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        {/* Top row: Brand + Stats + Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-slate-100">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 via-emerald-500 to-amber-500 flex items-center justify-center text-white shadow-sm font-display font-extrabold text-xl">
              123
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 tracking-tight">
                  Matemática em Colunas
                </h1>
                <span className="hidden md:inline-block text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  QVL Posicional
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Unidades · Dezenas · Centenas · Milhar · Dezena de Milhar · Centena de Milhar
              </p>
            </div>
          </div>

          {/* Right Action Bar: Student Grade, Score, Streak, QVL, Sound */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Student & Grade Button */}
            <button
              onClick={() => {
                sound.playDigitClick();
                onOpenGradeSelection();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
              title="Clique para alterar Série / Ano ou Nome do Aluno"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-none">
                {studentName ? `${studentName} · ` : ''}{GRADE_CONFIGS[currentGrade].title}
              </span>
              <span className="text-[10px] bg-indigo-200 text-indigo-900 px-1.5 py-0.5 rounded-md font-semibold hidden sm:inline">
                Trocar
              </span>
            </button>

            {/* Score & Streak unboxed with clean typography */}
            <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1.5 text-amber-600">
                <Trophy className="w-4 h-4" />
                <span className="font-number font-bold text-slate-900 text-sm">{score}</span>
                <span className="text-[11px] text-slate-500">pts</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1 text-rose-500">
                <Flame className="w-4 h-4" />
                <span className="font-number font-bold text-slate-900 text-sm">{streak}</span>
                <span className="text-[11px] text-slate-500">combo</span>
              </div>
            </div>

            {/* QVL Guide Button */}
            <button
              onClick={() => {
                sound.playDigitClick();
                onOpenQvl();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              title="Abrir Guia do Quadro Valor de Lugar"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Guia QVL</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                onToggleMute();
                sound.playDigitClick();
              }}
              className={`p-2 rounded-xl border transition-colors ${
                isMuted
                  ? 'bg-slate-100 text-slate-400 border-slate-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
              title={isMuted ? 'Ativar som' : 'Silenciar som'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Second row: 4 Operation Tabs directly matching poster */}
        <div className="pt-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          {/* Operations Tabs */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 flex-1 max-w-2xl">
            {operations.map((op) => {
              const isSelected = currentOperation === op.key;
              return (
                <button
                  key={op.key}
                  onClick={() => {
                    sound.playDigitClick();
                    onSelectOperation(op.key);
                  }}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs sm:text-sm font-display font-bold transition-all border ${
                    isSelected
                      ? op.activeStyle
                      : `bg-slate-50 text-slate-700 border-slate-200 ${op.color} hover:bg-slate-100`
                  }`}
                >
                  <span className="font-number text-base leading-none">{op.symbol}</span>
                  <span className="truncate">{op.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => {
                sound.playDigitClick();
                onSelectMode('bncc');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                currentMode === 'bncc'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-900 bg-indigo-50/60 hover:bg-indigo-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Desafios BNCC (1º ao 5º)
            </button>
            <button
              onClick={() => {
                sound.playDigitClick();
                onSelectMode('conta');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                currentMode === 'conta'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-sky-600" />
              Conta Armada
            </button>
            <button
              onClick={() => {
                sound.playDigitClick();
                onSelectMode('enigma');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                currentMode === 'enigma'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <QuestionIcon className="w-3.5 h-3.5 text-amber-600" />
              Enigmas Posicionais
            </button>
            <button
              onClick={() => {
                sound.playDigitClick();
                onSelectMode('poster');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                currentMode === 'poster'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-purple-600" />
              Cartaz Original
            </button>
            <button
              onClick={() => {
                sound.playDigitClick();
                onSelectMode('laboratorio');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                currentMode === 'laboratorio'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-600" />
              Laboratório
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
