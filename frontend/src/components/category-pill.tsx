import { getCategoryColors } from '@/utils/category-colors';
import { twMerge } from 'tailwind-merge';

interface CategoryPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  category: string;
  selected?: boolean;
  categories?: string[];
}

export default function CategoryPill({
  category,
  categories = [],
  selected = false,
}: CategoryPillProps) {
  const [defaultColor, selectedColor]: [string, string] = getCategoryColors(category);

  return (
    <span
      className={twMerge(
        `cursor-pointer rounded-3xl px-3 py-1 text-xs font-medium text-light-primary/80 dark:text-dark-primary/80 ${
          categories.length >= 3 && !categories.includes(category)
            ? 'cursor-not-allowed opacity-50'
            : ''
        }`,
        selected ? selectedColor : defaultColor
      )}
    >
      {category}
    </span>
  );
}
