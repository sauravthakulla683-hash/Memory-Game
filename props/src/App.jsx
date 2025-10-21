import React, { useState, useEffect } from "react";
import "./App.css"; // we'll put custom flip styles here

const App = () => {
  const [grid, setGrid] = useState(0);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disable, setDisable] = useState(false);
  const [won, setWon] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const colors = [
    "bg-red-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-pink-400",
    "bg-purple-400",
    "bg-orange-400",
    "bg-indigo-400",
    "bg-teal-400",
    "bg-cyan-400",
  ];

  const gridChange = (e) => setGrid(Number(e.target.value));

  const gen = () => {
    const size = parseInt(grid);
    if (!size || size < 2 || size > 6) {
      setCards([]);
      setFlipped([]);
      setSolved([]);
      setWon(false);
      setDisable(false);
      setAttempt(0);
      return;
    }

    const total = size * size;
    const pairs = Math.floor(total / 2);
    const nums = [...Array(pairs).keys()];
    const shuffled = [...nums, ...nums]
      .sort(() => Math.random() - 0.5)
      .slice(0, total)
      .map((num, idx) => ({
        id: idx,
        number: num,
        color: colors[num % colors.length],
      }));

    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
    setWon(false);
    setDisable(false);
    setAttempt(0);
  };

  useEffect(() => {
    gen();
  }, [grid]);

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);

  const handleClick = (id) => {
    if (disable || flipped.includes(id) || solved.includes(id)) return;

    setAttempt(attempt + 1);

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisable(true);
      const [first, second] = newFlipped;

      if (cards[first].number === cards[second].number) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        setDisable(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisable(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 font-poppins">
      <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 animate-pulse">
        Memory Game
      </h1>

      {/* Input */}
      <div className="flex flex-col items-center text-xl gap-2 mb-6">
        <label htmlFor="grid" className="font-semibold text-gray-700">
          Enter grid size (2-6)
        </label>
        <input
          id="grid"
          type="number"
          value={grid}
          onChange={gridChange}
          min={2}
          max={6}
          className="w-20 p-2 text-center border-4 border-purple-400 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
        />
      </div>

      {/* Game Grid */}
      {grid >= 2 && grid <= 6 && (
        <div
          className="grid gap-4 mb-6"
          style={{
            gridTemplateColumns: `repeat(${grid}, minmax(60px, 1fr))`,
            width: `min(100%, ${grid * 6}rem)`,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className={`flip-card`}
              onClick={() => handleClick(card.id)}
            >
              <div
                className={`flip-card-inner ${
                  isFlipped(card.id) ? "flipped" : ""
                }`}
              >
                {/* Front: ? (face down) */}
                <div className="flip-card-front flex justify-center items-center text-3xl font-bold rounded-lg shadow-lg bg-gray-400">
                  ❓
                </div>

                {/* Back: number (face up) */}
                <div
                  className={`flip-card-back ${card.color} flex justify-center items-center text-3xl font-bold rounded-lg shadow-lg`}
                >
                  {card.number}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Attempts: {attempt}
      </h2>
      {won && (
        <h2 className="text-3xl font-bold text-green-600 mb-4 animate-bounce">
          🎉 You Won! Total Attempts = {attempt} 🎉
        </h2>
      )}

      <button
        onClick={gen}
        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
      >
        🔄 Reset Game
      </button>
    </div>
  );
};

export default App;
