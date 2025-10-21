import React, { useState } from "react";

const App = () => {
  const [grid, setGrid] = useState(4);
  const [card, setCard] = useState([]);
  const [flipped, setflipped] = useState([]);
  const [solved, setsolved] = useState([]);
  const [disable, setdisable] = useState(false);
  const [won, setwon] = useState(false);

  const gridchange = (e) => {
    const size = parseInt(e.target.value);
    if (size <= 10 && size >= 2) setGrid(size);
  };

  const gen = () => {
    const total = grid * grid;
    const pairs = Math.floor(card / 2);
    const num = [...Array(pairs).keys()].map((n) => n++);
    const suffle = [...num, ...num].sort(() => Math.random() - 0.5);
  };

  return (
    <div className="flex w-full h-screen flex-col gap-6 justify-center items-center ">
      <h1 className="text-4xl">Memory Game</h1>
      {/* INPUT */}
      <div className="flex justify-center items-center flex-col text-3xl">
        <label htmlFor="grid">Enter the grid size Max:(10)</label>
        <input
          id="grid"
          type="number"
          value={grid}
          onChange={gridchange}
          className="w-16"
        />
      </div>

      {/* Game */}
      <div>
        <div></div>
        <div></div>
      </div>

      {/* WIn pop up */}

      {/* Reset */}
    </div>
  );
};

export default App;
