const dbconnect = require("../db/dbconfig"); // import database connection

// Submit an answer
async function submitAnswer(req, res) {
  try {
    const { questionid, answer } = req.body; // get question ID and answer from request body
    const userid = req.user.userid; // get user ID from authMiddleware

    if (!questionid || !answer) {
      // validate required fields
      return res.status(400).json({ message: "Question ID and answer are required" });
    }

    // insert answer into database
    const [result] = await dbconnect.execute(
      "INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)",
      [questionid, userid, answer]
    );

    // respond with success
    res.status(201).json({
      message: "Answer submitted successfully",
      answerId: result.insertId // return new answer ID
    });
  } catch (error) {
    console.error("Error submitting answer:", error); // log error
    res.status(500).json({ message: "Server error" }); // return server error
  }
}

// Get all answers for a question
async function getAnswers(req, res) {
  try {
    const { questionid } = req.params; // get question ID from route params

    // fetch answers from database, join with user info
    const [rows] = await dbconnect.execute(
      `SELECT a.answerid, a.answer, u.username
       FROM answers a
       JOIN users u ON a.userid = u.userid
       WHERE a.questionid = ?
       ORDER BY a.answerid ASC`, // order answers by ID ascending
      [questionid] // parameterize query to prevent SQL injection
    );

    res.status(200).json(rows); // return answers
  } catch (error) {
    console.error("Error fetching answers:", error); // log error
    res.status(500).json({ message: "Server error" }); // return server error
  }
}

module.exports = { submitAnswer, getAnswers }; // export functions
