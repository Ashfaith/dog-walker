export const condtion = {
  Sunny: {
    type: "sun",
    advice: "Great walking weather! Just bring water if it’s a warm day.",
  },
  "Partly cloudy": {
    type: "cloud",
    advice: "Nice and mild—perfect for a walk with some shade breaks.",
  },
  Cloudy: {
    type: "cloud",
    advice: "Comfortable walking weather. Great for dogs who overheat easily.",
  },
  Overcast: {
    type: "cloud",
    advice: "A bit gloomy, but good walking conditions—cool and calm.",
  },
  Mist: {
    type: "light_rain",
    advice: "Light mist—walks are fine, but towel your dog off after.",
  },
  "Patchy rain possible": {
    type: "light_rain",
    advice: "Keep an umbrella handy—short walks are okay between showers.",
  },
  "Light rain": {
    type: "rain",
    advice:
      "Light rain—quick walks are okay if your dog doesn’t mind getting a little wet.",
  },
  "Moderate rain": {
    type: "rain",
    advice: "Better to keep walks short or wait for a break in the rain.",
  },
  "Heavy rain": {
    type: "rain",
    advice: "Skip the walk unless necessary—wet, uncomfortable, and slippery.",
  },
  Showers: {
    type: "rain",
    advice: "Intermittent rain—dodge the downpours for a quick walk.",
  },
  Thunderstorm: {
    type: "storm",
    advice: "Stay indoors—thunder can scare dogs and it's unsafe outside.",
  },
  Snow: {
    type: "snow",
    advice:
      "Bundle up! Short walks are fine, but watch for icy paths and cold paws.",
  },
  "Patchy snow possible": {
    type: "snow",
    advice: "Some snow around—walk carefully and limit time if it’s very cold.",
  },
  Blizzard: {
    type: "snow",
    advice: "Stay inside—visibility and footing are poor, not safe for a walk.",
  },
  Fog: {
    type: "fog",
    advice: "Low visibility—use a leash and reflective gear if heading out.",
  },
  Clear: {
    type: "sun",
    advice:
      "Clear skies—ideal for a walk! Just watch pavement temp if it’s hot.",
  },
};
