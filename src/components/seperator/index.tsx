import { cn } from 'utils';

export const Seperator = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn('my-4 h-[.5px] w-full bg-[#CDCDCD]', className)}
      role="separator"
    ></div>
  );
};
