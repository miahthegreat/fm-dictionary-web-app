import FontPicker from "@/components/FontPicker";
import ThemeToggle from "@/components/ThemeToggle";
import { classNames } from "@/context/StateContext";
import {
  MagnifyingGlassIcon,
  MoonIcon,
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
    <main className="flex flex-col mx-auto w-full max-w-7xl min-h-screen p-6 sm:p-12 md:p-24 lg:p-48">
      <div className="flex flex-col w-full gap-8">
        <div className="flex justify-between w-full px-6">
          <div>
            <BookOpenIcon className="h-10 w-10 text-neutral-700 transition-colors duration-200 ease-in" />
          </div>
          <div className="flex gap-3 items-center">
            <FontPicker />
            <div className="w-[1px] h-full bg-neutral-500 dark:bg-primary-500 transition-colors duration-200 ease-in" />
            <div className="flex gap-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
        <div>
          <div className="relative flex items-center">
            <input
              type="text"
              name="search"
              id="search"
              className={classNames(
                "block font-bold text-xl w-full placeholder:text-neutral-700 dark:placeholder:text-primary-300 bg-neutral-500 dark:bg-primary-700 rounded-2xl border-0 py-6 pr-14 pl-5 text-primary-900 dark:text-neutral-100 focus:ring-2 focus:ring-inset focus:ring-accent-primary transition-colors duration-200 ease-in",
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
              <MagnifyingGlassIcon className="h-6 w-6 text-accent-primary/80 group-hover:text-accent-primary transition-colors duration-200 ease-in" />
            </button>
          </div>
          {error && typeof error === "object" ? (
            <div className="flex flex-col gap-8 items-center content-center pt-16 justify-center">
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
                <p className="text-[64px] font-bold text-primary-500 dark:text-neutral-100 transition-colors duration-200 ease-in">
                  {definition.word}
                </p>
                <p className="text-[24px] text-accent-primary">
                  {definition.phonetic}
                </p>
              </div>
              <button type="button" onClick={() => {}}>
                <PlayCircleIcon className="h-32 w-32 text-accent-primary" />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {definition.meanings.map((def, idx) => {
                return (
                  <div key={idx} className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <p className="italic font-bold text-2xl text-primary-700 dark:text-neutral-100 transition-colors duration-200 ease-in">
                        {def.partOfSpeech}
                      </p>
                      <div className="flex-grow h-[1px] bg-neutral-500 dark:bg-primary-300 transition-colors duration-200 ease-in"></div>
                    </div>
                    <p className="text-neutral-700 text-xl font-light tracking-wider">
                      Meaning
                    </p>
                    <ul className="list-disc pl-12 flex flex-col gap-4">
                      {def.definitions.map((item, idx) => {
                        return (
                          <li key={idx} className="text-accent-primary">
                            <div className="text-primary-500 dark:text-neutral-100 transition-colors duration-200 ease-in">
                              {item.definition}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    {def.synonyms.length > 0 && (
                      <div className="pt-8 flex gap-3 items-center">
                        <p className="text-neutral-700 text-xl font-light tracking-wider">
                          Synonyms
                        </p>
                        <div>
                          {def.synonyms.map((syn) => {
                            return (
                              <p className="font-bold text-accent-primary">
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
            <div className="flex gap-3">
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
