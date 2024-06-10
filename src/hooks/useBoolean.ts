import {useMemo, useState} from 'react';
/**
 * `useBoolean` Hook
 *
 * A custom hook to manage a boolean state with convenience methods.
 *
 * @param {boolean} initialState - The initial state, can be of any type but typically a boolean.
 * @returns {[boolean, {on: () => void, off: () => void, toggle: () => void}]} - An array with the current boolean state and an object containing methods to manipulate the state.
 *
 * Example usage:
 *
 * const [isOn, { on, off, toggle }] = useBoolean(false);
 *
 * - `isOn`: The current state (boolean).
 * - `on()`: Sets the state to `true`.
 * - `off()`: Sets the state to `false`.
 * - `toggle()`: Toggles the state between `true` and `false`.
 */

const useBoolean = (
  initialState: boolean,
): [boolean, {on: () => void; off: () => void; toggle: () => void}] => {
  const [value, setValue] = useState(initialState);
  const callbacks = useMemo(
    () => ({
      on: () => setValue(true),
      off: () => setValue(false),
      toggle: () => setValue((prev: any) => !prev),
    }),
    [],
  );
  return [value, callbacks];
};

export default useBoolean;
