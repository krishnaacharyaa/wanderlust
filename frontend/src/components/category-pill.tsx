import { twMerge } from 'tailwind-merge';

interface CategoryPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  category: string;
  selected?: boolean;
}

export default function CategoryPill({ category, selected = false }: CategoryPillProps) {
  const categoryColors: any = {
    Travel: 'pink',
    Nature: 'green',
    City: 'yellow',
    Adventure: 'blue',
    Beaches: 'purple',
    Landmarks: 'red',
    Mountains: 'teal',
  };

  const selectedColor =
    category in categoryColors ? `bg-${categoryColors[category]}-500/80` : 'bg-cyan-500/80';

  const normalColor =
    category in categoryColors
      ? `bg-${categoryColors[category]}-200 dark:bg-${categoryColors[category]}-900`
      : 'bg-cyan-200 dark:bg-cyan-900';

  return (
    <span
      className={twMerge(
        'cursor-pointer rounded-3xl px-3 py-1 text-xs font-medium text-light-primary/80 dark:text-dark-primary/80',
        selected ? selectedColor : normalColor
      )}
    >
      {category}
    </span>
  );
}
