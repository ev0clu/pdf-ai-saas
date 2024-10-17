import { ReactNode } from "react";

/**
 * StepperBarWrapper
 */
//

interface StepperBarWrapperProps {
  children: ReactNode;
}

const StepperBarWrapper = ({ children }: StepperBarWrapperProps) => {
  return (
    <div className="flex flex-col items-center justify-center">{children}</div>
  );
};

/**
 * StepperBar
 */
//

interface StepperBarProps {
  children: ReactNode;
}

const StepperBar = ({ children }: StepperBarProps) => {
  return (
    <div className="flex h-14 w-14 items-center justify-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-white">
        {children}
      </div>
    </div>
  );
};

/**
 * StepperSeparator
 */
//

const StepperSeparator = () => {
  return <div className="h-10 w-[2px] bg-primary"></div>;
};

/**
 * StepperContentWrapper
 */
//

interface StepperContentWrapperProps {
  children: ReactNode;
}

const StepperContentWrapper = ({ children }: StepperContentWrapperProps) => {
  return <div className="space-y-10">{children}</div>;
};

/**
 * StepperContent
 */
//

interface StepperContentProps {
  title: string;
  content: string;
}

const StepperContent = ({ title, content }: StepperContentProps) => {
  return (
    <div className="flex h-14 flex-col justify-center">
      <div className="text-lg font-bold">{title}</div>
      <div className="text-muted-foreground">{content}</div>
    </div>
  );
};

export {
  StepperBarWrapper,
  StepperBar,
  StepperSeparator,
  StepperContentWrapper,
  StepperContent,
};
