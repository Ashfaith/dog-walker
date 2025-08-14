const axios = require("axios");
const models = require("../db/models");

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

async function submitPost(req, res) {
  try {
    let { title, content, distance, time } = req.body;
    const user = req.user;
    const post = await models.createPost(
      title,
      content,
      distance,
      time,
      user.id
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getPosts(req, res) {
  const user = req.user;
  try {
    const posts = await models.queryPosts(user.id);
    res.json(posts);
  } catch (err) {
    console.error("Error in getPosts:", err);
    res.status(500).json({ message: err.message });
  }
}

async function fetchMap(req, res) {
  const token = process.env.JAWG_TOKEN;
  const { z, x, y } = req.params;
  try {
    const response = await axios.get(
      `https://tile.jawg.io/jawg-dark/${z}/${x}/${y}.png?access-token=${token}`,
      { responseType: "arraybuffer" }
    );
    res.setHeader("Content-Type", "image/png");
    res.send(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getUser(req, res) {
  const user = req.user;
  res.json(user);
}

module.exports = {
  fetchWeather,
  submitPost,
  getPosts,
  fetchMap,
  getUser,
};
