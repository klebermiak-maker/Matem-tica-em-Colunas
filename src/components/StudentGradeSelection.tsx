import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  User,
  BookOpen,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { GradeLevel, GRADE_CONFIGS, ORDERS } from '@/src/types/math.ts';
import { sound } from '@/src/utils/sound.ts';

interface StudentGradeSelectionProps {
  currentGrade?: GradeLevel;
  studentName: string;
  onConfirm: (grade: GradeLevel, name: string) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

export const StudentGradeSelection: React.FC<StudentGradeSelectionProps> = ({
  currentGrade = '3ano',
  studentName: initialName,
  onConfirm,
  onCancel,
  isModal = false,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(currentGrade);
  const [name, setName] = useState<string>(initialName);

  const gradeKeys: GradeLevel[] = ['1ano', '2ano', '3ano', '4ano', '5ano'];

  const gradeDescriptions: Record<GradeLevel, { tagline: string; highlight: string }> = {
    '1ano': {
      tagline: 'Descubra os números até 99 e a mágica de juntar e tirar quantidades!',
      highlight: 'Unidades e Dezenas · Agrupamentos de 10 em 10',
    },
    '2ano': {
      tagline: 'Aprenda sobre a casa das Centenas até 999 e monte suas primeiras contas armadas!',
      highlight: 'Centenas, Dezenas e Unidades · Vai-um inicial',
    },
    '3ano': {
      tagline: 'Conquiste a Unidade de Milhar até 9.999, o vai-um e empréstimos nas 4 operações!',
      highlight: 'Milhares até 9.999 · Reagrupamento e algoritmo da chave',
    },
    '4ano': {
      tagline: 'Desvende as Dezenas de Milhar até 99.999 e domine cálculos avançados em colunas!',
      highlight: 'Dezenas de Milhar · Potências de 10 e operações combinadas',
    },
    '5ano': {
      tagline: 'Torne-se mestre da Centena de Milhar até 999.999, classes e divisão euclidiana!',
      highlight: 'Centena de Milhar · Classe Simples e dos Milhares',
    },
  };

  const handleSelect = (g: GradeLevel) => {
    sound.playDigitClick();
    setSelectedGrade(g);
  };

  const handleStart = () => {
    sound.playSuccessFanfare();
    onConfirm(selectedGrade, name.trim());
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto flex flex-col items-center ${
        isModal ? 'p-2 sm:p-4' : 'py-6 px-4'
      }`}
    >
      {/* Welcome Header */}
      <div className="w-full text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-3 shadow-2xs">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>Educação Matemática alinhada à BNCC</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Olá, Estudante! Qual é a sua turma?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
          Selecione o seu <strong>Ano / Série</strong> para desbloquear os desafios de valor posicional e contas armadas preparados especialmente para você.
        </p>

        {/* Optional Student Name Input */}
        <div className="mt-5 max-w-md mx-auto">
          <div className="relative flex items-center">
            <User className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o seu nome ou apelido (ex: Lucas, Sofia...)"
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-hidden text-sm font-semibold text-slate-800 bg-slate-50/70 transition-all shadow-2xs placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* 5 Grade Selection Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-8">
        {gradeKeys.map((g) => {
          const cfg = GRADE_CONFIGS[g];
          const info = gradeDescriptions[g];
          const isSelected = selectedGrade === g;

          return (
            <div
              key={g}
              onClick={() => handleSelect(g)}
              className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between relative group ${
                isSelected
                  ? `${cfg.badgeBg} border-2 ${cfg.border} ring-3 ring-indigo-400/40 shadow-md scale-[1.02]`
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Check indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 text-indigo-600">
                  <CheckCircle className="w-6 h-6 fill-indigo-600 text-white" />
                </div>
              )}

              <div>
                {/* Badge title */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-display font-extrabold ${cfg.badgeColor} shadow-2xs`}
                  >
                    {cfg.title}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Ensino Fundamental I
                  </span>
                </div>

                {/* Subtitle */}
                <h3 className="text-base font-display font-bold text-slate-900 mb-1">
                  {cfg.subtitle}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {info.tagline}
                </p>
              </div>

              {/* Positional Orders Badges */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Ordens Trabalhadas:
                </span>
                <div className="flex flex-wrap gap-1">
                  {cfg.orders.map((ord) => (
                    <span
                      key={ord}
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${ORDERS[ord].color}`}
                      title={ORDERS[ord].fullName}
                    >
                      {ord}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Start Button */}
      <div className="flex items-center gap-3">
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-bold text-sm transition-all cursor-pointer"
          >
            Voltar
          </button>
        )}
        <button
          onClick={handleStart}
          className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-display font-extrabold text-base transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer group"
        >
          <span>
            {name ? `Entrar como ${name} no ` : 'Começar Desafios do '}
            {GRADE_CONFIGS[selectedGrade].title}
          </span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
