"use client"
import "./modal.css"
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Function;
  onOpen?: Function;
  onClose?: Function;
};

export const Modal = (props: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null)

  const closeModal = () => {
    if (props.onClose) props.onClose();
    setIsClosing(true);
    setTimeout(() => {
      props.setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (props.onOpen) props.onOpen();
  }, []);

  useEffect(() => {
    if (!modalRef.current) return
    const closeButton = modalRef.current.querySelector("#close-button") as HTMLButtonElement
    if (!closeButton) return
    closeButton.onclick = closeModal
  }, [props.children])

  return (
    props.isOpen && (
      <div
      ref={modalRef}
        onClick={closeModal}
        className={`${
          isClosing && "modal-container-vanish backdrop-blur-none"
        } modal`}
      >
        <article
          onClick={(e) => e.stopPropagation()}
          className={`${
            isClosing ? "modal-shrink" : "modal-grow"
          } modal-children`}
        >
          {props.children}
        </article>
      </div>
    )
  );
};
