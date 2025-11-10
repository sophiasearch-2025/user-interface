type BarCollectionProps = {
  collectionTitle: string;
};

export default function BarCollection({ collectionTitle }: BarCollectionProps) {
  return (
    <div className="flex justify-between items-center mx-auto px-8 py-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-3 bg-surface-accent"></div>
        <div className="flex flex-col items-baseline">
          <p className="font-bold text-lg text-text-primary">Colección:</p>
          <p className="font-bold text-text-accent self-center">{collectionTitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm text-text-muted">Mostrar por página:</p>

        <select className="bg-surface-dark border border border-border-primary rounded-md p-1 text-sm text-foreground focus:outline-none focus:border-border-primary">
          <option value="4">4</option>
          <option value="6">6</option>
        </select>
      </div>
    </div>
  );
}
