import React, { useState } from 'react';
import {
  Shuffle,
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Award,
  Layers,
} from 'lucide-react';
import {
  GradeLevel,
  GRADE_CONFIGS,
  BnccChallenge,
  OrderKey,
  ORDERS,
} from '@/src/types/math.ts';
import { ColumnCalculator } from '@/src/components/ColumnCalculator.tsx';
import { PositionalRiddleView } from '@/src/components/PositionalRiddle.tsx';
import { sound } from '@/src/utils/sound.ts';
import confetti from 'canvas-confetti';

interface BnccChallengeViewProps {
  currentGrade: GradeLevel;
  studentName?: string;
  onSelectGrade: (grade: GradeLevel) => void;
  challenges: BnccChallenge[];
  currentIndex: number;
  onShuffle: () => void;
  onNextChallenge: () => void;
  onSuccess: (pts: number) => void;
  onPenalty: () => void;
}

export const BnccChallengeView: React.FC<BnccChallengeViewProps> = ({
  currentGrade,
  studentName,
  onSelectGrade,
  challenges,
  currentIndex,
  onShuffle,
  onNextChallenge,
  onSuccess,
  onPenalty,
}) => {
  const gradeConfig = GRADE_CONFIGS[currentGrade];
  const activeChallenge = challenges[currentIndex];
  const totalCount = challenges.length;

  const gradesList: GradeLevel[] = ['1ano', '2ano', '3ano', '4ano', '5ano'];

  const handleShuffleClick = () => {
    sound.playDigitClick();
    onShuffle();
  };

  const isLast = currentIndex === totalCount - 1;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Grade Selector (1º ao 5º ano) */}
      <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-xs p-4 sm:p-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-display font-extrabold text-slate-900 leading-tight">
                {studentName ? `Olá, ${studentName}! ` : ''}Desafios BNCC por Série / Turma
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Alinhado às habilidades do Sistema de Numeração Decimal e Cálculo
              </p>
            </div>
          </div>

          {/* Shuffle Button */}
          <button
            onClick={handleShuffleClick}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
            title="Embaralhar todos os desafios desta série"
          >
            <Shuffle className="w-4 h-4 text-indigo-600" />
            <span>Embaralhar Desafios</span>
          </button>
        </div>

        {/* 5 Grade Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {gradesList.map((g) => {
            const cfg = GRADE_CONFIGS[g];
            const isSelected = currentGrade === g;

            return (
              <button
                key={g}
                onClick={() => {
                  sound.playDigitClick();
                  onSelectGrade(g);
                }}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                  isSelected
                    ? `${cfg.badgeBg} border-2 ${cfg.border} ring-2 ring-slate-400 ring-offset-1 shadow-xs scale-[1.02]`
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span
                  className={`px-2 py-0.5 rounded-lg text-xs font-display font-bold ${
                    isSelected ? cfg.badgeColor : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {cfg.title}
                </span>
                <span className="text-[11px] font-semibold text-slate-800 mt-1.5 leading-tight">
                  {cfg.subtitle}
                </span>
                <div className="flex gap-1 mt-1.5">
                  {cfg.orders.map((ord) => (
                    <span
                      key={ord}
                      className={`text-[9px] font-bold px-1 rounded-sm ${ORDERS[ord].color}`}
                    >
                      {ord}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active BNCC Skill Badge & Progress Card */}
      {activeChallenge && (
        <div className="w-full bg-slate-50 rounded-2xl border border-slate-200 p-4 mb-5 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-indigo-600 text-white shadow-xs">
                BNCC {activeChallenge.skill.code}
              </span>
              <span className="text-xs font-bold text-slate-800">
                {activeChallenge.skill.shortTitle}
              </span>
            </div>

            {/* Counter */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>
                Desafio <strong className="text-slate-900">{currentIndex + 1}</strong> de{' '}
                <strong className="text-slate-900">{totalCount}</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-700 font-bold">
                {activeChallenge.type === 'coluna' ? 'Conta Armada' : 'Enigma Posicional'}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-700">Objetivo de Aprendizagem: </strong>
            {activeChallenge.skill.description}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Render the active challenge */}
      <div className="w-full">
        {activeChallenge && activeChallenge.type === 'coluna' && activeChallenge.columnProblem && (
          <ColumnCalculator
            problem={activeChallenge.columnProblem}
            onNextProblem={onNextChallenge}
            onSuccess={(pts) => onSuccess(pts + 20)} // bonus for BNCC challenge
            onPenalty={onPenalty}
          />
        )}

        {activeChallenge && activeChallenge.type === 'enigma' && activeChallenge.riddle && (
          <PositionalRiddleView
            riddle={activeChallenge.riddle}
            onNext={onNextChallenge}
            onSuccess={(pts) => onSuccess(pts + 20)}
            onPenalty={onPenalty}
          />
        )}

        {/* If no challenge or finished */}
        {!activeChallenge && (
          <div className="w-full bg-white rounded-3xl border border-slate-200 p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Award className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">
              Parabéns! Todos os desafios do {gradeConfig.title} concluídos!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mb-6">
              Você praticou com sucesso todas as habilidades da BNCC para esta série.
            </p>
            <button
              onClick={handleShuffleClick}
              className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-display font-bold text-sm hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Embaralhar e Jogar Novamente</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
