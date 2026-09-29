import React from 'react';
import { ORDER_KEYS_DESC, ORDERS, OrderKey } from '@/src/types/math.ts';

interface PositionalHeaderProps {
  activeOrder?: OrderKey;
  highlightedOrders?: OrderKey[];
  compact?: boolean;
}

export const PositionalHeader: React.FC<PositionalHeaderProps> = ({
  activeOrder,
  highlightedOrders = [],
  compact = false,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-3 sm:p-4 mb-4">
      {/* Top Class Category Banner */}
      <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold tracking-wider mb-2">
        <div className="bg-gradient-to-r from-indigo-100 via-rose-100 to-purple-100 text-slate-800 py-1 px-2 rounded-lg border border-purple-200 flex items-center justify-center gap-1.5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          2ª CLASSE: CLASSE DOS MILHARES
        </div>
        <div className="bg-gradient-to-r from-amber-100 via-sky-100 to-emerald-100 text-slate-800 py-1 px-2 rounded-lg border border-amber-200 flex items-center justify-center gap-1.5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          1ª CLASSE: UNIDADES SIMPLES
        </div>
      </div>

      {/* 6 Positional Orders Grid */}
      <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
        {ORDER_KEYS_DESC.map((key) => {
          const def = ORDERS[key];
          const isActive = activeOrder === key;
          const isHighlighted = highlightedOrders.includes(key);

          return (
            <div
              key={key}
              className={`flex flex-col items-center justify-between p-1.5 sm:p-2.5 rounded-xl border transition-all text-center relative ${
                isActive
                  ? `${def.bgLight} border-2 ${def.border} ring-2 ring-offset-1 ring-slate-400 scale-[1.03] shadow-md z-10`
                  : isHighlighted
                  ? `${def.bgLight} border-2 ${def.border}`
                  : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100/60'
              }`}
            >
              {/* Order Badge */}
              <div
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-display font-bold text-sm sm:text-base shadow-xs mb-1 ${def.color}`}
              >
                {def.key}
              </div>

              {/* Order Name */}
              <span className="text-[10px] sm:text-xs font-semibold text-slate-800 leading-tight">
                {compact ? def.name.replace(' de Milhar', '') : def.name}
              </span>

              {/* Multiplier Value */}
              <span className="text-[9px] sm:text-[11px] font-mono text-slate-500 font-bold mt-0.5">
                {new Intl.NumberFormat('pt-BR').format(def.multiplier)}
              </span>

              {/* Order indicator */}
              <span className="text-[8px] text-slate-400 mt-0.5 hidden sm:inline">
                {def.orderNumber}ª Ordem
              </span>

              {isActive && (
                <div className="absolute -bottom-1 w-2.5 h-2.5 bg-slate-800 rotate-45 rounded-xs transform translate-y-1/2"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
