export const getCurrentDateTime = () => {
  const today = new Date();
  const date = `${
    today.getMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format

  const time = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")}${ampm}`;
  return `${date} ${time}`;
};
