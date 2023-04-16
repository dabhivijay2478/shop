import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Checkout.css";
import Quiz from "./Quiz";

const Checkout = (props) => {
  const [quiz, setQuiz] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [count, setCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // initialize state variable

  let discountPercent;
  if (count === 1) {
    discountPercent = 2;
  } else if (count === 2) {
    discountPercent = 3;
  } else if (count >= 3) {
    discountPercent = 5;
  } else {
    discountPercent = 0;
  }
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
    setIsSubmitted(true);
    setIsButtonDisabled(true);
  }

  const { cart, orders, addItemToOrderList, clearCart } =
    useContext(GlobalContext);
  const { discount, extraFees, tax } = { discount: 20, extraFees: 99, tax: 5 };
  const subTotal = Math.floor(cart?.reduce((sum, curr) => sum + curr.price, 0));
  const total = Math.floor(subTotal + 99 + 5 - (subTotal + 99 + 5) * 0.2);
  const [isOrdered, setIsOrdered] = useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const handlePay = () => {
    addItemToOrderList({
      orderId: orders.length + 1,
      buyerId: 1,
      items: [...cart],
      price: total,
      address: "7 Rusk Court",
      deliveryDate: "11/28/2022",
      isDelivered: false,
    });
    clearCart();
    setIsOrdered(true);
  };

  return (
    <>
      <div className="checkout-container">
        {isOrdered ? (
          <h3>
            Yay! 🚀 Order placed successfully. <Link to="/">Shop more!</Link>
          </h3>
        ) : (
          <>
            <div>
              <div className="custom-row">
                <h4>Order Review</h4>
                <span>{cart?.length} items in cart</span>
              </div>
              <div className="custom-row">
                <h4>Coupons</h4>
                <span>Not Available</span>
              </div>
              <div className="custom-row">
                <h4>Checkout Summary</h4>
                <div className="checkout-summary">
                  <span>Subtotal</span>
                  <span>${subTotal}</span>
                </div>
                <div className="checkout-summary">
                  <span>Discount</span>
                  <span>{discount}%</span>
                </div>
                <div className="checkout-summary">
                  <span>Extra Fee</span>
                  <span>${extraFees}</span>
                </div>
                <div className="checkout-summary">
                  <span>Tax</span>
                  <span>${tax}</span>
                </div>
              </div>
              <div className="custom-row">
                <h4>Total</h4>
                <span>${total}</span>
              </div>
            </div>

            <button className="item-btn" onClick={handlePay}>
              Pay ${total - discountPercent}
            </button>
            <button
              className="bg-pink-500 mt-5 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Open For Quiz
            </button>
          </>
        )}
      </div>

      <div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Attempt Quiz</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        Close
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
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
                                      onChange={(event) =>
                                        handleAnswer(index, event)
                                      }
                                      disabled={isSubmitted}
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => checkAnswer(index)}
                                disabled={isButtonDisabled}
                              >
                                Check Answer
                              </button>
                            </>
                          </form>
                        ))}
                      </div>
                    </>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Checkout;
