export const heightGenerator = () => {
  const options: { label: string; value: number }[] = [];

  for (let cm = 80; cm <= 230; cm++) {
    const inchesTotal = cm / 2.54;
    const feet = Math.floor(inchesTotal / 12);
    const inches = Math.round(inchesTotal % 12);

    const label = `${cm} cm (${feet}'${inches}")`;
    options.push({ label, value: cm }); // 👈 Acá el `value` es solo el número
  }

  return options;
};

export const parseCmFromOption = (option: string): number => {
  // Asume que el string siempre empieza con el número + " cm"
  const match = option.match(/^(\d+)\s?cm/);
  return match ? parseInt(match[1], 10) : 0;
};
