const axios = require("axios");

async function fetchWeather(req, res) {
  let location = req.query.location;
  const apiKey = process.env.WEATHER_KEY;
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
        location
      )}&aqi=no`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  fetchWeather,
};
