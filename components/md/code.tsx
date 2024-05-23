"use client";

import React, { ElementRef, useRef, useState } from "react";

import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

const Code = (props: React.ComponentPropsWithoutRef<"figure">) => {
  const figureRef = useRef<ElementRef<"figure">>(null);
  const [copied, setCopied] = useState(false);
  let title: string = "";

  if (Array.isArray(props.children)) {
    for (let child of props.children) {
      if (React.isValidElement(child) && child.type === "figcaption") {
        const element = child as React.ReactElement;
        title = element.props.children;
        break;
      }
    }
  }
  const onCopy = (): void => {
    setCopied(true);

    if (figureRef.current) {
      const textContent = figureRef.current.textContent ?? "";
      const textWithoutTitle = textContent.replace(title, "");
      navigator.clipboard.writeText(textWithoutTitle);
    }

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <figure ref={figureRef} {...props} className="rounded-b-lg relative">
      {props.children}

      <button
        className="absolute right-4 top-4 z-10 text-white bg-gray-800 rounded-full p-1 transition-all hover:bg-gray-900"
        onClick={onCopy}
      >
        {copied ? (
          <CheckIcon stroke="#8e8" width="18px" height="18px" />
        ) : (
          <CopyIcon fill="#fff" width="18px" height="18px" />
        )}
      </button>
    </figure>
  );
};

export default Code;
