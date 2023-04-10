import { classNames, useStateContext } from "@/context/StateContext";

const Layout = ({ children }) => {
  const { font } = useStateContext();
  return (
    <div
      className={classNames(
        "bg-neutral-100 dark:bg-primary-900 transition-colors duration-200 ease-in",
        font.class
      )}
    >
      {children}
    </div>
  );
};

export default Layout;
