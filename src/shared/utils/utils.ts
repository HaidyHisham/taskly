// ^ ------------------------ get user name initials ------------------------
export const getNameInitials = (name: string) => {
  return name?.split(' ').length > 1
    ? name
        ?.split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
    : name?.split('').slice(0, 2).join('');
};

// ^ ------------------------ formate date ------------------------
export const formateDateString = (date: string, type: string = 'en-GB') => {
  return new Date(date).toLocaleDateString(type, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};