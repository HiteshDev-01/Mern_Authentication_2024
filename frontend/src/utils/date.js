export const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    minute: "2-digit",
    hour: "2-digit",
    hour12: true,
  });
};





