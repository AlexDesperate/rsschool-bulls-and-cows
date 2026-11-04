export const createDigitValidator = (base) => {
    return (char) => {
        if (char.length !== 1)
            return false;
        const allDigits = '0123456789abcdefghijklmnopqrstuvwxyz';
        const validDigits = allDigits.substring(0, base);
        return validDigits.includes(char.toLowerCase());
    };
};
export const isValidGuess = (guess, length, base) => {
    if (guess.length !== length)
        return false;
    const lowerGuess = guess.toLowerCase();
    const chars = lowerGuess.split('');
    const uniqueChars = new Set(chars);
    if (uniqueChars.size !== length)
        return false;
    const isDigitValid = createDigitValidator(base);
    return chars.every((char) => isDigitValid(char));
};
export const generateSecret = (length, base, random = Math.random) => {
    const allDigits = '0123456789abcdefghijklmnopqrstuvwxyz';
    const availableChars = allDigits.substring(0, base).split('');
    const build = (current) => {
        if (current.length === length)
            return current;
        const randomIndex = Math.floor(random() * availableChars.length);
        const chosenChar = availableChars[randomIndex];
        const next = current.includes(chosenChar) ? current : [...current, chosenChar];
        return build(next);
    };
    return build([]).join('');
};
export const evaluateGuess = (secret, guess) => {
    const secretArr = secret.toLowerCase().split('');
    const guessArr = guess.toLowerCase().split('');
    const bulls = guessArr.reduce((acc, char, index) => {
        return char === secretArr[index] ? acc + 1 : acc;
    }, 0);
    const cows = guessArr.reduce((acc, char, index) => {
        return char !== secretArr[index] && secretArr.includes(char) ? acc + 1 : acc;
    }, 0);
    return { bulls, cows };
};
const memoCache = {};
export const countPossibleSecrets = (length, base) => {
    const cacheKey = `${length}-${base}`;
    if (cacheKey in memoCache) {
        return memoCache[cacheKey];
    }
    if (length === 0)
        return 1;
    const result = base * countPossibleSecrets(length - 1, base - 1);
    memoCache[cacheKey] = result;
    return result;
};
