const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (date: string) => {
  const dateCopy = new Date(date);
  const year = dateCopy.getFullYear();
  const month = dateCopy.getMonth() + 1;
  const day = dateCopy.getDate();
  const formattedDate = `${day < 10 ? '0' + day : day} ${months[month]} ${year}`;
  return formattedDate;
};

export default formatDate;
