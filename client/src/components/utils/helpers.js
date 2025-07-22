import { condition } from "./condtion";
import { heatRisk } from "./heatRisk";

export const convertToKm = (meters) => {
  const km = meters / 1000;
  return Number(km.toFixed(2));
};

export const walkingAdvice = (weatherData) => {
  const { temp, currentCondition } = weatherData;
};

const getKey = (obj, tmp) => {
  const temps = Object.entries(obj).map(([k, v]) => [Number(k), v]);
  return temps.find((closestTemp) => closestTemp[0] > tmp);
};
