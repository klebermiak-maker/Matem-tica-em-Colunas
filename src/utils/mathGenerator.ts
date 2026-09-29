import {
  OperationType,
  OrderKey,
  ORDER_KEYS_ASC,
  ORDER_KEYS_DESC,
  ColumnProblem,
  ColumnProblemStep,
  DifficultyLevel,
  DIFFICULTIES,
  PositionalRiddle,
  PosterCardItem,
  ORDERS,
  GradeLevel,
  GRADE_CONFIGS,
  BnccChallenge,
  BnccSkillInfo,
} from '@/src/types/math.ts';

// Poster cards faithfully replicating the uploaded image
export const POSTER_ITEMS: Record<OperationType, PosterCardItem[]> = {
  adicao: [
    {
      id: 'add-1',
      operation: 'adicao',
      num1: 25,
      num2: 17,
      result: 42,
      formattedDisplay: { top: '2 5', operator: '+', bottom: '1 7', result: '4 2' },
    },
    {
      id: 'add-2',
      operation: 'adicao',
      num1: 38,
      num2: 46,
      result: 84,
      formattedDisplay: { top: '3 8', operator: '+', bottom: '4 6', result: '8 4' },
    },
    {
      id: 'add-3',
      operation: 'adicao',
      num1: 127,
      num2: 365,
      result: 492,
      formattedDisplay: { top: '1 2 7', operator: '+', bottom: '3 6 5', result: '4 9 2' },
    },
    {
      id: 'add-4',
      operation: 'adicao',
      num1: 406,
      num2: 278,
      result: 684,
      formattedDisplay: { top: '4 0 6', operator: '+', bottom: '2 7 8', result: '6 8 4' },
    },
  ],
  subtracao: [
    {
      id: 'sub-1',
      operation: 'subtracao',
      num1: 43,
      num2: 18,
      result: 25,
      formattedDisplay: { top: '4 3', operator: '-', bottom: '1 8', result: '2 5' },
    },
    {
      id: 'sub-2',
      operation: 'subtracao',
      num1: 72,
      num2: 35,
      result: 37,
      formattedDisplay: { top: '7 2', operator: '-', bottom: '3 5', result: '3 7' },
    },
    {
      id: 'sub-3',
      operation: 'subtracao',
      num1: 508,
      num2: 176,
      result: 332,
      formattedDisplay: { top: '5 0 8', operator: '-', bottom: '1 7 6', result: '3 3 2' },
    },
    {
      id: 'sub-4',
      operation: 'subtracao',
      num1: 900,
      num2: 264,
      result: 636,
      formattedDisplay: { top: '9 0 0', operator: '-', bottom: '2 6 4', result: '6 3 6' },
    },
  ],
  multiplicacao: [
    {
      id: 'mul-1',
      operation: 'multiplicacao',
      num1: 26,
      num2: 3,
      result: 78,
      formattedDisplay: { top: '2 6', operator: '×', bottom: '3', result: '7 8' },
    },
    {
      id: 'mul-2',
      operation: 'multiplicacao',
      num1: 14,
      num2: 5,
      result: 70,
      formattedDisplay: { top: '1 4', operator: '×', bottom: '5', result: '7 0' },
    },
    {
      id: 'mul-3',
      operation: 'multiplicacao',
      num1: 32,
      num2: 4,
      result: 128,
      formattedDisplay: { top: '3 2', operator: '×', bottom: '4', result: '1 2 8' },
    },
    {
      id: 'mul-4',
      operation: 'multiplicacao',
      num1: 125,
      num2: 6,
      result: 750,
      formattedDisplay: { top: '1 2 5', operator: '×', bottom: '6', result: '7 5 0' },
    },
  ],
  divisao: [
    {
      id: 'div-1',
      operation: 'divisao',
      num1: 8,
      num2: 2,
      result: 4,
      remainder: 0,
      formattedDisplay: { top: '8', operator: '÷', bottom: '2', result: '4' },
    },
    {
      id: 'div-2',
      operation: 'divisao',
      num1: 12,
      num2: 3,
      result: 4,
      remainder: 0,
      formattedDisplay: { top: '1 2', operator: '÷', bottom: '3', result: '4' },
    },
    {
      id: 'div-3',
      operation: 'divisao',
      num1: 24,
      num2: 4,
      result: 6,
      remainder: 0,
      formattedDisplay: { top: '2 4', operator: '÷', bottom: '4', result: '6' },
    },
    {
      id: 'div-4',
      operation: 'divisao',
      num1: 36,
      num2: 6,
      result: 6,
      remainder: 0,
      formattedDisplay: { top: '3 6', operator: '÷', bottom: '6', result: '6' },
    },
  ],
};

// Operation Theme Configurations matching the image
export const OPERATION_META = {
  adicao: {
    title: 'ADIÇÃO',
    subtitle: 'Conta armada em coluna.',
    concept: 'Juntamos as quantidades.',
    operatorSymbol: '+',
    primaryColor: '#0284c7', // Sky-600
    badgeColor: 'bg-sky-500 text-white',
    cardBorder: 'border-sky-300',
    cardBg: 'bg-sky-50/50',
    headerBg: 'bg-gradient-to-r from-sky-600 to-blue-600 text-white',
    textColor: 'text-sky-600',
    stepVerb: 'somar',
  },
  subtracao: {
    title: 'SUBTRAÇÃO',
    subtitle: 'Conta armada em coluna.',
    concept: 'Tiramos uma quantidade.',
    operatorSymbol: '−',
    primaryColor: '#dc2626', // Red-600
    badgeColor: 'bg-red-500 text-white',
    cardBorder: 'border-red-300',
    cardBg: 'bg-amber-50/40',
    headerBg: 'bg-gradient-to-r from-red-600 to-rose-600 text-white',
    textColor: 'text-red-600',
    stepVerb: 'subtrair',
  },
  multiplicacao: {
    title: 'MULTIPLICAÇÃO',
    subtitle: 'Conta armada em coluna.',
    concept: 'Repetimos uma quantidade.',
    operatorSymbol: '×',
    primaryColor: '#16a34a', // Emerald-600
    badgeColor: 'bg-emerald-600 text-white',
    cardBorder: 'border-emerald-300',
    cardBg: 'bg-emerald-50/40',
    headerBg: 'bg-gradient-to-r from-emerald-600 to-green-600 text-white',
    textColor: 'text-emerald-700',
    stepVerb: 'multiplicar',
  },
  divisao: {
    title: 'DIVISÃO',
    subtitle: 'Conta armada em coluna.',
    concept: 'Repartimos em partes iguais.',
    operatorSymbol: '÷',
    primaryColor: '#9333ea', // Purple-600
    badgeColor: 'bg-purple-600 text-white',
    cardBorder: 'border-purple-300',
    cardBg: 'bg-purple-50/40',
    headerBg: 'bg-gradient-to-r from-purple-600 to-violet-600 text-white',
    textColor: 'text-purple-700',
    stepVerb: 'dividir',
  },
};

// Extracts digits mapped to order keys
export function getNumberDigits(n: number): Record<OrderKey, number> {
  const str = Math.abs(Math.floor(n)).toString();
  const digits = str.split('').reverse();
  const result: Record<OrderKey, number> = {
    U: 0,
    D: 0,
    C: 0,
    UM: 0,
    DM: 0,
    CM: 0,
  };

  ORDER_KEYS_ASC.forEach((key, index) => {
    if (index < digits.length) {
      result[key] = parseInt(digits[index], 10);
    }
  });

  return result;
}

// Formats a number with thousands dots (Brazilian Portuguese standard: 1.250.000)
export function formatBRNumber(n: number): string {
  return new Intl.NumberFormat('pt-BR').format(n);
}

// Generate Addition steps
export function buildAdditionProblem(num1: number, num2: number): ColumnProblem {
  const result = num1 + num2;
  const digits1 = getNumberDigits(num1);
  const digits2 = getNumberDigits(num2);

  const steps: ColumnProblemStep[] = [];
  let carry = 0;

  // We loop from U up to CM
  const maxDigitsCount = Math.max(num1.toString().length, num2.toString().length, result.toString().length);

  for (let i = 0; i < maxDigitsCount; i++) {
    const orderKey = ORDER_KEYS_ASC[i];
    const d1 = digits1[orderKey];
    const d2 = digits2[orderKey];
    const sum = d1 + d2 + carry;
    const resultDigit = sum % 10;
    const nextCarry = Math.floor(sum / 10);

    const orderName = ORDERS[orderKey].name;
    let explanation = `Na ordem das ${orderName}s: ${d1} + ${d2}`;
    if (carry > 0) {
      explanation += ` + ${carry} (vai-um)`;
    }
    explanation += ` = ${sum}.`;

    if (nextCarry > 0) {
      const nextOrder = ORDER_KEYS_ASC[i + 1] ? ORDERS[ORDER_KEYS_ASC[i + 1]].name : 'próxima ordem';
      explanation += ` Fica ${resultDigit} e sobe ${nextCarry} para a ordem das ${nextOrder}s.`;
    } else {
      explanation += ` Fica ${resultDigit}.`;
    }

    steps.push({
      order: orderKey,
      stepDescription: `Some a coluna das ${orderName}s`,
      calculationExplanation: explanation,
      topDigit: d1,
      bottomDigit: d2,
      carryIn: carry,
      carryOut: nextCarry,
      expectedResultDigit: resultDigit,
    });

    carry = nextCarry;
  }

  return {
    id: `add-${num1}-${num2}-${Date.now()}`,
    operation: 'adicao',
    num1,
    num2,
    result,
    steps,
  };
}

// Generate Subtraction steps with borrowing
export function buildSubtractionProblem(num1: number, num2: number): ColumnProblem {
  // Ensure num1 >= num2
  if (num1 < num2) {
    const temp = num1;
    num1 = num2;
    num2 = temp;
  }
  const result = num1 - num2;
  const digits1 = getNumberDigits(num1);
  const digits2 = getNumberDigits(num2);

  const steps: ColumnProblemStep[] = [];
  const maxDigitsCount = Math.max(num1.toString().length, num2.toString().length);

  // We will simulate borrowing
  const currentTop = { ...digits1 };

  for (let i = 0; i < maxDigitsCount; i++) {
    const orderKey = ORDER_KEYS_ASC[i];
    let top = currentTop[orderKey];
    const bottom = digits2[orderKey];
    let borrowed = false;

    let explanation = `Na coluna das ${ORDERS[orderKey].name}s: `;

    if (top < bottom) {
      // Need to borrow from next available non-zero order to the left
      borrowed = true;
      let borrowIndex = i + 1;
      while (borrowIndex < ORDER_KEYS_ASC.length && currentTop[ORDER_KEYS_ASC[borrowIndex]] === 0) {
        borrowIndex++;
      }

      // Regroup cascade
      for (let k = borrowIndex; k > i; k--) {
        const fromKey = ORDER_KEYS_ASC[k];
        const toKey = ORDER_KEYS_ASC[k - 1];
        currentTop[fromKey] -= 1;
        currentTop[toKey] += 10;
      }

      const prevTop = top;
      top = currentTop[orderKey];
      const donorKey = ORDER_KEYS_ASC[i + 1];
      explanation += `Como ${prevTop} é menor que ${bottom}, pedimos 1 emprestado para as ${ORDERS[donorKey].name}s. `;
      explanation += `O ${prevTop} virou ${top}. Agora fazemos: ${top} - ${bottom} = ${top - bottom}.`;
    } else {
      explanation += `${top} - ${bottom} = ${top - bottom}.`;
    }

    const resultDigit = top - bottom;

    steps.push({
      order: orderKey,
      stepDescription: `Subtraia a coluna das ${ORDERS[orderKey].name}s`,
      calculationExplanation: explanation,
      topDigit: top,
      bottomDigit: bottom,
      borrowed,
      expectedResultDigit: resultDigit,
    });
  }

  return {
    id: `sub-${num1}-${num2}-${Date.now()}`,
    operation: 'subtracao',
    num1,
    num2,
    result,
    steps,
  };
}

// Generate Multiplication steps
export function buildMultiplicationProblem(num1: number, multiplier: number): ColumnProblem {
  const result = num1 * multiplier;
  const digits1 = getNumberDigits(num1);
  const steps: ColumnProblemStep[] = [];
  let carry = 0;

  const num1Length = num1.toString().length;

  for (let i = 0; i < num1Length; i++) {
    const orderKey = ORDER_KEYS_ASC[i];
    const d1 = digits1[orderKey];
    const prod = d1 * multiplier + carry;
    const resultDigit = prod % 10;
    const nextCarry = Math.floor(prod / 10);

    const orderName = ORDERS[orderKey].name;
    let explanation = `Multiplicando as ${orderName}s: ${multiplier} × ${d1}`;
    if (carry > 0) {
      explanation += ` + ${carry} (vai-um)`;
    }
    explanation += ` = ${prod}.`;

    if (i === num1Length - 1 && nextCarry > 0) {
      explanation += ` Fica o resultado final completo ${prod}.`;
    } else if (nextCarry > 0) {
      const nextOrder = ORDER_KEYS_ASC[i + 1] ? ORDERS[ORDER_KEYS_ASC[i + 1]].name : 'próxima ordem';
      explanation += ` Escrevemos ${resultDigit} e sobem ${nextCarry} para as ${nextOrder}s.`;
    } else {
      explanation += ` Escrevemos ${resultDigit}.`;
    }

    steps.push({
      order: orderKey,
      stepDescription: `Multiplique ${multiplier} × ${d1} (${orderName}s)`,
      calculationExplanation: explanation,
      topDigit: d1,
      bottomDigit: multiplier,
      carryIn: carry,
      carryOut: nextCarry,
      expectedResultDigit: i === num1Length - 1 && nextCarry > 0 ? prod : resultDigit,
    });

    carry = nextCarry;
  }

  return {
    id: `mul-${num1}-${multiplier}-${Date.now()}`,
    operation: 'multiplicacao',
    num1,
    num2: multiplier,
    result,
    steps,
  };
}

// Generate Division steps
export function buildDivisionProblem(dividend: number, divisor: number): ColumnProblem {
  const result = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;

  const steps: ColumnProblemStep[] = [];
  const divStr = dividend.toString();
  let currentVal = 0;

  for (let i = 0; i < divStr.length; i++) {
    const digit = parseInt(divStr[i], 10);
    currentVal = currentVal * 10 + digit;
    const qDigit = Math.floor(currentVal / divisor);
    const subVal = qDigit * divisor;
    const newRem = currentVal - subVal;

    // Order from left to right in standard long division
    const power = divStr.length - 1 - i;
    const orderKey = ORDER_KEYS_ASC[power] || 'U';

    steps.push({
      order: orderKey,
      stepDescription: `Dividindo ${currentVal} por ${divisor}`,
      calculationExplanation: `${currentVal} ÷ ${divisor} = ${qDigit} (pois ${divisor} × ${qDigit} = ${subVal}). Sobram ${newRem}.`,
      topDigit: currentVal,
      bottomDigit: divisor,
      expectedResultDigit: qDigit,
    });

    currentVal = newRem;
  }

  return {
    id: `div-${dividend}-${divisor}-${Date.now()}`,
    operation: 'divisao',
    num1: dividend,
    num2: divisor,
    result,
    remainder,
    steps,
  };
}

// Random Generator based on chosen Difficulty & Operation
export function generateRandomProblem(operation: OperationType, difficulty: DifficultyLevel): ColumnProblem {
  const diff = DIFFICULTIES[difficulty];

  if (operation === 'adicao') {
    let min = 10;
    let max = 99;
    if (diff.maxDigits === 3) {
      min = 50;
      max = 899;
    } else if (diff.maxDigits === 4) {
      min = 1000;
      max = 8999;
    } else if (diff.maxDigits === 5) {
      min = 10000;
      max = 89999;
    } else if (diff.maxDigits === 6) {
      min = 100000;
      max = 499999;
    }

    const n1 = Math.floor(Math.random() * (max - min)) + min;
    const n2 = Math.floor(Math.random() * (max - min)) + min;
    return buildAdditionProblem(n1, n2);
  }

  if (operation === 'subtracao') {
    let min = 20;
    let max = 99;
    if (diff.maxDigits === 3) {
      min = 100;
      max = 999;
    } else if (diff.maxDigits === 4) {
      min = 1200;
      max = 9999;
    } else if (diff.maxDigits === 5) {
      min = 15000;
      max = 99999;
    } else if (diff.maxDigits === 6) {
      min = 120000;
      max = 999999;
    }

    let n1 = Math.floor(Math.random() * (max - min)) + min;
    let n2 = Math.floor(Math.random() * (n1 - min / 2)) + Math.floor(min / 2);
    if (n1 === n2) n1 += 5;
    return buildSubtractionProblem(n1, n2);
  }

  if (operation === 'multiplicacao') {
    let n1 = 25;
    let mult = Math.floor(Math.random() * 7) + 2; // 2 to 8

    if (diff.maxDigits === 3) {
      n1 = Math.floor(Math.random() * 400) + 100;
      mult = Math.floor(Math.random() * 8) + 2;
    } else if (diff.maxDigits === 4) {
      n1 = Math.floor(Math.random() * 2000) + 1000;
      mult = Math.floor(Math.random() * 7) + 2;
    } else if (diff.maxDigits === 5) {
      n1 = Math.floor(Math.random() * 20000) + 10000;
      mult = Math.floor(Math.random() * 7) + 2;
    } else if (diff.maxDigits === 6) {
      n1 = Math.floor(Math.random() * 150000) + 100000;
      mult = Math.floor(Math.random() * 6) + 2;
    }

    return buildMultiplicationProblem(n1, mult);
  }

  // Divisao
  const singleDivisors = [2, 3, 4, 5, 6, 7, 8, 9];
  const divisor = singleDivisors[Math.floor(Math.random() * singleDivisors.length)];
  let quotientMax = 25;
  if (diff.maxDigits === 3) quotientMax = 150;
  if (diff.maxDigits === 4) quotientMax = 1200;
  if (diff.maxDigits === 5) quotientMax = 15000;
  if (diff.maxDigits === 6) quotientMax = 80000;

  const quotient = Math.floor(Math.random() * (quotientMax - 5)) + 5;
  const dividend = quotient * divisor; // exact division for clean learning
  return buildDivisionProblem(dividend, divisor);
}

// Positional Riddles Generator (Enigmas das Ordens e Classes)
export function generatePositionalRiddles(count: number = 20): PositionalRiddle[] {
  const riddles: PositionalRiddle[] = [];

  // Helper random
  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Type 1: Identificação de Ordem (Qual algarismo ocupa X?)
  for (let i = 0; i < 4; i++) {
    const num = randInt(120000, 989999);
    const digits = getNumberDigits(num);
    const targetOrder = pick<OrderKey>(ORDER_KEYS_DESC);
    const correctDigit = digits[targetOrder];
    const orderDef = ORDERS[targetOrder];

    // Generate wrong options
    const wrongDigits = new Set<number>();
    while (wrongDigits.size < 3) {
      const candidate = randInt(0, 9);
      if (candidate !== correctDigit) {
        wrongDigits.add(candidate);
      }
    }

    const options = [
      {
        id: 'opt-corr',
        text: `Algarismo ${correctDigit}`,
        isCorrect: true,
        explanation: `Correto! No número ${formatBRNumber(num)}, a ${orderDef.fullName} é ocupada pelo algarismo ${correctDigit}.`,
      },
      ...Array.from(wrongDigits).map((w, idx) => ({
        id: `opt-wrong-${idx}`,
        text: `Algarismo ${w}`,
        isCorrect: false,
        explanation: `Incorreto. Observe as ordens: ${orderDef.name} é a ${orderDef.orderNumber}ª ordem contando da direita para a esquerda.`,
      })),
    ].sort(() => Math.random() - 0.5);

    riddles.push({
      id: `riddle-id-${i}-${Date.now()}`,
      title: 'Identificação de Ordem',
      question: `No número ${formatBRNumber(num)}, qual algarismo ocupa a ordem da ${orderDef.name}?`,
      highlightNumber: num,
      targetOrder,
      options,
      explanation: `Lembre-se: 1ª Ordem = Unidade, 2ª = Dezena, 3ª = Centena, 4ª = Unidade de Milhar, 5ª = Dezena de Milhar, 6ª = Centena de Milhar. Portanto, na ${orderDef.name} está o ${correctDigit}.`,
    });
  }

  // Type 2: Valor Posicional / Relativo
  for (let i = 0; i < 4; i++) {
    const num = randInt(100000, 999999);
    const digits = getNumberDigits(num);
    const nonZeroOrders = ORDER_KEYS_DESC.filter((k) => digits[k] > 0);
    const targetOrder = pick(nonZeroOrders.length > 0 ? nonZeroOrders : ORDER_KEYS_DESC);
    const digit = digits[targetOrder];
    const orderDef = ORDERS[targetOrder];
    const correctValue = digit * orderDef.multiplier;

    const wrongValues = [
      digit * (orderDef.multiplier / 10 || 10),
      digit * (orderDef.multiplier * 10),
      digit,
    ].filter((v) => v !== correctValue);

    const options = [
      {
        id: 'opt-c',
        text: `${formatBRNumber(correctValue)}`,
        isCorrect: true,
        explanation: `Excelente! O algarismo ${digit} na ${orderDef.name} vale ${digit} × ${formatBRNumber(orderDef.multiplier)} = ${formatBRNumber(correctValue)}.`,
      },
      ...wrongValues.slice(0, 3).map((w, idx) => ({
        id: `opt-w-${idx}`,
        text: `${formatBRNumber(w)}`,
        isCorrect: false,
        explanation: `Atenção: como o algarismo está na ${orderDef.name}, multiplicamos por ${formatBRNumber(orderDef.multiplier)}.`,
      })),
    ].sort(() => Math.random() - 0.5);

    riddles.push({
      id: `riddle-val-${i}-${Date.now()}`,
      title: 'Valor Posicional (Relativo)',
      question: `No número ${formatBRNumber(num)}, qual é o valor posicional do algarismo ${digit} que está na ${orderDef.name}?`,
      highlightNumber: num,
      targetOrder,
      options,
      explanation: `O valor posicional depende da casa em que o algarismo está. ${digit} na ${orderDef.name} equivale a ${formatBRNumber(correctValue)}.`,
    });
  }

  // Type 3: Decomposição e Composição
  for (let i = 0; i < 4; i++) {
    const cm = randInt(1, 9);
    const dm = randInt(1, 9);
    const um = randInt(1, 9);
    const c = randInt(1, 9);
    const d = randInt(1, 9);
    const u = randInt(1, 9);

    const totalNum = cm * 100000 + dm * 10000 + um * 1000 + c * 100 + d * 10 + u;
    const textPrompt = `${cm} Centenas de Milhar + ${dm} Dezenas de Milhar + ${um} Unidades de Milhar + ${c} Centenas + ${d} Dezenas + ${u} Unidades`;

    const wrong1 = totalNum + randInt(1, 5) * 1000;
    const wrong2 = totalNum - randInt(1, 3) * 100;
    const wrong3 = totalNum + randInt(1, 4) * 10;

    const options = [
      {
        id: 'opt-comp-c',
        text: formatBRNumber(totalNum),
        isCorrect: true,
        explanation: `Muito bem! Compondo todas as ordens obtemos exatamente ${formatBRNumber(totalNum)}.`,
      },
      {
        id: 'opt-comp-w1',
        text: formatBRNumber(wrong1),
        isCorrect: false,
        explanation: `Verifique com calma a ordem das Unidades de Milhar.`,
      },
      {
        id: 'opt-comp-w2',
        text: formatBRNumber(wrong2),
        isCorrect: false,
        explanation: `Verifique com calma a ordem das Centenas.`,
      },
      {
        id: 'opt-comp-w3',
        text: formatBRNumber(wrong3),
        isCorrect: false,
        explanation: `Verifique com calma as Dezenas e Unidades.`,
      },
    ].sort(() => Math.random() - 0.5);

    riddles.push({
      id: `riddle-comp-${i}-${Date.now()}`,
      title: 'Composição de Números',
      question: `Qual número é formado por: ${textPrompt}?`,
      options,
      explanation: `Juntando os valores de cada ordem: ${formatBRNumber(cm * 100000)} + ${formatBRNumber(dm * 10000)} + ${formatBRNumber(um * 1000)} + ${c * 100} + ${d * 10} + ${u} = ${formatBRNumber(totalNum)}.`,
    });
  }

  // Type 4: Cálculo Posicional entre Dois Números
  for (let i = 0; i < 4; i++) {
    const numA = randInt(250000, 890000);
    const numB = randInt(110000, 450000);
    const digitsA = getNumberDigits(numA);
    const digitsB = getNumberDigits(numB);

    const orderA = pick<OrderKey>(['CM', 'DM', 'UM', 'C']);
    const orderB = pick<OrderKey>(['UM', 'C', 'D', 'U']);

    const valA = digitsA[orderA];
    const valB = digitsB[orderB];
    const sumVal = valA + valB;

    const wrongOpts = [sumVal + 1, Math.max(0, sumVal - 2), sumVal + 3].filter((x) => x !== sumVal);

    const options = [
      {
        id: 'opt-calc-c',
        text: `${sumVal}`,
        isCorrect: true,
        explanation: `Correto! Algarismo da ${ORDERS[orderA].name} de ${formatBRNumber(numA)} (${valA}) + Algarismo da ${ORDERS[orderB].name} de ${formatBRNumber(numB)} (${valB}) = ${sumVal}.`,
      },
      ...wrongOpts.slice(0, 3).map((w, idx) => ({
        id: `opt-cw-${idx}`,
        text: `${w}`,
        isCorrect: false,
        explanation: `Releia quais ordens foram pedidas: ${ORDERS[orderA].name} do 1º número e ${ORDERS[orderB].name} do 2º número.`,
      })),
    ].sort(() => Math.random() - 0.5);

    riddles.push({
      id: `riddle-calc-${i}-${Date.now()}`,
      title: 'Operação com Algarismos de Ordens',
      question: `Some o algarismo que ocupa a ${ORDERS[orderA].name} no número ${formatBRNumber(numA)} com o algarismo da ${ORDERS[orderB].name} no número ${formatBRNumber(numB)}.`,
      options,
      explanation: `No número ${formatBRNumber(numA)}, a ${ORDERS[orderA].name} tem o algarismo ${valA}. No número ${formatBRNumber(numB)}, a ${ORDERS[orderB].name} tem o algarismo ${valB}. ${valA} + ${valB} = ${sumVal}.`,
    });
  }

  // Type 5: O Enigma da Conta Armada e o "Vai-Um"
  for (let i = 0; i < 4; i++) {
    const n1 = randInt(25000, 85000);
    const n2 = randInt(15000, 65000);
    const d1 = getNumberDigits(n1);
    const d2 = getNumberDigits(n2);

    // Check which order carries
    let carryOrder: OrderKey | null = null;
    let carrySum = 0;
    let c = 0;

    for (let k = 0; k < ORDER_KEYS_ASC.length; k++) {
      const ord = ORDER_KEYS_ASC[k];
      const sum = d1[ord] + d2[ord] + c;
      if (sum >= 10 && !carryOrder) {
        carryOrder = ord;
        carrySum = sum;
      }
      c = Math.floor(sum / 10);
    }

    if (!carryOrder) carryOrder = 'U';

    const orderName = ORDERS[carryOrder].name;
    const nextOrder = ORDER_KEYS_ASC[ORDER_KEYS_ASC.indexOf(carryOrder) + 1] || 'CM';

    const options = [
      {
        id: 'opt-carry-c',
        text: `Para as ${ORDERS[nextOrder].name}s`,
        isCorrect: true,
        explanation: `Exato! Ao somar as ${orderName}s, o valor atinge 10 ou mais, gerando o agrupamento ("vai-um") para as ${ORDERS[nextOrder].name}s.`,
      },
      {
        id: 'opt-carry-w1',
        text: `Para as ${ORDERS[carryOrder].name}s`,
        isCorrect: false,
        explanation: `O vai-um sempre sobe para a ordem imediatamente à esquerda (maior).`,
      },
      {
        id: 'opt-carry-w2',
        text: `Não há "vai-um" nesta adição`,
        isCorrect: false,
        explanation: `Observe a soma na coluna das ${orderName}s: a soma ultrapassa 9, necessitando de reagrupamento!`,
      },
    ].sort(() => Math.random() - 0.5);

    riddles.push({
      id: `riddle-carry-${i}-${Date.now()}`,
      title: 'Desafio do Agrupamento (Vai-Um)',
      question: `Ao armar a conta ${formatBRNumber(n1)} + ${formatBRNumber(n2)}, a soma da coluna das ${orderName}s exigirá subir um algarismo ("vai-um"). Para qual ordem ele vai?`,
      options,
      explanation: `No Sistema de Numeração Decimal, a cada 10 unidades de uma ordem formamos 1 unidade da ordem superior imediata (${ORDERS[nextOrder].name}).`,
    });
  }

  return riddles.sort(() => Math.random() - 0.5).slice(0, count);
}

// Utility to shuffle an array (Fisher-Yates)
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Generates challenges strictly tailored to the BNCC curriculum for grades 1 to 5
export function generateBnccChallenges(grade: GradeLevel): BnccChallenge[] {
  const gradeConfig = GRADE_CONFIGS[grade];
  const challenges: BnccChallenge[] = [];

  const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  if (grade === '1ano') {
    // 1º ANO: Ordens U e D (números de 1 a 99)
    const skillEF0104 = gradeConfig.skills.find((s) => s.code === 'EF01MA04')!;
    const skillEF0105 = gradeConfig.skills.find((s) => s.code === 'EF01MA05')!;
    const skillEF0106 = gradeConfig.skills.find((s) => s.code === 'EF01MA06')!;
    const skillEF0107 = gradeConfig.skills.find((s) => s.code === 'EF01MA07')!;

    // 1. Column accounts (Adição e Subtração com D e U)
    challenges.push({
      id: `bncc-1-col1-${Date.now()}`,
      grade: '1ano',
      skill: skillEF0106,
      type: 'coluna',
      columnProblem: buildAdditionProblem(randInt(11, 45), randInt(11, 45)),
    });

    challenges.push({
      id: `bncc-1-col2-${Date.now()}`,
      grade: '1ano',
      skill: skillEF0106,
      type: 'coluna',
      columnProblem: buildAdditionProblem(randInt(20, 50), randInt(10, 40)),
    });

    challenges.push({
      id: `bncc-1-col3-${Date.now()}`,
      grade: '1ano',
      skill: skillEF0106,
      type: 'coluna',
      columnProblem: buildSubtractionProblem(randInt(30, 80), randInt(10, 25)),
    });

    // 2. Riddle EF01MA07: Decomposição em Dezenas e Unidades
    const dVal1 = randInt(2, 8);
    const uVal1 = randInt(1, 9);
    const num1 = dVal1 * 10 + uVal1;
    challenges.push({
      id: `bncc-1-rid1-${Date.now()}`,
      grade: '1ano',
      skill: skillEF0107,
      type: 'enigma',
      riddle: {
        id: `r-1-1`,
        title: 'Decomposição em Dezenas e Unidades',
        question: `O número ${num1} é formado por quantas dezenas e quantas unidades?`,
        highlightNumber: num1,
        targetOrder: 'D',
        options: [
          {
            id: 'c',
            text: `${dVal1} Dezenas e ${uVal1} Unidades`,
            isCorrect: true,
            explanation: `Perfeito! O algarismo ${dVal1} vale ${dVal1 * 10} (${dVal1} dezenas) e o ${uVal1} vale ${uVal1} unidades.`,
          },
          {
            id: 'w1',
            text: `${uVal1} Dezenas e ${dVal1} Unidades`,
            isCorrect: false,
            explanation: `Atenção: a primeira casa da direita é a Unidade (${uVal1}) e a segunda é a Dezena (${dVal1}).`,
          },
          {
            id: 'w2',
            text: `${dVal1 + 1} Dezenas e ${uVal1} Unidades`,
            isCorrect: false,
            explanation: `Observe o algarismo da dezena com atenção.`,
          },
        ].sort(() => Math.random() - 0.5),
        explanation: `${num1} = ${dVal1 * 10} + ${uVal1} = ${dVal1} dezenas e ${uVal1} unidades.`,
      },
    });

    // 3. Riddle EF01MA05: Comparação de valor posicional
    const dCompA = randInt(3, 8);
    const dCompB = randInt(2, dCompA - 1);
    const numA = dCompA * 10 + randInt(1, 9);
    const numB = dCompB * 10 + randInt(1, 9);
    challenges.push({
      id: `bncc-1-rid2-${Date.now()}`,
      grade: '1ano',
      skill: skillEF0105,
      type: 'enigma',
      riddle: {
        id: `r-1-2`,
        title: 'Comparação de Dezenas',
        question: `Qual número tem MAIS dezenas: ${numA} ou ${numB}?`,
        options: [
          {
            id: 'c',
            text: `O número ${numA} (tem ${dCompA} dezenas)`,
            isCorrect: true,
            explanation: `Correto! ${numA} tem ${dCompA} dezenas (${dCompA * 10}), enquanto ${numB} tem apenas ${dCompB} dezenas (${dCompB * 10}).`,
          },
          {
            id: 'w',
            text: `O número ${numB} (tem ${dCompB} dezenas)`,
            isCorrect: false,
            explanation: `${dCompA} dezenas é maior do que ${dCompB} dezenas.`,
          },
        ],
        explanation: `Para comparar números de 2 algarismos, comparamos primeiro a ordem das Dezenas.`,
      },
    });

    // 4. Riddle EF01MA04: Agrupamento em Dezenas
    const dezenasColecao = randInt(3, 7);
    challenges.push({
      id: `bncc-1-rid3-${Date.now()}`,
      grade: '1ano',
      skill: skillEF0104,
      type: 'enigma',
      riddle: {
        id: `r-1-3`,
        title: 'Agrupamentos de 10 em 10',
        question: `Uma professora guardou lápis em ${dezenasColecao} caixas com 10 lápis cada (dezenas). Quantos lápis há no total?`,
        options: [
          {
            id: 'c',
            text: `${dezenasColecao * 10} lápis (${dezenasColecao} dezenas)`,
            isCorrect: true,
            explanation: `Muito bem! ${dezenasColecao} dezenas = ${dezenasColecao} × 10 = ${dezenasColecao * 10} unidades!`,
          },
          {
            id: 'w1',
            text: `${dezenasColecao} lápis`,
            isCorrect: false,
            explanation: `Cada caixa tem 10 lápis, não 1 só! Contamos de 10 em 10.`,
          },
          {
            id: 'w2',
            text: `${dezenasColecao * 10 + 5} lápis`,
            isCorrect: false,
            explanation: `Contando de 10 em 10: são exatamente ${dezenasColecao * 10} lápis.`,
          },
        ].sort(() => Math.random() - 0.5),
        explanation: `Cada dezena contém 10 unidades. Portanto, ${dezenasColecao} dezenas = ${dezenasColecao * 10} unidades.`,
      },
    });
  } else if (grade === '2ano') {
    // 2º ANO: Ordens U, D, C (números até 999)
    const skillEF0201 = gradeConfig.skills.find((s) => s.code === 'EF02MA01')!;
    const skillEF0204 = gradeConfig.skills.find((s) => s.code === 'EF02MA04')!;
    const skillEF0205 = gradeConfig.skills.find((s) => s.code === 'EF02MA05')!;
    const skillEF0206 = gradeConfig.skills.find((s) => s.code === 'EF02MA06')!;

    // 1. Column additions with 3 orders
    challenges.push({
      id: `bncc-2-col1-${Date.now()}`,
      grade: '2ano',
      skill: skillEF0206,
      type: 'coluna',
      columnProblem: buildAdditionProblem(randInt(120, 480), randInt(110, 420)),
    });

    challenges.push({
      id: `bncc-2-col2-${Date.now()}`,
      grade: '2ano',
      skill: skillEF0206,
      type: 'coluna',
      columnProblem: buildSubtractionProblem(randInt(350, 780), randInt(120, 290)),
    });

    challenges.push({
      id: `bncc-2-col3-${Date.now()}`,
      grade: '2ano',
      skill: skillEF0206,
      type: 'coluna',
      columnProblem: buildMultiplicationProblem(randInt(20, 95), randInt(2, 5)),
    });

    // 2. Riddle EF02MA04: Composição de Centenas, Dezenas e Unidades
    const c2 = randInt(2, 7);
    const d2 = randInt(1, 9);
    const u2 = randInt(1, 9);
    const n2 = c2 * 100 + d2 * 10 + u2;

    challenges.push({
      id: `bncc-2-rid1-${Date.now()}`,
      grade: '2ano',
      skill: skillEF0204,
      type: 'enigma',
      riddle: {
        id: `r-2-1`,
        title: 'Composição de 3 Ordens',
        question: `Qual número é formado por ${c2} Centenas + ${d2} Dezenas + ${u2} Unidades?`,
        options: [
          {
            id: 'c',
            text: `${n2}`,
            isCorrect: true,
            explanation: `Excelente! ${c2} centenas (${c2 * 100}) + ${d2} dezenas (${d2 * 10}) + ${u2} unidades = ${n2}.`,
          },
          {
            id: 'w1',
            text: `${c2 * 100 + u2 * 10 + d2}`,
            isCorrect: false,
            explanation: `Cuidado para não inverter a ordem da Dezena com a da Unidade.`,
          },
          {
            id: 'w2',
            text: `${n2 + 100}`,
            isCorrect: false,
            explanation: `São ${c2} centenas, que valem ${c2 * 100}.`,
          },
        ].sort(() => Math.random() - 0.5),
        explanation: `1 Centena = 100, 1 Dezena = 10, 1 Unidade = 1. Logo, ${c2}×100 + ${d2}×10 + ${u2} = ${n2}.`,
      },
    });

    // 3. Riddle EF02MA01: Valor relativo da Centena
    const cValDigit = randInt(3, 9);
    const numCent = cValDigit * 100 + randInt(10, 99);
    challenges.push({
      id: `bncc-2-rid2-${Date.now()}`,
      grade: '2ano',
      skill: skillEF0201,
      type: 'enigma',
      riddle: {
        id: `r-2-2`,
        title: 'Valor da 3ª Ordem (Centenas)',
        question: `No número ${numCent}, qual é o valor posicional do algarismo ${cValDigit}?`,
        highlightNumber: numCent,
        targetOrder: 'C',
        options: [
          {
            id: 'c',
            text: `${cValDigit * 100} (vale ${cValDigit} centenas)`,
            isCorrect: true,
            explanation: `Correto! Por ocupar a casa das centenas (3ª ordem), o algarismo ${cValDigit} vale ${cValDigit * 100}.`,
          },
          {
            id: 'w1',
            text: `${cValDigit * 10}`,
            isCorrect: false,
            explanation: `Se valesse ${cValDigit * 10}, ele estaria na ordem das Dezenas. Como está na Centena, vale ${cValDigit * 100}.`,
          },
          {
            id: 'w2',
            text: `${cValDigit}`,
            isCorrect: false,
            explanation: `${cValDigit} é o valor absoluto. O valor posicional nesta ordem é ${cValDigit * 100}.`,
          },
        ].sort(() => Math.random() - 0.5),
        explanation: `O algarismo na ordem das centenas é multiplicado por 100.`,
      },
    });
  } else if (grade === '3ano') {
    // 3º ANO: Ordens U, D, C, UM (números até 9.999)
    const skillEF0301 = gradeConfig.skills.find((s) => s.code === 'EF03MA01')!;
    const skillEF0302 = gradeConfig.skills.find((s) => s.code === 'EF03MA02')!;
    const skillEF0305 = gradeConfig.skills.find((s) => s.code === 'EF03MA05')!;
    const skillEF0306 = gradeConfig.skills.find((s) => s.code === 'EF03MA06')!;
    const skillEF0307 = gradeConfig.skills.find((s) => s.code === 'EF03MA07')!;

    // 1. Column accounts with UM
    challenges.push({
      id: `bncc-3-col1-${Date.now()}`,
      grade: '3ano',
      skill: skillEF0305,
      type: 'coluna',
      columnProblem: buildAdditionProblem(randInt(1200, 4800), randInt(1100, 4500)),
    });

    challenges.push({
      id: `bncc-3-col2-${Date.now()}`,
      grade: '3ano',
      skill: skillEF0305,
      type: 'coluna',
      columnProblem: buildSubtractionProblem(randInt(3500, 8900), randInt(1200, 3100)),
    });

    challenges.push({
      id: `bncc-3-col3-${Date.now()}`,
      grade: '3ano',
      skill: skillEF0306,
      type: 'coluna',
      columnProblem: buildMultiplicationProblem(randInt(250, 1400), randInt(2, 6)),
    });

    challenges.push({
      id: `bncc-3-col4-${Date.now()}`,
      grade: '3ano',
      skill: skillEF0307,
      type: 'coluna',
      columnProblem: buildDivisionProblem(randInt(20, 120) * 4, 4),
    });

    // 2. Riddle EF03MA02: 4 Ordens e Unidade de Milhar
    const um3 = randInt(2, 8);
    const c3 = randInt(1, 9);
    const d3 = randInt(1, 9);
    const u3 = randInt(1, 9);
    const num3 = um3 * 1000 + c3 * 100 + d3 * 10 + u3;

    challenges.push({
      id: `bncc-3-rid1-${Date.now()}`,
      grade: '3ano',
      skill: skillEF0302,
      type: 'enigma',
      riddle: {
        id: `r-3-1`,
        title: 'Decomposição em 4 Ordens (Milhar)',
        question: `No número ${formatBRNumber(num3)}, qual é o valor do algarismo ${um3} na Unidade de Milhar?`,
        highlightNumber: num3,
        targetOrder: 'UM',
        options: [
          {
            id: 'c',
            text: `${formatBRNumber(um3 * 1000)} (4ª ordem)`,
            isCorrect: true,
            explanation: `Correto! A Unidade de Milhar é a 4ª ordem e seu multiplicador é 1.000. Logo, ${um3} vale ${formatBRNumber(um3 * 1000)}.`,
          },
          {
            id: 'w1',
            text: `${um3 * 100}`,
            isCorrect: false,
            explanation: `Multiplicamos por 1.000, pois é Unidade de Milhar, não Centena.`,
          },
          {
            id: 'w2',
            text: `${um3 * 10000}`,
            isCorrect: false,
            explanation: `10.000 é a Dezena de Milhar. Aqui temos a Unidade de Milhar (${formatBRNumber(um3 * 1000)}).`,
          },
        ].sort(() => Math.random() - 0.5),
        explanation: `1 Unidade de Milhar = 1.000 unidades.`,
      },
    });

    // 3. Riddle EF03MA05: Agrupamento "Vai-Um"
    challenges.push({
      id: `bncc-3-rid2-${Date.now()}`,
      grade: '3ano',
      skill: skillEF0305,
      type: 'enigma',
      riddle: {
        id: `r-3-2`,
        title: 'Reagrupamento na Adição',
        question: `Ao armar a conta 850 + 670, somamos 8 centenas com 6 centenas = 14 centenas. O que acontece com o algarismo 1?`,
        options: [
          {
            id: 'c',
            text: 'Ele sobe como 1 Unidade de Milhar (1.000) para a 4ª ordem',
            isCorrect: true,
            explanation: `Exatamente! 10 centenas equivalem a 1 Unidade de Milhar. O 4 fica na Centena e o 1 vai para a Unidade de Milhar.`,
          },
          {
            id: 'w1',
            text: 'Ele fica na ordem das dezenas',
            isCorrect: false,
            explanation: `A dezena já foi somada anteriormente! O agrupamento sobe para a ordem superior (Unidade de Milhar).`,
          },
          {
            id: 'w2',
            text: 'Ele é descartado',
            isCorrect: false,
            explanation: `Nada é descartado no sistema decimal: o valor é reagrupado na ordem superior imediata.`,
          },
        ].sort(() => Math.random() - 0.5),
        explanation: `10 Centenas = 1 Unidade de Milhar (1.000). Esse é o princípio do "vai-um".`,
      },
    });
  } else if (grade === '4ano') {
    // 4º ANO: Ordens até DM (números até 99.999)
    const skillEF0401 = gradeConfig.skills.find((s) => s.code === 'EF04MA01')!;
    const skillEF0402 = gradeConfig.skills.find((s) => s.code === 'EF04MA02')!;
    const skillEF0405 = gradeConfig.skills.find((s) => s.code === 'EF04MA05')!;

    // 1. Column accounts up to 5 orders
    challenges.push({
      id: `bncc-4-col1-${Date.now()}`,
      grade: '4ano',
      skill: skillEF0405,
      type: 'coluna',
      columnProblem: buildAdditionProblem(randInt(15000, 48000), randInt(12000, 45000)),
    });

    challenges.push({
      id: `bncc-4-col2-${Date.now()}`,
      grade: '4ano',
      skill: skillEF0405,
      type: 'coluna',
      columnProblem: buildSubtractionProblem(randInt(45000, 95000), randInt(15000, 38000)),
    });

    challenges.push({
      id: `bncc-4-col3-${Date.now()}`,
      grade: '4ano',
      skill: skillEF0405,
      type: 'coluna',
      columnProblem: buildMultiplicationProblem(randInt(2400, 15000), randInt(3, 7)),
    });

    challenges.push({
      id: `bncc-4-col4-${Date.now()}`,
      grade: '4ano',
      skill: skillEF0405,
      type: 'coluna',
      columnProblem: buildDivisionProblem(randInt(500, 4000) * 5, 5),
    });

    // 2. Riddle EF04MA02: Dezena de Milhar e Potências de 10
    const dmDigit = randInt(2, 8);
    const num4 = dmDigit * 10000 + randInt(1000, 9999);
    challenges.push({
      id: `bncc-4-rid1-${Date.now()}`,
      grade: '4ano',
      skill: skillEF0402,
      type: 'enigma',
      riddle: {
        id: `r-4-1`,
        title: 'Valor na 5ª Ordem (Dezena de Milhar)',
        question: `No número ${formatBRNumber(num4)}, qual é o valor posicional do algarismo ${dmDigit} na Dezena de Milhar?`,
        highlightNumber: num4,
        targetOrder: 'DM',
        options: [
          {
            id: 'c',
            text: `${formatBRNumber(dmDigit * 10000)} (${dmDigit} × 10.000)`,
            isCorrect: true,
            explanation: `Correto! Cada unidade da 5ª ordem (Dezena de Milhar) vale 10.000. Logo, ${dmDigit} vale ${formatBRNumber(dmDigit * 10000)}.`,
          },
          {
            id: 'w1',
            text: `${formatBRNumber(dmDigit * 1000)}`,
            isCorrect: false,
            explanation: `Esse seria o valor na Unidade de Milhar. Na Dezena de Milhar, multiplicamos por 10.000.`,
          },
          {
            id: 'w2',
            text: `${formatBRNumber(dmDigit * 100000)}`,
            isCorrect: false,
            explanation: `100.000 é a Centena de Milhar. Aqui temos a Dezena de Milhar (${formatBRNumber(dmDigit * 10000)}).`,
          },
        ].sort(() => Math.random() - 0.5),
        explanation: `5ª Ordem = Dezena de Milhar = Multiplicador × 10.000.`,
      },
    });

    // 3. Riddle EF04MA01: Leitura e Comparação de Dezenas de Milhar
    challenges.push({
      id: `bncc-4-rid2-${Date.now()}`,
      grade: '4ano',
      skill: skillEF0401,
      type: 'enigma',
      riddle: {
        id: `r-4-2`,
        title: 'Quantas dezenas há no milhar?',
        question: `Quantas DEZENAS (grupos de 10) são necessárias para formar 1 Unidade de Milhar (1.000)?`,
        options: [
          {
            id: 'c',
            text: '100 dezenas (pois 100 × 10 = 1.000)',
            isCorrect: true,
            explanation: `Perfeito! Como cada dezena vale 10, precisamos de 100 dezenas para obter 1.000.`,
          },
          {
            id: 'w1',
            text: '10 dezenas',
            isCorrect: false,
            explanation: `10 dezenas formam 1 Centena (100), não 1 Milhar.`,
          },
          {
            id: 'w2',
            text: '1.000 dezenas',
            isCorrect: false,
            explanation: `1.000 dezenas seriam 10.000 (1 Dezena de Milhar).`,
          },
        ].sort(() => Math.random() - 0.5),
        explanation: `1.000 ÷ 10 = 100 dezenas.`,
      },
    });
  } else {
    // 5º ANO: Ordens até CM (números até 999.999)
    const skillEF0501 = gradeConfig.skills.find((s) => s.code === 'EF05MA01')!;
    const skillEF0507 = gradeConfig.skills.find((s) => s.code === 'EF05MA07')!;
    const skillEF0508 = gradeConfig.skills.find((s) => s.code === 'EF05MA08')!;

    // 1. Column accounts up to 6 orders (Centena de Milhar)
    challenges.push({
      id: `bncc-5-col1-${Date.now()}`,
      grade: '5ano',
      skill: skillEF0507,
      type: 'coluna',
      columnProblem: buildAdditionProblem(randInt(120000, 450000), randInt(110000, 480000)),
    });

    challenges.push({
      id: `bncc-5-col2-${Date.now()}`,
      grade: '5ano',
      skill: skillEF0507,
      type: 'coluna',
      columnProblem: buildSubtractionProblem(randInt(500000, 950000), randInt(150000, 420000)),
    });

    challenges.push({
      id: `bncc-5-col3-${Date.now()}`,
      grade: '5ano',
      skill: skillEF0508,
      type: 'coluna',
      columnProblem: buildMultiplicationProblem(randInt(35000, 150000), randInt(2, 6)),
    });

    challenges.push({
      id: `bncc-5-col4-${Date.now()}`,
      grade: '5ano',
      skill: skillEF0508,
      type: 'coluna',
      columnProblem: buildDivisionProblem(randInt(2000, 15000) * 6, 6),
    });

    // 2. Riddle EF05MA01: 6ª Ordem (Centena de Milhar) e Classes
    const cmDigit = randInt(2, 8);
    const num5 = cmDigit * 100000 + randInt(10000, 99999);
    challenges.push({
      id: `bncc-5-rid1-${Date.now()}`,
      grade: '5ano',
      skill: skillEF0501,
      type: 'enigma',
      riddle: {
        id: `r-5-1`,
        title: 'Centena de Milhar e Classes do Sistema Decimal',
        question: `No número ${formatBRNumber(num5)}, o algarismo ${cmDigit} pertence a qual ordem e a qual classe?`,
        highlightNumber: num5,
        targetOrder: 'CM',
        options: [
          {
            id: 'c',
            text: `6ª Ordem (Centena de Milhar) da 2ª Classe (Classe dos Milhares)`,
            isCorrect: true,
            explanation: `Excelente! As três primeiras ordens formam a Classe Simples e as ordens 4ª, 5ª e 6ª formam a Classe dos Milhares. Logo, o algarismo ${cmDigit} ocupa a 6ª ordem com valor de ${formatBRNumber(cmDigit * 100000)}.`,
          },
          {
            id: 'w1',
            text: `5ª Ordem da 1ª Classe`,
            isCorrect: false,
            explanation: `A 5ª ordem é a Dezena de Milhar e pertence à 2ª classe (milhares).`,
          },
          {
            id: 'w2',
            text: `6ª Ordem da 1ª Classe (Classe Simples)`,
            isCorrect: false,
            explanation: `A Classe Simples vai apenas até a 3ª ordem (Centena simples). A partir de 1.000 entramos na Classe dos Milhares.`,
          },
        ].sort(() => Math.random() - 0.5),
        explanation: `6ª Ordem = Centena de Milhar (100.000). Faz parte da 2ª Classe (Classe dos Milhares).`,
      },
    });

    // 3. Riddle EF05MA07: Algarismos cruzados entre números de 6 dígitos
    const nA5 = randInt(300000, 700000);
    const nB5 = randInt(100000, 250000);
    const dA5 = getNumberDigits(nA5);
    const dB5 = getNumberDigits(nB5);
    const sumOrder = dA5.CM + dB5.DM;

    challenges.push({
      id: `bncc-5-rid2-${Date.now()}`,
      grade: '5ano',
      skill: skillEF0507,
      type: 'enigma',
      riddle: {
        id: `r-5-2`,
        title: 'Cálculo com Algarismos de Diferentes Ordens',
        question: `Some o algarismo da Centena de Milhar de ${formatBRNumber(nA5)} com o algarismo da Dezena de Milhar de ${formatBRNumber(nB5)}. Quanto dá?`,
        options: [
          {
            id: 'c',
            text: `${sumOrder} (pois ${dA5.CM} + ${dB5.DM} = ${sumOrder})`,
            isCorrect: true,
            explanation: `Perfeito! Centena de Milhar de ${formatBRNumber(nA5)} é ${dA5.CM}. Dezena de Milhar de ${formatBRNumber(nB5)} é ${dB5.DM}. ${dA5.CM} + ${dB5.DM} = ${sumOrder}.`,
          },
          {
            id: 'w1',
            text: `${sumOrder + 2}`,
            isCorrect: false,
            explanation: `Confira os algarismos em cada uma das ordens pedidas.`,
          },
          {
            id: 'w2',
            text: `${Math.max(1, sumOrder - 3)}`,
            isCorrect: false,
            explanation: `Verifique a soma dos algarismos com cuidado.`,
          },
        ].sort(() => Math.random() - 0.5),
        explanation: `Identificamos os algarismos das ordens especificadas e realizamos a operação solicitada.`,
      },
    });
  }

  // Always return the generated challenges shuffled!
  return shuffleArray(challenges);
}

