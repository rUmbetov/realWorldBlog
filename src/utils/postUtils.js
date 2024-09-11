import { format } from 'date-fns';

export const formatDate = (date) => {
  return format(date, 'MMMM d, yyyy');
};
export const isEdit = (userName, authorName) => {
  if (userName !== authorName) {
    return false;
  }
  return true;
};
