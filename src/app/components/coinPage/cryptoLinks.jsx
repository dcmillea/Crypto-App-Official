"use client";

import { React } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const CryptoLinks = ({ arrOfLinks }) => {
  const copyUrlToClipboard = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("url copied to clipboard", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((e) => {
        /* eslint-disable no-console */
        console.log(e);
      });
  };

  return (
    <div className="h-full w-10/12">
      <div className="flex h-full items-center justify-center">
        <ul className="flex h-full w-full flex-col items-center justify-between">
          {arrOfLinks.map((el) => (
            <li
              key={el}
              className="flex w-full items-center justify-center overflow-hidden rounded-md bg-white p-4 dark:bg-primary-purple"
            >
              <div className="mr-4 cursor-pointer">
                <div className="hidden dark:block">
                  <Link target="_blank" href={el}>
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5375 9.11621C13.4125 10.9912 13.4125 14.0245 11.5375 15.8912C9.6625 17.7579 6.62917 17.7662 4.7625 15.8912C2.89584 14.0162 2.8875 10.9829 4.7625 9.11621"
                        stroke="white"
                        // style="stroke:white;stroke-opacity:1;"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.47812 11.1754C7.52812 9.22539 7.52812 6.05873 9.47812 4.10039C11.4281 2.14206 14.5948 2.15039 16.5531 4.10039C18.5115 6.05039 18.5031 9.21706 16.5531 11.1754"
                        stroke="white"
                        // style="stroke:white;stroke-opacity:1;"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="block dark:hidden">
                  <Link target="_blank" href={el}>
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5375 9.11621C13.4125 10.9912 13.4125 14.0245 11.5375 15.8912C9.6625 17.7579 6.62917 17.7662 4.7625 15.8912C2.89584 14.0162 2.8875 10.9829 4.7625 9.11621"
                        stroke="#353570"
                        // style="stroke:white;stroke-opacity:1;"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.47812 11.1754C7.52812 9.22539 7.52812 6.05873 9.47812 4.10039C11.4281 2.14206 14.5948 2.15039 16.5531 4.10039C18.5115 6.05039 18.5031 9.21706 16.5531 11.1754"
                        stroke="#353570"
                        // style="stroke:white;stroke-opacity:1;"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
              <Link href={el} target="_blank">
                {el}
              </Link>
              <div
                onClick={() => copyUrlToClipboard(el)}
                className="ml-4 cursor-pointer"
              >
                <div className="hidden dark:block">
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.987 10.7503V14.2503C13.987 17.167 12.8203 18.3337 9.90365 18.3337H6.40365C3.48698 18.3337 2.32031 17.167 2.32031 14.2503V10.7503C2.32031 7.83366 3.48698 6.66699 6.40365 6.66699H9.90365C12.8203 6.66699 13.987 7.83366 13.987 10.7503Z"
                      stroke="white"
                      //   style="stroke:white;stroke-opacity:1;"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.987 5.75033V9.25033C18.987 12.167 17.8203 13.3337 14.9036 13.3337H13.987V10.7503C13.987 7.83366 12.8203 6.66699 9.90365 6.66699H7.32031V5.75033C7.32031 2.83366 8.48698 1.66699 11.4036 1.66699H14.9036C17.8203 1.66699 18.987 2.83366 18.987 5.75033Z"
                      stroke="white"
                      //   style="stroke:white;stroke-opacity:1;"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="block dark:hidden">
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.987 10.7503V14.2503C13.987 17.167 12.8203 18.3337 9.90365 18.3337H6.40365C3.48698 18.3337 2.32031 17.167 2.32031 14.2503V10.7503C2.32031 7.83366 3.48698 6.66699 6.40365 6.66699H9.90365C12.8203 6.66699 13.987 7.83366 13.987 10.7503Z"
                      stroke="#353570"
                      //   style="stroke:white;stroke-opacity:1;"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.987 5.75033V9.25033C18.987 12.167 17.8203 13.3337 14.9036 13.3337H13.987V10.7503C13.987 7.83366 12.8203 6.66699 9.90365 6.66699H7.32031V5.75033C7.32031 2.83366 8.48698 1.66699 11.4036 1.66699H14.9036C17.8203 1.66699 18.987 2.83366 18.987 5.75033Z"
                      stroke="#353570"
                      //   style="stroke:white;stroke-opacity:1;"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CryptoLinks;
