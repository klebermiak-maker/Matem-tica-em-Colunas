import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Brain,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Info,
  HelpCircle,
} from 'lucide-react';
import { PositionalRiddle, ORDERS, ORDER_KEYS_DESC } from '@/src/types/math.ts';
import { getNumberDigits, formatBRNumber } from '@/src/utils/mathGenerator.ts';
import { sound } from '@/src/utils/sound.ts';

interface PositionalRiddleProps {
  riddle: PositionalRiddle;
  onNext: () => void;
  onSuccess: (pts: number) => void;
  onPenalty: () => void;
}

export const PositionalRiddleView: React.FC<PositionalRiddleProps> = ({
  riddle,
  onNext,
  onSuccess,
  onPenalty,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleSelectOption = (optionId: string, correct: boolean) => {
    if (isAnswered) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrectStep();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      onSuccess(50);
    } else {
      sound.playError();
      onPenalty();
    }
  };

  // If there's a highlight number, extract orders for educational visualization
  const digits = riddle.highlightNumber ? getNumberDigits(riddle.highlightNumber) : null;
  const numLength = riddle.highlightNumber ? riddle.highlightNumber.toString().length : 0;
  const relevantOrders = digits
    ? ORDER_KEYS_DESC.slice(ORDER_KEYS_DESC.length - Math.max(numLength, 3))
    : [];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Quiz Card */}
      <div className="w-full bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 sm:p-8 flex flex-col">
        {/* Header tag */}
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Brain className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                {riddle.title}
              </span>
              <span className="text-xs text-slate-400 block">
                Desafio do Sistema de Numeração Decimal
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            +50 pts
          </span>
        </div>

        {/* Number decomposition visualizer if present */}
        {riddle.highlightNumber && digits && (
          <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-indigo-600" />
              Quadro de Ordens para o número {formatBRNumber(riddle.highlightNumber)}:
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {relevantOrders.map((ord) => {
                const def = ORDERS[ord];
                const digit = digits[ord];
                const isTarget = riddle.targetOrder === ord;

                return (
                  <div
                    key={ord}
                    className={`flex flex-col items-center p-2 rounded-xl border transition-all ${
                      isTarget
                        ? `${def.bgLight} border-2 ${def.border} ring-2 ring-indigo-400 scale-105 shadow-sm`
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${def.color} mb-1`}
                    >
                      {ord}
                    </span>
                    <span className="font-number font-extrabold text-2xl text-slate-900">
                      {digit}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                      {def.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Question Prompt */}
        <h2 className="text-lg sm:text-xl font-display font-bold text-slate-900 leading-snug mb-6">
          {riddle.question}
        </h2>

        {/* Multiple Choice Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {riddle.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

            if (isAnswered) {
              if (option.isCorrect) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200';
              } else if (isSelected && !option.isCorrect) {
                btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-200';
              } else {
                btnStyle = 'opacity-50 bg-slate-50 border-slate-200 text-slate-500';
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id, option.isCorrect)}
                disabled={isAnswered}
                className={`p-4 rounded-2xl border-2 font-display font-semibold text-left transition-all flex items-center justify-between gap-3 text-sm sm:text-base cursor-pointer ${btnStyle}`}
              >
                <span>{option.text}</span>
                {isAnswered && (
                  <div>
                    {option.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card upon answering */}
        {isAnswered && (
          <div
            className={`p-4 rounded-2xl border mb-6 flex items-start gap-3 animate-in fade-in duration-200 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <Sparkles className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-1 font-bold">
                {isCorrect ? 'Muito bem!' : 'Dica de Aprendizado:'}
              </strong>
              <p className="text-sm leading-relaxed">{riddle.explanation}</p>
            </div>
          </div>
        )}

        {/* Next Question Action */}
        {isAnswered && (
          <div className="flex justify-end">
            <button
              onClick={() => {
                sound.playDigitClick();
                setSelectedOptionId(null);
                setIsAnswered(false);
                setIsCorrect(false);
                onNext();
              }}
              className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-display font-bold text-sm sm:text-base hover:bg-slate-800 transition-all shadow-md flex items-center gap-2 group cursor-pointer"
            >
              <span>Próximo Enigma</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
