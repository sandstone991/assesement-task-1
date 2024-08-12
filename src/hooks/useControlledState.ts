import { useCallback, useEffect, useRef, useState } from 'react';
// https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/utils/src/useControlledState.ts

export function useControlledState<T>(
  value: T | undefined,
  defaultValue: T | undefined,
  onChange?: (v: T, ...args: unknown[]) => void
): [T, (value: T, ...args: unknown[]) => void] {
  const [stateValue, setStateValue] = useState(value || defaultValue);

  const isControlledRef = useRef(value !== undefined);
  const isControlled = value !== undefined;
  useEffect(() => {
    const wasControlled = isControlledRef.current;
    if (wasControlled !== isControlled) {
      console.warn(
        `WARN: A component changed from ${
          wasControlled ? 'controlled' : 'uncontrolled'
        } to ${isControlled ? 'controlled' : 'uncontrolled'}.`
      );
    }
    isControlledRef.current = isControlled;
  }, [isControlled]);

  let currentValue = isControlled ? value : stateValue;
  const setValue = useCallback(
    (value: T, ...args: unknown[]) => {
      const onChangeCaller = (value: T, ...onChangeArgs: unknown[]) => {
        if (onChange) {
          if (!Object.is(currentValue, value)) {
            onChange(value, ...onChangeArgs);
          }
        }
        if (!isControlled) {
          // If uncontrolled, mutate the currentValue local variable so that
          // calling setState multiple times with the same value only emits onChange once.
          // We do not use a ref for this because we specifically _do_ want the value to
          // reset every render, and assigning to a ref in render breaks aborted suspended renders.
          // eslint-disable-next-line react-hooks/exhaustive-deps
          currentValue = value;
        }
      };

      if (!isControlled) {
        setStateValue(value);
      }
      onChangeCaller(value, ...args);
    },
    [isControlled, currentValue, onChange]
  );

  return [currentValue!, setValue];
}
