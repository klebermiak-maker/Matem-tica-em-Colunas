import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Eye,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  ColumnProblem,
  OperationType,
  ORDER_KEYS_DESC,
  ORDER_KEYS_ASC,
  ORDERS,
  OrderKey,
} from '@/src/types/math.ts';
import { OPERATION_META, getNumberDigits, formatBRNumber } from '@/src/utils/mathGenerator.ts';
import { sound } from '@/src/utils/sound.ts';

interface ColumnCalculatorProps {
  problem: ColumnProblem;
  onNextProblem: () => void;
  onSuccess: (points: number) => void;
  onPenalty: () => void;
}

export const ColumnCalculator: React.FC<ColumnCalculatorProps> = ({
  problem,
  onNextProblem,
  onSuccess,
  onPenalty,
}) => {
  const meta = OPERATION_META[problem.operation];

  // Which orders are relevant for this problem?
  const maxDigitsCount = Math.max(
    problem.num1.toString().length,
    problem.num2.toString().length,
    problem.result.toString().length
  );

  // Active orders in descending order (e.g. ['C', 'D', 'U'])
  const activeOrders = ORDER_KEYS_DESC.slice(ORDER_KEYS_DESC.length - Math.max(maxDigitsCount, 2));

  // Current step index (0 is first step, usually units for add/sub/mul, left-to-right for div)
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);

  // Reset when problem changes
  useEffect(() => {
    setCurrentStepIdx(0);
    setUserInputs({});
    setIsCompleted(false);
    setShowHint(false);
    setErrorFeedback(null);
  }, [problem.id]);

  const digits1 = getNumberDigits(problem.num1);
  const digits2 = getNumberDigits(problem.num2);
  const resultDigits = getNumberDigits(problem.result);

  const currentStep = problem.steps[currentStepIdx];

  // Handle digit keypad or input
  const handleDigitInput = (digit: number) => {
    if (isCompleted || !currentStep) return;

    sound.playDigitClick();
    setErrorFeedback(null);

    const expected = currentStep.expectedResultDigit;

    if (digit === expected || (expected >= 10 && digit === expected % 10)) {
      // Correct digit!
      sound.playCorrectStep();
      const updatedInputs = { ...userInputs, [currentStep.order]: digit.toString() };
      setUserInputs(updatedInputs);

      // Advance step
      if (currentStepIdx + 1 < problem.steps.length) {
        setCurrentStepIdx(currentStepIdx + 1);
        setShowHint(false);
      } else {
        // Solved whole problem!
        setIsCompleted(true);
        sound.playSuccessFanfare();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        const points = 30 + activeOrders.length * 15;
        onSuccess(points);
      }
    } else {
      // Mistake
      sound.playError();
      setErrorFeedback(`Não é ${digit}. Vamos conferir a ordem das ${ORDERS[currentStep.order].name}s!`);
      onPenalty();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Banner matching the image's vibrant headers */}
      <div className={`w-full p-4 rounded-3xl ${meta.cardBg} border-2 ${meta.cardBorder} mb-6 shadow-sm`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-xl text-sm font-display font-bold ${meta.badgeColor} shadow-xs tracking-wide`}
            >
              {meta.title}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {meta.subtitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                showHint
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              {showHint ? 'Ocultar Dica' : 'Explicar Passo'}
            </button>
          </div>
        </div>

        <p className="text-sm font-medium text-slate-700 mb-1">
          {meta.concept} Resolva calculando o valor posicional de cada algarismo.
        </p>

        {/* Current order step prompt */}
        {!isCompleted && currentStep && (
          <div className="mt-3 p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-xs ${
                  ORDERS[currentStep.order].color
                }`}
              >
                {currentStep.order}
              </span>
              <div>
                <span className="text-xs font-bold text-slate-800">
                  {currentStep.stepDescription}
                </span>
                <span className="text-xs text-slate-500 block">
                  (Ordem da {ORDERS[currentStep.order].name})
                </span>
              </div>
            </div>

            <span className="text-xs font-semibold text-slate-400">
              Passo {currentStepIdx + 1} de {problem.steps.length}
            </span>
          </div>
        )}

        {/* Educational Hint Display */}
        {showHint && currentStep && (
          <div className="mt-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs sm:text-sm text-amber-900 flex items-start gap-2.5 animate-in fade-in duration-200">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Como resolver: </strong>
              {currentStep.calculationExplanation}
            </div>
          </div>
        )}

        {errorFeedback && (
          <div className="mt-2.5 p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-center gap-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorFeedback}</span>
          </div>
        )}
      </div>

      {/* Arithmetic Board */}
      <div className="w-full bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 sm:p-8 flex flex-col items-center relative overflow-hidden">
        {/* Subtle grid paper pattern background */}
        <div className="absolute inset-0 grid-paper-pattern opacity-40 pointer-events-none" />

        {problem.operation !== 'divisao' ? (
          /* STANDARD VERTICAL COLUMN LAYOUT (Adição, Subtração, Multiplicação) */
          <div className="relative z-10 flex flex-col items-end max-w-full">
            {/* 1. Column Order Headers */}
            <div className="flex gap-2 sm:gap-3 mb-2">
              <div className="w-8 sm:w-12 text-center text-xs font-bold text-slate-400">
                {/* Operator spacer */}
              </div>
              {activeOrders.map((ord) => {
                const def = ORDERS[ord];
                const isStepOrder = currentStep && currentStep.order === ord && !isCompleted;
                return (
                  <div
                    key={ord}
                    className={`w-11 sm:w-14 py-1 text-center rounded-lg text-xs font-bold transition-all ${
                      isStepOrder
                        ? `${def.color} ring-2 ring-offset-2 ring-slate-400 scale-105 shadow-xs`
                        : `${def.bgLight} ${def.textColor}`
                    }`}
                  >
                    {ord}
                  </div>
                );
              })}
            </div>

            {/* 2. Carries row (Vai-um) for Addition & Multiplication */}
            <div className="flex gap-2 sm:gap-3 mb-1 min-h-[28px] items-center">
              <div className="w-8 sm:w-12" />
              {activeOrders.map((ord) => {
                // Find if there is a carry into this order
                const stepForThis = problem.steps.find((s) => s.order === ord);
                const hasCarry = stepForThis && stepForThis.carryIn && stepForThis.carryIn > 0;
                // Reveal carry if we have reached or passed this step
                const stepIdx = problem.steps.findIndex((s) => s.order === ord);
                const revealed = hasCarry && currentStepIdx >= stepIdx;

                return (
                  <div key={ord} className="w-11 sm:w-14 flex justify-center">
                    {revealed ? (
                      <span className="w-6 h-6 rounded-full bg-amber-100 border border-amber-400 text-amber-800 text-xs font-bold font-number flex items-center justify-center animate-bounce">
                        {stepForThis?.carryIn}
                      </span>
                    ) : (
                      <span className="w-6 h-6" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* 3. Top Number row */}
            <div className="flex items-center gap-2 sm:gap-3 my-1">
              <div className="w-8 sm:w-12" />
              {activeOrders.map((ord) => {
                const digit = digits1[ord];
                const isStepOrder = currentStep && currentStep.order === ord && !isCompleted;
                // If subtraction borrowed from here, indicate it
                const wasBorrowed =
                  problem.operation === 'subtracao' &&
                  currentStep &&
                  currentStep.order === ord &&
                  currentStep.borrowed;

                return (
                  <div
                    key={ord}
                    className={`w-11 sm:w-14 h-14 sm:h-16 flex items-center justify-center font-number text-3xl sm:text-4xl font-extrabold rounded-2xl border transition-all ${
                      isStepOrder
                        ? 'bg-amber-50/70 border-amber-300 text-slate-900 ring-2 ring-amber-400 ring-offset-1'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    {wasBorrowed ? (
                      <div className="relative">
                        <span className="line-through text-slate-400 text-2xl">{digit}</span>
                        <span className="absolute -top-3 -right-2 text-sm font-bold text-rose-600 bg-rose-100 px-1 rounded-sm">
                          {currentStep.topDigit}
                        </span>
                      </div>
                    ) : (
                      digit
                    )}
                  </div>
                );
              })}
            </div>

            {/* 4. Bottom Number row with Operator */}
            <div className="flex items-center gap-2 sm:gap-3 my-1">
              <div className="w-8 sm:w-12 flex items-center justify-center font-display font-extrabold text-2xl sm:text-3xl text-slate-700">
                {meta.operatorSymbol}
              </div>
              {activeOrders.map((ord) => {
                const digit = digits2[ord];
                const isStepOrder = currentStep && currentStep.order === ord && !isCompleted;

                return (
                  <div
                    key={ord}
                    className={`w-11 sm:w-14 h-14 sm:h-16 flex items-center justify-center font-number text-3xl sm:text-4xl font-extrabold rounded-2xl border transition-all ${
                      isStepOrder
                        ? 'bg-amber-50/70 border-amber-300 text-slate-900 ring-2 ring-amber-400 ring-offset-1'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    {digit}
                  </div>
                );
              })}
            </div>

            {/* 5. Solid Calculation Line */}
            <div className="w-full my-2 border-b-4 border-slate-900 rounded-full" />

            {/* 6. Result row */}
            <div className="flex items-center gap-2 sm:gap-3 my-1">
              <div className="w-8 sm:w-12" />
              {activeOrders.map((ord) => {
                const isStepOrder = currentStep && currentStep.order === ord && !isCompleted;
                const value = userInputs[ord];
                const expected = resultDigits[ord];
                const isRevealed = isCompleted || value !== undefined;

                return (
                  <div
                    key={ord}
                    className={`w-11 sm:w-14 h-14 sm:h-16 flex items-center justify-center font-number text-3xl sm:text-4xl font-extrabold rounded-2xl border-2 transition-all ${
                      isCompleted
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-600 shadow-sm'
                        : isStepOrder
                        ? 'bg-white border-sky-500 text-sky-600 shadow-md ring-4 ring-sky-100 animate-pulse'
                        : value !== undefined
                        ? 'bg-slate-100 border-slate-300 text-slate-800'
                        : 'bg-slate-50 border-dashed border-slate-300 text-slate-300'
                    }`}
                  >
                    {isRevealed ? (value ?? expected) : '?'}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* DIVISION LAYOUT (Método da Chave - Autêntico estilo didático) */
          <div className="relative z-10 w-full max-w-md">
            <div className="flex items-start justify-center gap-4 sm:gap-6">
              {/* Dividendo & Subtrações */}
              <div className="flex flex-col items-end pr-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Dividendo
                </div>
                <div className="font-number font-extrabold text-3xl sm:text-4xl text-slate-900 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
                  {formatBRNumber(problem.num1)}
                </div>

                {/* Subtraction steps */}
                <div className="mt-4 space-y-2 text-right">
                  <div className="text-xs font-semibold text-slate-400">Resto:</div>
                  <div className="font-number font-bold text-2xl text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                    {isCompleted ? (problem.remainder ?? 0) : '...'}
                  </div>
                </div>
              </div>

              {/* Chave de divisão */}
              <div className="flex flex-col border-l-4 border-slate-900 pl-4 sm:pl-6 min-h-[160px]">
                {/* Divisor */}
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Divisor
                </div>
                <div className="font-number font-extrabold text-3xl sm:text-4xl text-slate-900 pb-2 border-b-4 border-slate-900">
                  {problem.num2}
                </div>

                {/* Quociente (Resultado) */}
                <div className="mt-3">
                  <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
                    Quociente
                  </div>
                  <div className="font-number font-extrabold text-3xl sm:text-4xl text-purple-700 min-h-[44px]">
                    {isCompleted
                      ? formatBRNumber(problem.result)
                      : Object.values(userInputs).join('') || '?'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completion Message & Next Button */}
        {isCompleted ? (
          <div className="relative z-10 mt-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 mb-1">
              Parabéns! Conta resolvida com sucesso!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mb-4">
              Você dominou cada ordem posicional do cálculo:{' '}
              <strong className="font-number text-slate-900">
                {formatBRNumber(problem.num1)} {meta.operatorSymbol} {formatBRNumber(problem.num2)} ={' '}
                {formatBRNumber(problem.result)}
              </strong>
            </p>
            <button
              onClick={() => {
                sound.playDigitClick();
                onNextProblem();
              }}
              className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-display font-bold text-base hover:bg-slate-800 transition-all shadow-md flex items-center gap-2 group"
            >
              <span>Próxima Conta Armada</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          /* Interactive Number Keypad */
          <div className="relative z-10 mt-8 w-full max-w-md">
            <div className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Clique no algarismo da{' '}
              <span className="text-indigo-600 font-extrabold underline">
                {currentStep ? ORDERS[currentStep.order].name : 'Ordem'}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
                <button
                  key={digit}
                  onClick={() => handleDigitInput(digit)}
                  className="h-12 sm:h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-900 font-number font-bold text-xl sm:text-2xl border border-slate-300 transition-all shadow-xs flex items-center justify-center cursor-pointer"
                >
                  {digit}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
