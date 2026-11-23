import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Centred page-width wrapper with responsive side gutters. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-page px-5 sm:px-gutter ${className}`}>{children}</div>
  );
}
