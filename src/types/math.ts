export type OperationType = 'adicao' | 'subtracao' | 'multiplicacao' | 'divisao';

export type OrderKey = 'U' | 'D' | 'C' | 'UM' | 'DM' | 'CM';

export interface OrderDefinition {
  key: OrderKey;
  name: string;
  fullName: string;
  orderNumber: number; // 1 to 6
  multiplier: number; // 1, 10, 100, 1000, 10000, 100000
  classType: 'Simples' | 'Milhar';
  color: string;
  bgLight: string;
  border: string;
  textColor: string;
}

export const ORDERS: Record<OrderKey, OrderDefinition> = {
  CM: {
    key: 'CM',
    name: 'Centena de Milhar',
    fullName: '6ª Ordem: Centena de Milhar (100.000)',
    orderNumber: 6,
    multiplier: 100000,
    classType: 'Milhar',
    color: 'bg-indigo-600 text-white',
    bgLight: 'bg-indigo-50 text-indigo-900',
    border: 'border-indigo-400',
    textColor: 'text-indigo-700',
  },
  DM: {
    key: 'DM',
    name: 'Dezena de Milhar',
    fullName: '5ª Ordem: Dezena de Milhar (10.000)',
    orderNumber: 5,
    multiplier: 10000,
    classType: 'Milhar',
    color: 'bg-rose-500 text-white',
    bgLight: 'bg-rose-50 text-rose-900',
    border: 'border-rose-400',
    textColor: 'text-rose-600',
  },
  UM: {
    key: 'UM',
    name: 'Unidade de Milhar',
    fullName: '4ª Ordem: Unidade de Milhar (1.000)',
    orderNumber: 4,
    multiplier: 1000,
    classType: 'Milhar',
    color: 'bg-purple-600 text-white',
    bgLight: 'bg-purple-50 text-purple-900',
    border: 'border-purple-400',
    textColor: 'text-purple-700',
  },
  C: {
    key: 'C',
    name: 'Centena',
    fullName: '3ª Ordem: Centena (100)',
    orderNumber: 3,
    multiplier: 100,
    classType: 'Simples',
    color: 'bg-amber-500 text-white',
    bgLight: 'bg-amber-50 text-amber-900',
    border: 'border-amber-400',
    textColor: 'text-amber-700',
  },
  D: {
    key: 'D',
    name: 'Dezena',
    fullName: '2ª Ordem: Dezena (10)',
    orderNumber: 2,
    multiplier: 10,
    classType: 'Simples',
    color: 'bg-sky-500 text-white',
    bgLight: 'bg-sky-50 text-sky-900',
    border: 'border-sky-400',
    textColor: 'text-sky-700',
  },
  U: {
    key: 'U',
    name: 'Unidade',
    fullName: '1ª Ordem: Unidade (1)',
    orderNumber: 1,
    multiplier: 1,
    classType: 'Simples',
    color: 'bg-emerald-500 text-white',
    bgLight: 'bg-emerald-50 text-emerald-900',
    border: 'border-emerald-400',
    textColor: 'text-emerald-700',
  },
};

export const ORDER_KEYS_ASC: OrderKey[] = ['U', 'D', 'C', 'UM', 'DM', 'CM'];
export const ORDER_KEYS_DESC: OrderKey[] = ['CM', 'DM', 'UM', 'C', 'D', 'U'];

export type DifficultyLevel = 'facil' | 'medio' | 'avancado' | 'mestre';

export interface DifficultyConfig {
  id: DifficultyLevel;
  label: string;
  description: string;
  maxDigits: number; // 2-3 (facil), 4 (medio: UM), 5 (avancado: DM), 6 (mestre: CM)
  ordersCovered: OrderKey[];
}

export const DIFFICULTIES: Record<DifficultyLevel, DifficultyConfig> = {
  facil: {
    id: 'facil',
    label: 'Iniciante (U, D, C)',
    description: 'Até Centenas (números até 999)',
    maxDigits: 3,
    ordersCovered: ['C', 'D', 'U'],
  },
  medio: {
    id: 'medio',
    label: 'Intermediário (Até UM)',
    description: 'Unidade de Milhar (números até 9.999)',
    maxDigits: 4,
    ordersCovered: ['UM', 'C', 'D', 'U'],
  },
  avancado: {
    id: 'avancado',
    label: 'Avançado (Até DM)',
    description: 'Dezena de Milhar (números até 99.999)',
    maxDigits: 5,
    ordersCovered: ['DM', 'UM', 'C', 'D', 'U'],
  },
  mestre: {
    id: 'mestre',
    label: 'Mestre (Até CM)',
    description: 'Centena de Milhar (números até 999.999)',
    maxDigits: 6,
    ordersCovered: ['CM', 'DM', 'UM', 'C', 'D', 'U'],
  },
};

export interface ColumnProblemStep {
  order: OrderKey;
  stepDescription: string;
  calculationExplanation: string;
  topDigit: number;
  bottomDigit?: number;
  carryIn?: number;
  carryOut?: number;
  borrowed?: boolean;
  expectedResultDigit: number;
}

export interface ColumnProblem {
  id: string;
  operation: OperationType;
  num1: number;
  num2: number;
  result: number;
  remainder?: number; // for division
  steps: ColumnProblemStep[];
}

export interface PositionalRiddle {
  id: string;
  title: string;
  question: string;
  highlightNumber?: number;
  contextInfo?: string;
  targetOrder?: OrderKey;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  explanation: string;
}

export interface PosterCardItem {
  id: string;
  operation: OperationType;
  num1: number;
  num2: number;
  result: number;
  remainder?: number;
  formattedDisplay: {
    top: string;
    operator: string;
    bottom: string;
    result: string;
  };
}

export type GradeLevel = '1ano' | '2ano' | '3ano' | '4ano' | '5ano';

export interface BnccSkillInfo {
  code: string;
  shortTitle: string;
  description: string;
}

export interface GradeConfig {
  id: GradeLevel;
  yearNumber: number;
  title: string;
  subtitle: string;
  badgeColor: string;
  badgeBg: string;
  border: string;
  orders: OrderKey[];
  skills: BnccSkillInfo[];
}

export const GRADE_CONFIGS: Record<GradeLevel, GradeConfig> = {
  '1ano': {
    id: '1ano',
    yearNumber: 1,
    title: '1º Ano',
    subtitle: 'Unidade e Dezena (até 99)',
    badgeColor: 'bg-emerald-600 text-white',
    badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    border: 'border-emerald-400',
    orders: ['D', 'U'],
    skills: [
      {
        code: 'EF01MA04',
        shortTitle: 'Contagem e Quantidades',
        description: 'Contar a quantidade de objetos e registrar até 99 unidades.',
      },
      {
        code: 'EF01MA05',
        shortTitle: 'Comparação de Números',
        description: 'Comparar e ordenar números de até duas ordens (Unidade e Dezena).',
      },
      {
        code: 'EF01MA06',
        shortTitle: 'Fatos da Adição',
        description: 'Construir fatos básicos da adição com as ideias de juntar quantidades.',
      },
      {
        code: 'EF01MA07',
        shortTitle: 'Composição e Decomposição',
        description: 'Compor e decompor números de até duas ordens em Dezenas e Unidades.',
      },
    ],
  },
  '2ano': {
    id: '2ano',
    yearNumber: 2,
    title: '2º Ano',
    subtitle: 'Até Centena (números até 999)',
    badgeColor: 'bg-sky-600 text-white',
    badgeBg: 'bg-sky-50 text-sky-900 border-sky-300',
    border: 'border-sky-400',
    orders: ['C', 'D', 'U'],
    skills: [
      {
        code: 'EF02MA01',
        shortTitle: 'Ordenação até Centenas',
        description: 'Comparar e ordenar números naturais até 3 ordens (ordem das centenas).',
      },
      {
        code: 'EF02MA04',
        shortTitle: 'Composição de 3 Ordens',
        description: 'Compor e decompor números naturais de até três ordens (C, D, U).',
      },
      {
        code: 'EF02MA05',
        shortTitle: 'Cálculo Mental e Escrito',
        description: 'Construir fatos fundamentais da adição e subtração com valores posicionais.',
      },
      {
        code: 'EF02MA06',
        shortTitle: 'Adição e Subtração em Coluna',
        description: 'Resolver contas armadas com significados de juntar e retirar.',
      },
    ],
  },
  '3ano': {
    id: '3ano',
    yearNumber: 3,
    title: '3º Ano',
    subtitle: 'Até Unidade de Milhar (até 9.999)',
    badgeColor: 'bg-amber-600 text-white',
    badgeBg: 'bg-amber-50 text-amber-900 border-amber-300',
    border: 'border-amber-400',
    orders: ['UM', 'C', 'D', 'U'],
    skills: [
      {
        code: 'EF03MA01',
        shortTitle: 'Leitura até Milhar',
        description: 'Ler, escrever e comparar números naturais de até a ordem de unidade de milhar.',
      },
      {
        code: 'EF03MA02',
        shortTitle: 'Sistema Decimal até 4 Ordens',
        description: 'Composição e decomposição de números até 4 ordens (UM, C, D, U).',
      },
      {
        code: 'EF03MA05',
        shortTitle: 'Adição/Subtração com Reagrupamento',
        description: 'Resolver cálculos com algoritmo usual envolvendo vai-um e empréstimo.',
      },
      {
        code: 'EF03MA06',
        shortTitle: 'Multiplicação em Coluna',
        description: 'Construir e resolver multiplicação por 2, 3, 4 e 5 por valor de posição.',
      },
      {
        code: 'EF03MA07',
        shortTitle: 'Divisão Repartição Igual',
        description: 'Resolver problemas de divisão pela chave com repartição em partes iguais.',
      },
    ],
  },
  '4ano': {
    id: '4ano',
    yearNumber: 4,
    title: '4º Ano',
    subtitle: 'Até Dezena de Milhar (até 99.999)',
    badgeColor: 'bg-rose-600 text-white',
    badgeBg: 'bg-rose-50 text-rose-900 border-rose-300',
    border: 'border-rose-400',
    orders: ['DM', 'UM', 'C', 'D', 'U'],
    skills: [
      {
        code: 'EF04MA01',
        shortTitle: 'Leitura até 5 Ordens',
        description: 'Ler, escrever e ordenar números até a ordem das dezenas de milhar (99.999).',
      },
      {
        code: 'EF04MA02',
        shortTitle: 'Potências de 10 e Valor Posicional',
        description: 'Mostrar o valor posicional na dezena de milhar por adições e multiplicações por 10.',
      },
      {
        code: 'EF04MA04',
        shortTitle: 'Relações entre Operações',
        description: 'Utilizar relações inversas entre adição/subtração e multiplicação/divisão.',
      },
      {
        code: 'EF04MA05',
        shortTitle: 'Algoritmos das 4 Operações',
        description: 'Resolver as 4 operações armadas em coluna com domínio de agrupamento.',
      },
    ],
  },
  '5ano': {
    id: '5ano',
    yearNumber: 5,
    title: '5º Ano',
    subtitle: 'Até Centena de Milhar (até 999.999)',
    badgeColor: 'bg-purple-600 text-white',
    badgeBg: 'bg-purple-50 text-purple-900 border-purple-300',
    border: 'border-purple-400',
    orders: ['CM', 'DM', 'UM', 'C', 'D', 'U'],
    skills: [
      {
        code: 'EF05MA01',
        shortTitle: 'Até Centena de Milhar',
        description: 'Ler, escrever e ordenar números naturais até a ordem das centenas de milhar.',
      },
      {
        code: 'EF05MA07',
        shortTitle: 'Grandes Ordens e Múltiplos Reagrupamentos',
        description: 'Resolver adição e subtração em coluna com centenas de milhar e múltiplos vai-um.',
      },
      {
        code: 'EF05MA08',
        shortTitle: 'Multiplicação e Divisão Avançada',
        description: 'Resolver multiplicação de grandes ordens e divisão pela chave euclidiana.',
      },
    ],
  },
};

export interface BnccChallenge {
  id: string;
  grade: GradeLevel;
  skill: BnccSkillInfo;
  type: 'coluna' | 'enigma';
  columnProblem?: ColumnProblem;
  riddle?: PositionalRiddle;
}

