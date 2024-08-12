import { useControlledState } from 'hooks/useControlledState';
import { useEffect, useRef } from 'react';
import { cn } from 'utils';

export type CheckState = boolean | 'indeterminate';

export type CheckboxProps = {
  checked?: CheckState;
  defaultChecked?: CheckState;
  disabled?: boolean;
  onCheck?: (checked: CheckState) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
} & React.HTMLAttributes<HTMLInputElement>;

const useSetIndeterminate = (
  ref: React.RefObject<HTMLInputElement>,
  indeterminate: boolean
) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate, ref]);
};

export const CheckedDefaultIcon = ({ disabled }: { disabled: boolean }) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        opacity="0.1"
        x="1.5"
        y="1.5"
        width="28"
        height="28"
        rx="7.5"
        fill="#2469F6"
        stroke="#2469F6"
        strokeWidth="3"
        className="hidden group-hover:inline"
      />
      <rect
        x="3"
        y="3"
        width="25"
        height="25"
        rx="6"
        fill={disabled ? '#5087F8' : '#2469F6'}
      />
      <path
        d="M7 15.6L13.0345 20.9672C13.055 20.9854 13.0863 20.9837 13.1047 20.9635L24 9"
        stroke="white"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const UncheckedDefaultIcon = ({ disabled }: { disabled: boolean }) => {
  return disabled ? (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_197)">
        <rect width="25" height="25" rx="6" x="3" y="3" fill="white" />
        <rect
          opacity="0.6"
          x="3.5"
          y="3.5"
          width="24"
          height="24"
          rx="5.5"
          stroke="#CDCDCD"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_197">
          <rect width="25" height="25" rx="6" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="25" height="25" rx="6" x="3" y="3" fill="white" />
      <rect x="3.5" y="3.5" width="24" height="24" rx="5.5" stroke="#CDCDCD" />
    </svg>
  );
};

export const IndeterminateDefaultIcon = ({
  disabled
}: {
  disabled: boolean;
}) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="25" height="25" rx="6" fill="white" />
      <rect
        opacity="0.1"
        x="1.5"
        y="1.5"
        width="28"
        height="28"
        rx="7.5"
        stroke="#2469F6"
        strokeWidth="3"
        className="hidden group-hover:inline"
      />
      <rect
        x="3.5"
        y="3.5"
        width="24"
        height="24"
        rx="5.5"
        fill="white"
        stroke={disabled ? '#E3E3E3' : '#BDBDBD'}
      />
      <path
        d="M7 15.6L13.0345 20.9672C13.055 20.9854 13.0863 20.9837 13.1047 20.9635L24 9"
        stroke={disabled ? '#E3E3E3' : '#BDBDBD'}
        strokeLinecap="round"
      />
    </svg>
  );
};
/**
 * @Note you can also adjust the size by passing font-size
 */
export const Checkbox = (props: CheckboxProps) => {
  const {
    checked: checkedProps,
    defaultChecked: defaultCheckedProp,
    onCheck,
    size,
    ...rest
  } = props;
  const [checked, setChecked] = useControlledState(
    checkedProps,
    defaultCheckedProp ?? false,
    onCheck
  );
  const checkboxRef = useRef<HTMLInputElement>(null);
  useSetIndeterminate(checkboxRef, checked === 'indeterminate');
  const _checked = checked === 'indeterminate' ? false : checked;
  const _fontSize =
    size === 'sm'
      ? 'text-[1rem]'
      : size === 'lg'
        ? 'text-[3rem]'
        : 'text-[2rem]';
  const CheckIcon = () => {
    if (checked === 'indeterminate') {
      return <IndeterminateDefaultIcon disabled={!!props.disabled} />;
    }
    if (checked) {
      return <CheckedDefaultIcon disabled={!!props.disabled} />;
    }
    return <UncheckedDefaultIcon disabled={!!props.disabled} />;
  };
  return (
    <span
      tabIndex={props.disabled ? -1 : undefined}
      className={cn(
        'group relative inline-flex cursor-pointer select-none appearance-none items-center align-middle justify-center bg-transparent text-[#5087F8]',
        { 'pointer-events-none cursor-default': props.disabled },
        _fontSize,
        props.className
      )}
    >
      <input
        type="checkbox"
        className="absolute left-0 top-0 z-[1] m-0 size-full p-0 opacity-0"
        checked={_checked}
        ref={checkboxRef}
        onChange={(e) => setChecked(e.target.checked)}
        disabled={props.disabled}
        {...rest}
      />
      <CheckIcon />
    </span>
  );
};
