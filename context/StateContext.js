import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

const fontOptions = [
  {
    title: "Sans",
    class: "font-inter",
  },
  {
    title: "Sans Serif",
    class: "font-lora",
  },
  {
    title: "Monospace",
    class: "font-inconsolata",
  },
];

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const StateContext = ({ children }) => {
  const [font, setFont] = useState(fontOptions[0]);
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);
  const [enabled, setEnabled] = useState(false);

  return (
    <Context.Provider
      value={{
        font,
        setFont,
        word,
        definition,
        error,
        setWord,
        setDefinition,
        setError,
        enabled,
        setEnabled,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
