import Title from "@/components/Title";

type ContentHeaderProps = {
  firstLine: string;
  secondLine: string;
};

export default function ContentHeader({ firstLine, secondLine }: ContentHeaderProps) {
  return (
    <div className="flex justify-between items-center mx-auto py-4">
      <Title firstLine={firstLine} secondLine={secondLine} />

      <div className="flex items-center gap-3 px-8">
        <p className="text-sm text-text-muted">Mostrar por página:</p>

        <select className="bg-surface-dark border border-border-primary rounded-md p-1 text-sm text-foreground focus:outline-none focus:border-border-primary">
          <option value="4">4</option>
          <option value="6">6</option>
        </select>
      </div>
    </div>
  );
}
