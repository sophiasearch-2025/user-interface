import Title from "@/components/Title";
import { ReactNode } from "react";

type ContentHeaderProps = {
  firstLine: string;
  secondLine: string;
  children: ReactNode;
};

export default function ContentHeader({ firstLine, secondLine, children }: ContentHeaderProps) {
  return (
    <div className="flex justify-between items-center mx-auto py-4">
      <Title firstLine={firstLine} secondLine={secondLine} />

      {children}
    </div>
  );
}
