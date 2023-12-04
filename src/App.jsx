import React from "react";
import "./index.css";
import Die from "./Die.jsx";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [tenzies, setTenzies] = React.useState(false);
  const [dice, setDice] = React.useState(allNewDice);

  React.useEffect(() => {
    const n = dice[0].value;
    for (let i = 0; i < dice.length; i++) {
      if (dice[i].value != n || !dice[i].isHeld) {
        return;
      }
    }
    setTenzies(true);
    console.log("You won!");
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    var arr = [];
    for (let i = 0; i < 10; i++) {
      let randomNum = Math.floor(Math.random() * 6) + 1;
      arr.push(generateNewDie());
    }
    setTenzies(false);
    return arr;
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  }

  function holdDice(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id == id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const diceElements = dice.map((num) => {
    return (
      <Die
        key={num.id}
        value={num.value}
        isHeld={num.isHeld}
        hold={() => holdDice(num.id)}
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button
        onClick={tenzies ? () => setDice(allNewDice()) : rollDice}
        className="roll-dice"
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
