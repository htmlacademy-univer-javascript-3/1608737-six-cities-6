export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

