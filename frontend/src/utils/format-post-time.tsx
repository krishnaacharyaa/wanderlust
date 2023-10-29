export default function formatPostTime(time: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(time).toLocaleDateString('en-US', options);
}
