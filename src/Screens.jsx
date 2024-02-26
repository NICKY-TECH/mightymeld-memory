import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";
import sound from "./resources/turn.mp3";
import Toggle from "./Toggle";
import useSound from "use-sound";
import { gridState } from "./features/grid";
import okay from "./resources/images/okay.png";
import good from "./resources/images/verygood.jpg";
import sherlock from "./resources/images/sherlock1.png";
import level, { levelState } from "./features/level";
import { useSelector, useDispatch } from "react-redux";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start, theme, toggleTheme }) {
  return (
    <div className="start h-screen w-screen relative">
      <Toggle theme={theme} toggleTheme={toggleTheme} />
      <div className="w-full h-full flex justify-center itens-center [356px]:min-w-max start">
        <div className="h-[70%] w-[80%] flex flex-col items-center space-y-4 justify-center">
          <h1 className="text-3xl text-pink-400 font-bold text-center">
            Memory
          </h1>
          <p className="text-pink-400 font-medium">
            Flip over tiles looking for pairs
          </p>
          <button
            onClick={start}
            className="bg-pink-400 text-white p-3 rounded-full text-white font-semibold w-[70%] hover:cursor-pointer"
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

export function PlayScreen({ end, theme, toggleTheme }) {
  const [tiles, setTiles] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const gridTotal = useSelector((state) => state.grid.value);
  console.log("grid");
  console.log(gridTotal);
  const currentLevel = useSelector((state) => state.level.value);
  const [playSound] = useSound(sound);
  const [tryCount, setTryCount] = useState(0);

  function removeOverlay() {
    setShow(false);
    setTimeout(() => {
      setTimeout(end, 0);
    }, 2000);
  }

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti({
          ticks: 100,
        });
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            dispatch(levelState(currentLevel + 1));
            setShow(true);
          }
          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };
  return (
    <>
      <div className="play relative">
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <div
          className={
            show === false
              ? "hidden absolute w-full h-[80%] bg-[rgba(0,0,0,0.5)] top-[80px]"
              : "absolute w-full h-[80%] bg-[rgba(0,0,0,0.5)] top-[80px] flex flex-col space-y-6"
          }
        >
          <div className="flex justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fff"
              class="w-6 h-6 hover:cursor-pointer"
              onClick={removeOverlay}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex justify-center">
            <p className="text-white text-2xl">
              You had a total of {tryCount} trials !
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4 max-[659px]:flex-col max-[659px]:space-y-4">
            <div className="rounded-full">
              <img
                src={
                  tryCount >= 1 && tryCount < 18
                    ? sherlock
                    : tryCount >= 18 && tryCount < 25
                    ? good
                    : tryCount >= 25
                    ? okay
                    : ""
                }
                className="rounded-full w-[249px] h-[250px]"
              />
            </div>
            <p className="text-white font-semibold text-2xl">
              {tryCount >= 1 && tryCount < 18
                ? " Sherlock got nothing on you"
                : tryCount >= 18 && tryCount < 25
                ? "You did good"
                : tryCount >= 25
                ? "Okay"
                : ""}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center h-screen flex-col space-y-4  max-[356px]:min-w-max">
          <div className="flex w-full space-x-2 justify-center text-indigo-400">
            <p className="font-semibold">Tries</p>
            <p className="font-bold bg-indigo-300 rounded-lg w-[30px] h-[25px] text-center">
              {tryCount}
            </p>
          </div>

          <div className="flex justify-end  text-indigo-400 font-semibold">
            <p>
              Level:
              {currentLevel}
            </p>
          </div>

          <div className="w-[90%] grid grid-rows-[repeat(4,60px)] gap-3 bg-indigo-100 h-max place-content-center py-2 rounded-lg grid-cols-[repeat(4,70px)] max-[356px]:max-w-md  max-[356px]:grid-cols-[repeat(4,30px)] max-[356px]:grid-rows-[repeat(4,20px)] max-[356px]:w-auto max-[356px]:px-2">
            {getTiles(16).map((tile, i) => (
              <Tile key={i} flip={() => flip(i)} {...tile} play={playSound} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
