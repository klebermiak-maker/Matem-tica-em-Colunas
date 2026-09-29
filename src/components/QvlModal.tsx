import React from 'react';
import { X, BookOpen, Layers, ArrowLeftRight, Sparkles } from 'lucide-react';
import { ORDERS, ORDER_KEYS_DESC } from '@/src/types/math.ts';

interface QvlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QvlModal: React.FC<QvlModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white rounded-t-3xl flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold">
                O Quadro Valor de Lugar (QVL)
              </h2>
              <p className="text-xs sm:text-sm text-sky-100">
                Entendendo a mágica do Sistema de Numeração Decimal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 text-slate-700">
          {/* Rule of 10 card */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="p-2.5 bg-amber-500 text-white rounded-xl mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900 text-base mb-1">
                A Regra de Ouro da Matemática: Agrupamento de 10 em 10
              </h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                Nosso sistema é decimal porque agrupamos tudo de 10 em 10!
                <br />
                • <strong>10 Unidades</strong> formam <strong>1 Dezena</strong> (10).
                <br />
                • <strong>10 Dezenas</strong> formam <strong>1 Centena</strong> (100).
                <br />
                • <strong>10 Centenas</strong> formam <strong>1 Unidade de Milhar</strong> (1.000).
                <br />
                • <strong>10 Unidades de Milhar</strong> formam <strong>1 Dezena de Milhar</strong> (10.000).
                <br />
                • <strong>10 Dezenas de Milhar</strong> formam <strong>1 Centena de Milhar</strong> (100.000).
              </p>
            </div>
          </div>

          {/* Positional Table */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              As 6 Ordens e 2 Classes do Nosso Jogo
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ORDER_KEYS_DESC.map((key) => {
                const def = ORDERS[key];
                return (
                  <div
                    key={key}
                    className={`p-3.5 rounded-2xl border ${def.border} ${def.bgLight} flex flex-col justify-between`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${def.color}`}>
                        {def.key}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {def.orderNumber}ª Ordem
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{def.name}</div>
                    <div className="text-xs text-slate-600 mt-1">
                      Multiplicador:{' '}
                      <strong className="font-mono text-slate-800">
                        × {new Intl.NumberFormat('pt-BR').format(def.multiplier)}
                      </strong>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Classe: {def.classType === 'Milhar' ? '2ª Classe (Milhares)' : '1ª Classe (Simples)'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regrouping explained */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="p-2.5 bg-sky-500 text-white rounded-xl mt-0.5">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Por que armamos as contas em colunas?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Armar a conta em coluna nos ajuda a alinhar os algarismos que possuem o mesmo valor de lugar: <strong>Unidade embaixo de Unidade</strong>, <strong>Dezena embaixo de Dezena</strong>, e assim por diante.
                Quando a soma de uma coluna atinge 10 ou mais, nós levamos a dezena para a coluna da esquerda (o famoso <strong>vai-um</strong>). Na subtração, quando o algarismo de cima é menor, fazemos o processo inverso: <strong>pedimos emprestado</strong> (desagrupamos da ordem superior)!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 rounded-b-3xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-xs"
          >
            Entendi, vamos jogar!
          </button>
        </div>
      </div>
    </div>
  );
};
