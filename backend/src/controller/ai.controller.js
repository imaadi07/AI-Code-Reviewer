const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;
  try {
    if (!code) {
      return res
        .status(400)
        .json({ message: "Prompt (code) is required in the request body." });
    }
    const response = await aiService(code);
    if (!response) {
      return res.status(401).json({ error: "No Response" });
    }
    return res.send(response);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Something went wrong" });
  }
};
