import { CheckState } from 'components/checkbox';
import { Seperator } from 'components/seperator';
import { useState } from 'react';
import { Page } from './page';
import { Button } from 'components/button';
import { cn } from 'utils';

export type PageItem = {
  name: string;
  defaultChecked?: boolean;
};

export type PageSelecorProps = {
  pages: PageItem[];
  rootPageItemName?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const PageSelector = ({
  pages,
  rootPageItemName = 'All pages',
  className,
  style
}: PageSelecorProps) => {
  const [pagesCheckedState, setPagesCheckedState] = useState<CheckState[]>(
    () => {
      return pages.map((i) => !!i.defaultChecked);
    }
  );
  const isRootPageChecked = pagesCheckedState.every((i) => i);
  const isRootPageUnchecked = pagesCheckedState.every((i) => !i);
  const rootCheckState = isRootPageChecked
    ? true
    : isRootPageUnchecked
      ? false
      : 'indeterminate';
  return (
    <div
      className={cn(
        'py-[9.5px] box-border border-[#EEEEEE] border flex items-center flex-col rounded-[6px]',
        className
      )}
      style={{
        boxShadow:
          '0px 8px 15px 0px rgba(20, 20, 20, 0.12), 0px 0px 4px 0px rgba(20, 20, 20, 0.1)',
        ...(style ?? {})
      }}
    >
      <Page
        pageName={rootPageItemName}
        checked={rootCheckState}
        setChecked={() => {
          if (rootCheckState === 'indeterminate') {
            setPagesCheckedState(pagesCheckedState.map(() => true));
          } else if (rootCheckState) {
            setPagesCheckedState(pagesCheckedState.map(() => false));
          } else if (!rootCheckState) {
            setPagesCheckedState(pagesCheckedState.map(() => true));
          }
        }}
      />
      <div className="h-fit w-full px-[15px]">
        <Seperator className="my-[9.5px]" />
      </div>
      <div
        className="h-[164px] overflow-y-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {pages.map((page, index) => (
          <Page
            // this is okay since we don't change the order of the pages
            key={page.name + index}
            pageName={page.name}
            checked={pagesCheckedState[index]}
            setChecked={() => {
              setPagesCheckedState((prev) => {
                const newState = [...prev];
                newState[index] = !newState[index];
                return newState;
              });
            }}
          />
        ))}
      </div>
      <div className="h-fit w-full px-[15px]">
        <Seperator className="my-[9.5px]" />
      </div>
      <div className="w-full px-[15px] py-[10px]">
        <Button className="h-[40px] w-full">Done</Button>
      </div>
    </div>
  );
};
