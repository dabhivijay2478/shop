import React, { useState } from "react";
import { useEffect } from "react";
import Checkout from "./Checkout";

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8000/fetchquiz");
      const result = await response.json();
      setQuiz(result);
    }
    fetchData();
  }, []);

  function handleAnswer(index, event) {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = event.target.value;
    setUserAnswers(updatedAnswers);
  }

  function checkAnswer(index) {
    const correctAnswer = quiz[index].Answer;
    const userAnswer = userAnswers[index];
    if (userAnswer === correctAnswer) {
      alert("Correct!");
      setCount(count + 1);
      console.log(count);
    } else {
      alert("Incorrect. Please try again.");
    }
  }
  const Sumbit = () => {
    <Checkout discountquiz={count} />;
  };
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        {quiz.map((item, index) => (
          <form
            action=""
            key={index}
            className="mx-auto mt-8 mb-0 max-w-md space-y-4"
          >
            <>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                    placeholder="Question"
                    value={item.Question}
                    readOnly
                  />
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                      placeholder="write your answer here"
                      value={userAnswers[index] || ""}
                      onChange={(event) => handleAnswer(index, event)}
                    />
                  </div>
                </div>
              </div>
              <button type="button" onClick={() => checkAnswer(index)}>
                Check Answer
              </button>
            </>
          </form>
        ))}
      </div>
    </>
  );
}
