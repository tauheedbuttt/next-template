export const convertTime = (time: any) => {
  const parts = time.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2]?.split(".")[0], 10);
  const milliseconds = parseInt(parts[2]?.split(".")[1], 10);

  const customDate = new Date();
  customDate.setHours(hours, minutes, seconds, milliseconds);
  return customDate;
};

export const formatTime = (time: any) => {
  const date = convertTime(time);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export const formatDate = (date: any) => {
  const basic = new Date(date);
  return !date ? "-" : basic.toLocaleDateString("en-GB").replace(/\//g, "-");
};
