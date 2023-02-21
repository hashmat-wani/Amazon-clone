export default function capitalize(str) {
  str = str.trim();
  if (!str) return str;
  str = str.toLowerCase().split(" ");
  for (let i in str) {
    if (str[0] !== "create")
      str[i] = str[i].trim()[0].toUpperCase() + str[i].substring(1);
  }
  return str.join(" ");
}
