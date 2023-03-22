import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import confetti from "canvas-confetti";

// import amazon from "../../public/letters/amazon.md";

const inter = Inter({ subsets: ["latin"] });

import { companies } from "@/static/companies.js";
import { useEffect, useState } from "react";

import { layoffLetters } from "@/static/letters.js";

export default function Home() {
  const [randNum, setRandNum] = useState(0);

  const [splitLetters, setSplitLetters] = useState([]);

  const [letter, setLetter] = useState("");

  const [currLine, setCurrLine] = useState(0);
  const [stillLinesLeft, setLinesLeft] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandNum(Math.floor(Math.random() * companies.length));
    }, 3000);

    const newLetters = [];
    for (let currLetter of layoffLetters) {
      const splitLetter = currLetter.split(".");
      newLetters.push(splitLetter);
    }
    setSplitLetters(newLetters);
    return () => clearInterval(interval);
  }, []);

  function addLetter() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    const stillLinesLeft = splitLetters.some(
      (letter) => currLine < letter.length
    );
    if (stillLinesLeft) {
      let randNum = Math.floor(Math.random() * splitLetters.length);
      while (currLine >= splitLetters[randNum].length) {
        randNum = Math.floor(Math.random() * splitLetters.length);
      }

      setLetter((letter) =>
        (letter + splitLetters[randNum][currLine] + ".\n").trim()
      );
      setCurrLine(currLine + 1);
    } else {
      setLinesLeft(false);
    }
  }
  return (
    <>
      <Head>
        <title>YOU JUST GOT LAID OFF!!!!!!</title>
        <meta name="description" content="WAKE UP SHITS DYING" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sadclown.png" />
      </Head>

      <div className={styles.container}>
        <h1 className={styles.header}>
          your company, {companies[randNum]} is laying you off
        </h1>
        <p className={styles.letter}>{letter}</p>

        {stillLinesLeft ? (
          <button className={styles.button} onClick={() => addLetter()}>
            HUHHH, WHAT DO I DO NOW?
          </button>
        ) : (
          <>FIND A NEW JOB BINCH</>
        )}
      </div>
    </>
  );
}
