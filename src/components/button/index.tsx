import { cn } from 'utils';

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'flex items-center justify-center rounded-[4px] bg-[#FFCE22] px-[20px] py-[10px] text-black hover:bg-[#FFD84D]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
/* Property 1=Default */
