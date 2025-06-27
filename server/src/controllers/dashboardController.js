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
    let { title, content } = req.body;
    const user = req.user;
    const post = await models.createPost(title, content, user.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getPosts(req, res) {
  try {
    const posts = await models.queryPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  fetchWeather,
  submitPost,
  getPosts,
};
