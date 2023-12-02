import { twMerge } from 'tailwind-merge';

interface CategoryPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  category: string;
  selected?: boolean;
}

export default function CategoryPill({ category, selected = false }: CategoryPillProps) {
  const categoryDefaultColors: any = {
    Travel: 'bg-pink-200 dark:bg-pink-900',
    Nature: 'bg-green-200 dark:bg-green-900',
    City: 'bg-yellow-200 dark:bg-yellow-900',
    Adventure: 'bg-blue-200 dark:bg-blue-900',
    Beaches: 'bg-purple-200 dark:bg-purple-900',
    Landmarks: 'bg-red-200 dark:bg-red-900',
    Mountains: 'bg-teal-200 dark:bg-teal-900',
  };
  const categorySelectedColors: any = {
    Travel: 'bg-pink-500/80',
    Nature: 'bg-green-500/80',
    City: 'bg-yellow-500/80',
    Adventure: 'bg-blue-500/80',
    Beaches: 'bg-purple-500/80',
    Landmarks: 'bg-red-500/80',
    Mountains: 'bg-teal-500/80',
  };

  const selectedColor =
    category in categorySelectedColors ? categorySelectedColors[category] : 'bg-cyan-500/80';

  const defaultColor =
    category in categoryDefaultColors ? categoryDefaultColors[category] : 'bg-cyan-200 dark:bg-cyan-900';

  return (
    <span
      className={twMerge(
        'cursor-pointer rounded-3xl px-3 py-1 text-xs font-medium text-light-primary/80 dark:text-dark-primary/80',
        selected ? selectedColor : defaultColor
      )}
    >
      {category}
    </span>
  );
}
