// Answers.jsx
import React, { useState, useEffect } from "react";
import axios from "../axios/axios";

const Answers = ({ questionId, token }) => {
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState(null);

  // Fetch answers for this question
  const fetchAnswers = async () => {
    try {
      const res = await axios.get(`/answers/question/${questionId}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setAnswers(res.data);
    } catch (err) {
      console.error("Error fetching answers:", err);
      setError("Failed to load answers");
      setAnswers([]);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, [questionId]);

  // Submit a new answer
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      await axios.post(
        "/answers/createanswer",
        { questionid: questionId, answer: newAnswer },
        { headers: { Authorization: "Bearer " + token } }
      );
      setNewAnswer("");
      fetchAnswers(); // refresh answers
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError("Failed to submit answer");
    }
  };

  return (
    <div className="mt-4">
      <h4>Answers</h4>
      {error && <div className="alert alert-danger">{error}</div>}

      {answers.length === 0 ? (
        <p>No answers yet. Be the first to reply!</p>
      ) : (
        answers.map((a) => (
          <div key={a.answerid} className="border rounded p-3 mb-3">
            <p>{a.answer}</p>
            <small className="text-muted">By {a.username}</small>
          </div>
        ))
      )}

      {/* Add New Answer Form */}
      <div className="mt-3">
        <h5>Your Answer</h5>
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-2"
            rows="3"
            placeholder="Write your answer..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button className="btn btn-warning btn-sm" type="submit">
            Post Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Answers;
