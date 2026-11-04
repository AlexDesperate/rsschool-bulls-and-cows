# Application Design Document

## 1. Algorithmic Complexity (Big O)

* **createDigitValidator(base)**
  * **Time Complexity:** $O(1)$ — Performs a direct substring slice and includes check on a static alphabet string up to the base limit.
  * **Space Complexity:** $O(1)$ — No extra space is allocated.

* **isValidGuess(guess, length, base)**
  * **Time Complexity:** $O(N)$ — Where $N$ is the length of the guess. Splitting the string and populating the Set takes linear time relative to the number of characters.
  * **Space Complexity:** $O(N)$ — Unique characters are stored in a Set, which takes space proportional to the guess length.

* **generateSecret(length, base)**
  * **Time Complexity:** $O(L^2)$ in the average/worst case — Where $L$ is the required secret length. The recursive function iterates until the array size matches $L$. Inside each step, `current.includes(chosenChar)` performs a linear search of size up to $L$.
  * **Space Complexity:** $O(L)$ — The maximum depth of the recursion stack is directly proportional to the secret length $L$.

* **evaluateGuess(secret, guess)**
  * **Time Complexity:** $O(N^2)$ — Where $N$ is the length of the strings. The first reducer (bulls) is $O(N)$ due to direct index comparison. The second reducer (cows) runs $N$ times and calls `secretArr.includes(char)` inside, which itself takes up to $O(N)$ time, resulting in quadratic complexity.
  * **Space Complexity:** $O(N)$ — Creating arrays via `split('')` from the secret and guess strings requires memory proportional to $N$.

* **countPossibleSecrets(length, base)**
  * **Time Complexity:** $O(L)$ — Where $L$ is the length of the secret. Due to full memoization with `memoCache`, each state $(length, base)$ is computed exactly once, preventing redundant recursive sub-tree traversals.
  * **Space Complexity:** $O(L)$ — The recursion stack depth and the size of the `memoCache` map are proportional to the word length $L$.

## 2. Data Structures Justification

* **Immutable Plain Objects:** Used for the global `GameState` in `state.ts` to enforce predictable unidirectional data flows and guarantee that state is never mutated directly.
* **Readonly Arrays:** Enforced via TypeScript types for `state.history` to block in-place mutations (like `.push()` or `.splice()`), strictly relying on array spreading `[...state.history, newEntry]`.
* **Set:** Utilized inside `isValidGuess` in `core.ts`. It provides an elegant, high-performance native way to find the number of unique characters and instantly detect duplicates by comparing `uniqueChars.size !== length`.

## 3. Clean Code & Architecture Principles

* **Pure Functions:** Entire application core in `core.ts` operates with zero side effects. Functions like `evaluateGuess` or `isValidGuess` depend strictly on their arguments and return predictable outputs. `generateSecret` takes `random` as an injection argument to remain deterministic during unit testing.
* **Separation of Concerns:** Pure math logic and rules are strictly isolated in `core.ts`, state transaction mutations are handled in `state.ts`, and DOM engine processes are isolated in `ui.ts` and `index.ts`.
* **KISS (Keep It Simple, Stupid):** Avoided over-engineering by using clean functional primitives instead of complex OOP classes or external heavy utility libraries (like lodash).
* **Strict DOM API Enforcements:** Completely eliminated HTML injection vectors. The `createElement` helper in `ui.ts` relies exclusively on `document.createElement` and `textContent` properties, ensuring total safety against XSS attacks without using `innerHTML`.