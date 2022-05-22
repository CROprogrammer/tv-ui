import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";

import cx from "classnames";

import Button from "./Button";
import { useHistory } from "react-router-dom";
import { isUserLoggedIn } from "../utils/userLoggedIn";

type HeaderProps = {} & DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function Header({ className, ...props }: HeaderProps) {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(
    localStorage.getItem("jwt") != null
  );
  const history = useHistory();

  useEffect(() => {
    if (isUserLoggedIn()) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [isUserLoggedIn, setUserLoggedIn, localStorage.getItem("jwt")]);

  const onClickHome = () => {
    history.push("/");
  };

  const onClickRegister = () => {
    history.push("/register");
  };

  const onClickLogin = () => {
    history.push("/login");
  };

  const onClickLogout = async () => {
    localStorage.removeItem("jwt");
    history.push("/");
  };

  const onClickShowAllChannels = async () => {
    history.push("/channels");
  };

  const onClickShowAllCategories = async () => {
    history.push("/categories");
  };

  const headerClassName = cx(
    className,
    "h-2/6 w-full p-3 bg-sky-500 text-white drop-shadow-md"
  );

  return (
    <div className={headerClassName} {...props}>
      <div className="flex flex-row align-center">
        <div
          className="w-2/3 self-center font-bold cursor-pointer"
          onClick={onClickHome}
        >
          INFSUS Projekt - TV
        </div>
        <div className="flex flex-row justify-end w-1/3 font-semibold">
          {!userLoggedIn ? (
            <div className="flex flex-row">
              <Button onClick={onClickRegister}>Registracija</Button>
              <Button onClick={onClickLogin}>Prijava</Button>
            </div>
          ) : (
            <div className="flex flex-row">
              <Button onClick={onClickShowAllChannels}>Kanali</Button>
              <Button onClick={onClickShowAllCategories}>Kategorije</Button>
              <Button onClick={onClickLogout}>Odjava</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
