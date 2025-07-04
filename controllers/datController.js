const datClient = require('../services/datClient');

exports.searchExternalLoads = async (req, res) => {
  try {
    const response = await datClient.get('/loads/search'); // Replace with real API path
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postLoadToBoard = async (req, res) => {
  try {
    const response = await datClient.post('/loads', req.body); // Replace with real API path
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
