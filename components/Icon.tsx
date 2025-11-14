import type { SimpleIcon } from "simple-icons";

type IconProps = {
  icon: SimpleIcon;
  className?: string;
};

export default function Icon({ icon, className }: IconProps) {
  return (
    <svg className={className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
