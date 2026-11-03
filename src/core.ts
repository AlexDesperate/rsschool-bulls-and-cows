export const createDigitValidator = (base: number): ((char: string) => boolean) => {
  return (char: string): boolean => {
    if (char.length !== 1) return false;
    const allDigits = '0123456789abcdefghijklmnopqrstuvwxyz';
    const validDigits = allDigits.substring(0, base);
    return validDigits.includes(char.toLowerCase());
  };
};

export const isValidGuess = (guess: string, length: number, base: number): boolean => {
  if (guess.length !== length) return false;

  const lowerGuess = guess.toLowerCase();
  const chars = lowerGuess.split('');

  const uniqueChars = new Set(chars);
  if (uniqueChars.size !== length) return false;

  const isDigitValid = createDigitValidator(base);
  return chars.every((char) => isDigitValid(char));
};
export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random,
): string => {
  return '';
};
