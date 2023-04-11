import FontPicker from "@/components/FontPicker";
import ThemeToggle from "@/components/ThemeToggle";
import { classNames } from "@/context/StateContext";
import {
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [word, setWord] = useState("keyboard");
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDefinition();
  }, []);

  const getDefinition = async () => {
    if (word.trim() === "") {
      setError("Whoops, can't be empty...");
    } else {
      await axios
        .get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word
            .trim()
            .toLowerCase()}`
        )
        .then(function (response) {
          // handle success
          setError(null);
          setDefinition(response.data[0]);
        })
        .catch(function (err) {
          // handle error
          setDefinition(null);
          setError(err.response.data);
        })
        .finally(function () {
          // always executed
        });
    }
  };
  return (
    <main className="container">
      <div className="container__sub">
        <div className="header">
          <BookOpenIcon className="h-6 w-6 md:h-10 md:w-10 text-neutral-700 transition-colors duration-200 ease-in" />
          <FontPicker />
          <ThemeToggle />
        </div>
        <div>
          <div className="container__input">
            <input
              type="text"
              name="search"
              id="search"
              className={classNames(
                "input",
                typeof error === "string" ? "ring-1 ring-accent-secondary" : ""
              )}
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Search for any word..."
            />
            <button
              type="button"
              className="absolute py-2 rounded-full group right-5 px-2 focus:ring-2 focus:ring-inset focus:ring-accent-primary"
              onClick={() => getDefinition()}
            >
              <span className="sr-only">Search Word</span>
              <MagnifyingGlassIcon className="h-6 w-6 text-accent-primary/80 group-hover:text-accent-primary transition-colors duration-200 ease-in" />
            </button>
          </div>
          {error && typeof error === "object" ? (
            <div className="container__notfound">
              <p className="text-6xl">😕</p>
              <p className="font-bold text-xl">{error.title}</p>
              <p className="text-center text-lg text-neutral-700">
                {error.message} {error.resolution}
              </p>
            </div>
          ) : (
            <p className="text-left pt-2 text-accent-secondary">{error}</p>
          )}
        </div>
        {definition ? (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <p className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-bold text-primary-500 dark:text-neutral-100 transition-colors duration-200 ease-in">
                  {definition.word}
                </p>
                <p className="text-base md:text-2xl text-accent-primary">
                  {definition.phonetic}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const { phonetics } = definition;
                  const findAudio = (arr) => {
                    let result = null;
                    for (const obj of arr) {
                      if (obj.audio !== "") {
                        result = obj;
                        break;
                      }
                    }
                    return result?.audio;
                  };

                  const audio = new Audio(findAudio(phonetics));
                  if (audio) {
                    audio.play();
                  }
                }}
              >
                <span className="sr-only">Play Word</span>
                <PlayCircleIcon className="w-16 sm:w-32 md:w-48 aspect-1 text-accent-primary" />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {definition.meanings.map((def, idx) => {
                return (
                  <div key={idx} className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <p className="italic font-bold text-base md:text-2xl text-primary-700 dark:text-neutral-100 transition-colors duration-200 ease-in">
                        {def.partOfSpeech}
                      </p>
                      <div className="flex-grow h-[1px] bg-neutral-500 dark:bg-primary-300 transition-colors duration-200 ease-in"></div>
                    </div>
                    <p className="text-neutral-700 text-sm md:text-xl font-light tracking-wider">
                      Meaning
                    </p>
                    <ul className="list-disc pl-12 flex flex-col gap-4">
                      {def.definitions.map((item, idx) => {
                        return (
                          <li key={idx} className="text-accent-primary">
                            <div className="text-primary-500 dark:text-neutral-100 transition-colors duration-200 ease-in text-xs md:text-base">
                              {item.definition}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    {def.synonyms.length > 0 && (
                      <div className="pt-8 flex flex-col md:flex-row gap-3 md:items-center">
                        <p className="text-neutral-700 text-sm md:text-xl font-light tracking-wider">
                          Synonyms
                        </p>
                        <div className="flex gap-2 items-center flex-wrap">
                          {def.synonyms.map((syn, idx) => {
                            return (
                              <p
                                key={idx}
                                className="font-bold text-accent-primary text-xs md:text-base bg-neutral-300 dark:bg-primary-700 px-4 py-2 rounded-full"
                              >
                                {syn}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex">
              <div className="flex-grow h-[1px] bg-neutral-500 dark:bg-primary-300 transition-colors duration-200 ease-in"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
              <span className="underline text-xs text-neutral-700">Source</span>
              <a
                href={definition?.sourceUrls[0]}
                className="flex gap-1 underline text-xs group text-primary-500 hover:text-primary-700 dark:text-neutral-300 dark:hover:text-neutral-100 transition-colors duration-200 ease-in"
                rel="noreferrer"
                target="_blank"
              >
                {definition?.sourceUrls[0]}
                <span>
                  <ArrowTopRightOnSquareIcon className="text-primary-500 group-hover:text-primary-700 h-4 w-4 dark:text-neutral-300 dark:group-hover:text-neutral-100 transition-colors duration-200 ease-in" />
                </span>
                <span className="sr-only">Choose Font</span>
              </a>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
