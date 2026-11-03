# Application Design Document

## 1. Algorithmic Complexity (Big O)

* **createDigitValidator(base)**
  * Time Complexity: O(1) — Returns a closed function utilizing array lookup.
  * Space Complexity: O(1) — No extra space allocated.

* **isValidGuess(guess, length, base)**
  * Time Complexity: O(N) — Where N is the length of the guess. Set population takes linear time.
  * Space Complexity: O(N) — Unique characters are stored in a Set.

* **generateSecret(length, base)**
  * Time Complexity: O(L) — Where L is the required length. Internal recursion runs exactly L times due to strict tracking.
  * Space Complexity: O(L) — Recursion stack depth equals the secret length.

* **evaluateGuess(secret, guess)**
  * Time Complexity: O(N) — Linear scan over the guess array using functional reducers.
  * Space Complexity: O(1) — Scalar counters for bulls and cows.

* **countPossibleSecrets(length, base)**
  * Time Complexity: O(L) — Linear time due to full memoization (caching results) preventing redundant sub-tree traversals.
  * Space Complexity: O(L) — Memoization map size is proportional to the word length.

## 2. Data Structures Justification

* **Immutable Plain Objects**: Used for `GameState` to enforce pure predictable data flows without side effects.
* **Readonly Arrays**: Enforced via TypeScript types to block in-place mutations (e.g., `push`, `splice`), strictly relying on spreading `[...history, entry]`.
* **Set**: Utilized inside guess validation to guarantee O(1) unique character lookups.

## 3. Clean Code & Architecture Principles

* **Pure Functions**: Entire application core operates with zero side effects. Given the same inputs, functions return the exact same outputs.
* **Separation of Concerns**: State modifiers (`state.ts`), core math logic (`core.ts`), and DOM rendering (`ui.ts`) are completely isolated from each other.
* **Strict DOM API Enforcements**: Zero instances of `innerHTML` or `insertAdjacentHTML`. HTML injection vectors are entirely eliminated by leveraging strict `document.createElement` nodes.
