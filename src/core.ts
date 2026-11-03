export const createDigitValidator = (base: number): ((char: string) => boolean) => {
  return (char: string): boolean => {
    if (char.length !== 1) return false;
    const allDigits = '0123456789abcdefghijklmnopqrstuvwxyz';
    const validDigits = allDigits.substring(0, base);
    return validDigits.includes(char.toLowerCase());
  };
};