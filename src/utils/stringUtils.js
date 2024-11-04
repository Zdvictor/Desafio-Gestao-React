export const handleFixName = (name) => {
  if (!name) {
      return "";
  }

  const splitName = name.split(" ");
  const fixedName = splitName.map((name) => {
      return name[0].toUpperCase() + name.slice(1);
  }).join(" ");

  return fixedName;
};

