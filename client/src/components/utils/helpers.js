import { condition } from "./condtion";
import { heatRisk } from "./heatRisk";

export const convertToKm = (meters) => {
  const km = meters / 1000;
  return Number(km.toFixed(2));
};

export const walkingAdvice = (weatherData) => {
  const { temp, currentCondition } = weatherData;
  if (currentCondition === "Clear" || currentCondition === "Sunny") {
    const key = getKey(heatRisk, temp);
    return heatRisk[key]["description"];
  } else {
    return condition[`${currentCondition}`]["advice"];
  }
};

const getKey = (obj, tmp) => {
  const temps = Object.entries(obj).map(([k, v]) => [Number(k), v]);
  const foundTemp = temps.find((closestTemp) => closestTemp[0] > tmp);
  return foundTemp[0];
};

export const dateConvert = (utcString) => {
  const date = new Date(utcString);
  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-UK", {
    timeStyle: "short",
  });

  const withMeridiem = () => {
    const hours = date.getHours();
    return hours >= 12 ? "pm" : "am";
  };

  return `${formattedDate} at ${formattedTime}${withMeridiem()}`;
};
