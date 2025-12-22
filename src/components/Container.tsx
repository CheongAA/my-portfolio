import type { ReactNode } from "react";
import { cn } from "../utils/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={cn("max-w-7xl w-full px-10 md:px-20 mx-auto my-32", className)}
    >
      {children}
    </div>
  );
}
