import React, { useState } from 'react';
import { Play, Sparkles, Plus, Minus, X, Divide, ArrowRight } from 'lucide-react';
import { OperationType, ColumnProblem, ORDERS, ORDER_KEYS_DESC } from '@/src/types/math.ts';
import {
  buildAdditionProblem,
  buildSubtractionProblem,
  buildMultiplicationProblem,
  buildDivisionProblem,
  getNumberDigits,
  formatBRNumber,
} from '@/src/utils/mathGenerator.ts';
import { sound } from '@/src/utils/sound.ts';

interface CustomAccountLabProps {
  onLoadCustomProblem: (problem: ColumnProblem) => void;
}

export const CustomAccountLab: React.FC<CustomAccountLabProps> = ({
  onLoadCustomProblem,
}) => {
  const [operation, setOperation] = useState<OperationType>('adicao');
  const [val1, setVal1] = useState<string>('48250');
  const [val2, setVal2] = useState<string>('23915');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const num1 = parseInt(val1.replace(/\D/g, ''), 10) || 0;
  const num2 = parseInt(val2.replace(/\D/g, ''), 10) || 0;

  const digits1 = getNumberDigits(num1);
  const digits2 = getNumberDigits(num2);

  const handleArmAccount = () => {
    sound.playDigitClick();
    setErrorMsg(null);

    if (num1 <= 0 || num2 <= 0) {
      setErrorMsg('Por favor insira números positivos maiores que zero.');
      return;
    }

    if (num1 > 999999 || num2 > 999999) {
      setErrorMsg('Os números devem ter no máximo 6 algarismos (até Centena de Milhar).');
      return;
    }

    if (operation === 'subtracao' && num1 < num2) {
      setErrorMsg('Na subtração, o primeiro número (minuendo) deve ser maior ou igual ao segundo (subtraendo).');
      return;
    }

    if (operation === 'multiplicacao' && num2 > 99) {
      setErrorMsg('Para a multiplicação em coluna posicional, sugerimos um multiplicador de até 2 dígitos.');
      return;
    }

    if (operation === 'divisao' && num2 > 12) {
      setErrorMsg('Para a divisão pela chave no jogo, utilize divisor de 1 a 12.');
      return;
    }

    let problem: ColumnProblem;
    if (operation === 'adicao') {
      problem = buildAdditionProblem(num1, num2);
    } else if (operation === 'subtracao') {
      problem = buildSubtractionProblem(num1, num2);
    } else if (operation === 'multiplicacao') {
      problem = buildMultiplicationProblem(num1, num2);
    } else {
      problem = buildDivisionProblem(num1, num2);
    }

    onLoadCustomProblem(problem);
  };

  const applyPreset = (n1: number, n2: number, op: OperationType) => {
    sound.playDigitClick();
    setVal1(n1.toString());
    setVal2(n2.toString());
    setOperation(op);
    setErrorMsg(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Intro */}
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          Laboratório: Arme sua Própria Conta
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-xl mx-auto">
          Escolha os números (desde Unidades até Centenas de Milhar) e a operação. O jogo montará a conta armada automaticamente em colunas alinhadas por ordem de lugar!
        </p>
      </div>

      {/* Main Form Box */}
      <div className="w-full bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 sm:p-8 flex flex-col gap-6">
        {/* Step 1: Operation Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            1. Selecione a Operação
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'adicao', label: 'Adição (+)', icon: Plus, color: 'text-sky-600 border-sky-400 bg-sky-50' },
              { id: 'subtracao', label: 'Subtração (−)', icon: Minus, color: 'text-red-600 border-red-400 bg-red-50' },
              { id: 'multiplicacao', label: 'Multiplicação (×)', icon: X, color: 'text-emerald-600 border-emerald-400 bg-emerald-50' },
              { id: 'divisao', label: 'Divisão (÷)', icon: Divide, color: 'text-purple-600 border-purple-400 bg-purple-50' },
            ].map((item) => {
              const isSelected = operation === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playDigitClick();
                    setOperation(item.id as OperationType);
                  }}
                  className={`p-3.5 rounded-2xl border-2 font-display font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? `${item.color} shadow-sm ring-2 ring-slate-400 ring-offset-1`
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Numbers Input */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              1º Número ({operation === 'divisao' ? 'Dividendo' : 'Primeira Parcela / Minuendo'})
            </label>
            <input
              type="number"
              min={1}
              max={999999}
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-hidden font-number text-2xl font-bold text-slate-900 bg-slate-50"
              placeholder="Ex: 48250"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Algarismos: {val1.length} ordens (até Centena de Milhar)
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              2º Número ({operation === 'divisao' ? 'Divisor' : operation === 'multiplicacao' ? 'Multiplicador' : 'Segunda Parcela'})
            </label>
            <input
              type="number"
              min={1}
              max={operation === 'divisao' ? 12 : 999999}
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-hidden font-number text-2xl font-bold text-slate-900 bg-slate-50"
              placeholder="Ex: 23915"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              {operation === 'divisao' ? 'Divisor de 1 a 12' : `Algarismos: ${val2.length} ordens`}
            </span>
          </div>
        </div>

        {/* Live Positional Decomposition Preview */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Alinhamento Posicional das Ordens:
          </div>

          <div className="grid grid-cols-6 gap-2 text-center">
            {ORDER_KEYS_DESC.map((ord) => {
              const def = ORDERS[ord];
              const d1 = digits1[ord];
              const d2 = digits2[ord];
              return (
                <div key={ord} className="p-2 bg-white rounded-xl border border-slate-200 flex flex-col items-center">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${def.color} mb-1`}>
                    {ord}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold truncate max-w-full">
                    {def.name.split(' ')[0]}
                  </span>
                  <div className="font-number font-bold text-lg text-slate-800 mt-1">{d1}</div>
                  <div className="font-number font-bold text-lg text-slate-600">{d2}</div>
                </div>
              );
            })}
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs sm:text-sm text-rose-700 font-medium">
            {errorMsg}
          </div>
        )}

        {/* Quick Presets */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Sugestões Rápidas de Ordens:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset(425, 318, 'adicao')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Centenas: 425 + 318
            </button>
            <button
              onClick={() => applyPreset(4820, 2375, 'subtracao')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Milhar: 4.820 − 2.375
            </button>
            <button
              onClick={() => applyPreset(38400, 19250, 'adicao')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Dezena de Milhar: 38.400 + 19.250
            </button>
            <button
              onClick={() => applyPreset(245890, 138740, 'adicao')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Centena de Milhar: 245.890 + 138.740
            </button>
            <button
              onClick={() => applyPreset(1452, 6, 'multiplicacao')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Multiplicação: 1.452 × 6
            </button>
            <button
              onClick={() => applyPreset(848, 4, 'divisao')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Divisão Chave: 848 ÷ 4
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleArmAccount}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-display font-bold text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Armar Conta e Praticar no Jogo</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
