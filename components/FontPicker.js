import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames, useStateContext } from "@/context/StateContext";

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

const FontPicker = () => {
  const { font, setFont } = useStateContext();
  return (
    <Listbox value={font} onChange={setFont}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">
            Change published status
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button className="inline-flex items-center rounded-md bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-gray-50">
              <span className="sr-only">Change published status</span>
              <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-transparent px-3 py-2 text-primary-700 dark:text-neutral-100">
                <p className={`text-sm font-semibold ${font.class}`}>
                  {font.title}
                </p>
              </div>
              <ChevronDownIcon
                className="h-5 w-5 text-primary-700 dark:text-neutral-100"
                aria-hidden="true"
              />
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute -right-24 md:right-0 z-10 mt-2 w-72 origin-top-right overflow-hidden rounded-md bg-neutral-100 dark:bg-primary-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {fontOptions.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "bg-neutral-500 dark:bg-primary-500 text-primary-700 dark:text-white"
                          : "text-primary-500 dark:text-neutral-500",
                        "cursor-default select-none p-4 text-sm"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected
                                ? `font-semibold ${option.class}`
                                : `font-normal ${option.class}`
                            }
                          >
                            {option.title}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? "text-white" : "text-accent-primary"
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default FontPicker;
