import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { OperationType, PosterCardItem } from '@/src/types/math.ts';
import { POSTER_ITEMS, OPERATION_META } from '@/src/utils/mathGenerator.ts';
import { sound } from '@/src/utils/sound.ts';

interface PosterOverviewProps {
  onSelectProblem: (item: PosterCardItem) => void;
}

export const PosterOverview: React.FC<PosterOverviewProps> = ({ onSelectProblem }) => {
  const operations: OperationType[] = ['adicao', 'subtracao', 'multiplicacao', 'divisao'];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Baseado no Cartaz Pedagógico Original
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          As Quatro Operações Armadas em Colunas
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Clique em qualquer uma das 16 contas do cartaz para abri-la no simulador e praticar passo a passo por ordem posicional (U, D, C, Milhar)!
        </p>
      </div>

      {/* 4 Poster Columns Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {operations.map((op) => {
          const meta = OPERATION_META[op];
          const cards = POSTER_ITEMS[op];

          return (
            <div
              key={op}
              className={`rounded-3xl border-3 ${meta.cardBorder} overflow-hidden shadow-sm flex flex-col bg-white`}
            >
              {/* Column Banner */}
              <div className={`p-4 text-center ${meta.headerBg}`}>
                <h3 className="text-2xl font-display font-extrabold tracking-wide uppercase">
                  {meta.title}
                </h3>
                <p className="text-xs font-medium text-white/95 mt-1">
                  {meta.subtitle}
                </p>
                <p className="text-xs font-bold text-white/90 mt-0.5">
                  {meta.concept}
                </p>
              </div>

              {/* 4 Accounts List */}
              <div className="p-3.5 space-y-3.5 flex-1 bg-slate-50/50">
                {cards.map((card, idx) => (
                  <button
                    key={card.id}
                    onClick={() => {
                      sound.playDigitClick();
                      onSelectProblem(card);
                    }}
                    className={`w-full p-4 rounded-2xl border-2 transition-all cursor-pointer group text-left relative flex flex-col items-center justify-center ${
                      op === 'adicao'
                        ? 'bg-sky-50/70 border-sky-200 hover:border-sky-400 hover:bg-sky-50'
                        : op === 'subtracao'
                        ? 'bg-amber-50/70 border-amber-200 hover:border-red-400 hover:bg-amber-50'
                        : op === 'multiplicacao'
                        ? 'bg-emerald-50/70 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50'
                        : 'bg-purple-50/70 border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                  >
                    {/* Badge number */}
                    <span className="absolute top-2 left-2 text-[10px] font-bold text-slate-400">
                      Exemplo {idx + 1}
                    </span>

                    {/* Math visualization matching the poster layout */}
                    {op !== 'divisao' ? (
                      <div className="flex flex-col items-end font-number font-extrabold text-2xl sm:text-3xl text-slate-800 tracking-wider">
                        <div className="pr-1">{card.formattedDisplay.top}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl text-slate-500">
                            {card.formattedDisplay.operator}
                          </span>
                          <span className="pr-1">{card.formattedDisplay.bottom}</span>
                        </div>
                        <div className="w-full border-b-3 border-slate-900 my-1" />
                        <div className={`pr-1 ${meta.textColor}`}>
                          {card.formattedDisplay.result}
                        </div>
                      </div>
                    ) : (
                      /* Division chave */
                      <div className="flex items-center justify-center font-number font-extrabold text-2xl text-slate-800 tracking-wider">
                        <div className="flex flex-col items-end pr-2">
                          <div>{card.num1}</div>
                          <div className="text-sm font-semibold text-slate-400">- {card.num1}</div>
                          <div className="border-t-2 border-slate-700 w-full text-right text-base text-slate-600">
                            0
                          </div>
                        </div>
                        <div className="border-l-3 border-slate-900 pl-2 flex flex-col">
                          <div className="border-b-3 border-slate-900 pb-1">{card.num2}</div>
                          <div className={`pt-1 ${meta.textColor}`}>{card.result}</div>
                        </div>
                      </div>
                    )}

                    {/* Hover Prompt */}
                    <div className="mt-2.5 flex items-center gap-1 text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Resolver Passo a Passo</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
