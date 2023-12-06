import { getCategoryColors } from '@/utils/category-colors';
import { twMerge } from 'tailwind-merge';

interface CategoryPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  category: string;
  selected?: boolean;
  disabled?: boolean;
}


export default function CategoryPill({ category, selected = false, disabled = false }: CategoryPillProps) {
  const [defaultColor, selectedColor]: [string, string] = getCategoryColors(category);
  const disabledColor: string = "bg-slate-100 text-slate-400 cursor-not-allowed"

  return (
    <span
      className={twMerge(
        'cursor-pointer rounded-3xl px-3 py-1 text-xs font-medium text-light-primary/80 dark:text-dark-primary/80',
        selected ? selectedColor : defaultColor,
        disabled && disabledColor
      )}
    >
      {category}
    </span>
  );
}
