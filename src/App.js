import "./App.css";
import { useEffect, useState } from "react";
import { ReactComponent as CrossIcon } from "./images/cross.svg";
import { ReactComponent as ZeroIcon } from "./images/o.svg";
import { ReactComponent as ResetIcon } from "./images/reset.svg";
import clickSound from "./sounds/click.mp3";

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
};

const App = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([]);
    const [xWin, setXWin] = useState(0);
    const [oWin, setOWin] = useState(0);
    const clickAudio = new Audio(clickSound);

    const handleClick = (index) => {
        const newSquares = squares.slice();
        clickAudio.play();
        if (squares[index] && history[0] !== index) return;
        if (history.length >= 6) {
            let pop = history[0];
            history.shift();
            newSquares[pop] = null;
        }
        newSquares[index] = xIsNext ? "X" : "O";
        let current = calculateWinner(newSquares);

        if (current) {
            if (xIsNext) {
                setXWin(xWin + 1);
            } else {
                setOWin(oWin + 1);
            }
            setSquares(Array(9).fill(null));
            setXIsNext(true);
            setHistory([]);
            return
        }
        
        setSquares(newSquares);
        setXIsNext(!xIsNext);
        setHistory([...history, index]);
    };
    const getBorderClass = (index) => {
        let classes =
            "border-lime-100 shadow-[0_0_0.2rem_#fff,0_0_0.2rem_#fff,0_0_2rem_#bc13fe,0_0_0.8rem_#bc13fe,inset_0_0_0.1rem_#bc13fe]";
        // Apply borders to create the cross
        if (index === 0 || index === 1 || index === 2)
            classes +=
                " border-b-2 shadow-[0.1rem_0_0.1rem_#fff, 0_0_0.8rem_#bc13fe inset_0_0_0.1rem_#bc13fe]"; // Bottom border for top row
        if (index === 0 || index === 3 || index === 6)
            classes +=
                " border-r-2 shadow-[0.1rem_0_0.1rem_#fff], 0_0_0.8rem_#bc13fe"; // Right border for left column
        if (index === 1 || index === 4 || index === 7)
            classes +=
                " border-r-2 shadow-[0.1rem_0_0.1rem_#fff], 0_0_0.8rem_#bc13fe"; // Right border for middle column
        if (index === 3 || index === 4 || index === 5)
            classes +=
                " border-b-2 shadow-[0.1rem_0_0.1rem_#fff], 0_0_0.8rem_#bc13fe"; // Bottom border for middle row
        return classes;
    };

    // useEffect(()=>{console.log(xWin)}, [xWin, oWin])

    return (
        <div className="flex flex-col items-center text-white justify-center bg-black h-screen align-baseline gap-10 ">
            <div className="flex justify-around w-6/12">
                <div>
                    <CrossIcon className="h-10 w-10" />
                    <p>{`${xWin} Wins`}</p>
                </div>
                <button
                    className="mb-4 px-4 py-2 bg-gray-700 text-white rounded"
                    onClick={() => {
                        setSquares(Array(9).fill(null));
                        setXIsNext(true);
                        setHistory([]);
                        setXWin(0);
                        setOWin(0);
                    }}
                >
                    <ResetIcon className="h-10 w-10 bg-transparent" />
                </button>
                <div>
                    <ZeroIcon className="h-10 w-10" />
                    <p>{`${oWin} Wins`}</p>
                </div>
            </div>
            <div className="flex flex-col">
                {/* <h2 className="mb-4">{status}</h2> */}
                <div className="grid grid-cols-3 w-fit">
                    {squares.map((square, index) => (
                        <button
                            key={index}
                            className={`p-5 w-28 h-28 bg-transparent
                             text-white text-5xl font-bold flex items-center justify-center ${getBorderClass(
                                 index
                             )}`}
                            onClick={() => handleClick(index)}
                        >
                            {square &&
                                (square === "X" ? (
                                    <CrossIcon
                                        className={` ${
                                            history.length >= 6 &&
                                            index === history[0]
                                                ? "animate-pulse"
                                                : ""
                                        }`}
                                    />
                                ) : (
                                    <ZeroIcon
                                        className={`drop-shadow-[0_1rem_1rem_rgba(255,0,0,0.25)] ${
                                            history.length >= 6 &&
                                            index === history[0]
                                                ? "animate-pulse"
                                                : ""
                                        }`}
                                    />
                                ))}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
