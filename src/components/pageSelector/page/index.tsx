import { Checkbox, CheckState } from 'components/checkbox';
import { Dispatch, SetStateAction, useRef } from 'react';

export interface PageProps {
  pageName: string;
  checked: CheckState;
  setChecked: Dispatch<SetStateAction<CheckState>>;
}

export const Page = ({ pageName, checked, setChecked }: PageProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  return (
    <div
      data-testid="page"
      // Because divs can't be focused by default
      contentEditable
      suppressContentEditableWarning
      onClick={(e) => {
        // shouln't handle click twice
        if (e.target === checkboxRef.current) return;
        setChecked((p) => !p);
      }}
      onFocus={() => {
        // if focused redirect focus to checkbox
        checkboxRef.current?.focus();
      }}
      className="group flex h-[42px] w-[370px] cursor-pointer justify-between border-0 bg-[#FFFFFF] py-[8px] pl-[22px] pr-[15px]"
    >
      <span className="text-[##1F2128]">{pageName}</span>
      <Checkbox
        checked={checked}
        onCheck={(e) => {
          setChecked(e);
        }}
        ref={checkboxRef}
        size="md"
      />
    </div>
  );
};
// font-family: Montserrat;
// font-size: 14px;
// font-weight: 400;
// line-height: 18.2px;
// text-align: left;
