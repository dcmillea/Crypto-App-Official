"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import sunImage from "../../images/sunny.png";
import moonImage from "../../images/moon.png";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const [islight, setIsLight] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleClick = () => {
    setTheme(islight ? "dark" : "light");
    setIsLight(!islight);
  };

  return (
    <div className="mr-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-border-small border-light-purple bg-darker-white-40 dark:bg-purple-muted">
      <div className="flex h-7 w-7 items-center justify-center">
        <Image
          className="hidden dark:block"
          src={sunImage}
          width={0}
          height={0}
          alt="themeSwitchLogo"
          style={{
            width: "100%",
            height: "100%",
          }}
          onClick={handleClick}
        />
        <Image
          className="block dark:hidden"
          src={moonImage}
          width={0}
          height={0}
          alt="themeSwitchLogo"
          style={{
            width: "100%",
            height: "100%",
          }}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
