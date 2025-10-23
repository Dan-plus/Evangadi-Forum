const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { submitAnswer, getAnswers } = require("../controllers/answercontroller");

// Submit an answer (protected)
router.post("/createanswer", authMiddleware, submitAnswer);

// Get all answers for a question (protected)
router.get("/question/:questionid", authMiddleware, getAnswers);

module.exports = router;
