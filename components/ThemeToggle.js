import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ThemeToggle = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className="relative rounded-md p-4 h-6 w-6 md:h-10 md:w-10"
    >
      <MoonIcon className="absolute -translate-y-[50%] -translate-x-[50%] h-6 w-6 md:h-10 md:w-10 scale-100 opacity-100 rotate-0 dark:scale-0 dark:opacity-0 dark:rotate-180 text-neutral-700 transition transform duration-200 ease-in" />
      <SunIcon className="absolute -translate-y-[50%] -translate-x-[50%] h-6 w-6 md:h-10 md:w-10 dark:scale-100 dark:opacity-100 dark:rotate-0 scale-0 opacity-0 rotate-180 text-accent-primary transition duration-200 ease-in" />
    </button>
  );
};

export default ThemeToggle;
