type TitleProps = {
  firstLine: string;
  secondLine: string;
};

export default function Title({ firstLine, secondLine }: TitleProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-5 bg-surface-accent"></div>
      <div className={`flex flex-col items-baseline text-4xl`}>
        <h2 className="font-bold text-text-primary">{firstLine}</h2>
        <h2 className="font-bold text-text-accent self-center">{secondLine}</h2>
      </div>
    </div>
  );
}
