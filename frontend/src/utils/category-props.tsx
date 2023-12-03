let commonProps: string = 'px-3 py-1 rounded-3xl font-normal text-sm';
export const categoryProps = (category: string, selected: boolean = false, disable: boolean = false) => {
  switch (category) {
    case 'Travel':
      return `${commonProps} ${selected ? `bg-pink-500` : disable ? `bg-slate-100 text-slate-400` : `bg-pink-100`}`;

    case 'Nature':
      return `${commonProps} ${selected ? `bg-green-500` : disable ? `bg-slate-100 text-slate-400` : `bg-green-100`}`;

    case 'City':
      return `${commonProps} ${selected ? `bg-yellow-500` : disable ? `bg-slate-100 text-slate-400` : `bg-yellow-100`}`;

    case 'Adventure':
      return `${commonProps} ${selected ? `bg-blue-500` : disable ? `bg-slate-100 text-slate-400` : `bg-blue-100`}`;

    case 'Beaches':
      return `${commonProps} ${selected ? `bg-purple-500` : disable ? `bg-slate-100 text-slate-400` : `bg-purple-100`}`;

    case 'Landmarks':
      return `${commonProps} ${selected ? `bg-red-500` : disable ? `bg-slate-100 text-slate-400` : `bg-red-100`}`;

    default:
      return `${commonProps} ${selected ? `bg-orange-500` : disable ? `bg-slate-100 text-slate-400` : `bg-orange-100`}`;
  }
};
