export const convertToKm = (meters) => {
  const km = meters / 1000;
  return Number(km.toFixed(2));
};
