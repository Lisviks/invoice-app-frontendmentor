const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (date: string) => {
  const splitDate = date.split('-');
  return `${splitDate[2]} ${months[Number(splitDate[1]) - 1]} ${splitDate[0]}`;
};

export default formatDate;
