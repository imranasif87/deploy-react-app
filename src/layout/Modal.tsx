import React, { FunctionComponent, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@mui/material";
import "./css/Modal.css";

interface Props {
  isOpen: boolean;
  formId?: string;
  onPositive?: (value: any) => void;
  onNegative?: (value: any) => void;
  modalHeadLine?: string;
  positiveBtn?: string;
  negativeBtn?: string;
  children?: ReactNode;
}

const Modal: FunctionComponent<Props> = (props) => {
  const {
    isOpen,
    formId,
    onPositive,
    onNegative,
    modalHeadLine = "Varsel!",
    positiveBtn = "Godkjenn",
    negativeBtn = "Avbryt",
    children,
  } = props;

  if (!isOpen) return null;
  return createPortal(
    <>
      <div className="modal-overlay" onClick={onNegative}></div>
      <div className="modal">
        <h1>{modalHeadLine}</h1>
        <div className="modal__content">
          <div className="modal__children">{children}</div>
          <div className="modal_children-btns">
            {(typeof onPositive === "function" || formId) && (
              <Button
                type="submit"
                form={formId}
                variant="contained"
                sx={{ ":hover": { backgroundColor: "#369E3B" }, margin: 1 }}
              >
                {positiveBtn}
              </Button>
            )}

            {typeof onNegative === "function" && (
              <Button
                type="button"
                variant="contained"
                onClick={onNegative}
                sx={{ ":hover": { backgroundColor: "#369E3B" }, margin: 1 }}
              >
                {negativeBtn}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")!
  );
};

export default Modal;
