interface HeroButtonProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'solid' | 'outline';
}

export default function HeroButton({
  href,
  label,
  icon,
  variant = 'solid',
}: HeroButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition shadow-md';

  const solid =
    'bg-orange-500 text-white hover:bg-orange-600';

  const outline =
    'border border-white text-white hover:bg-white hover:text-black';

  return (
    <a href={href} className={`${base} ${variant === 'solid' ? solid : outline}`}>
      {icon}
      {label}
    </a>
  );
}
