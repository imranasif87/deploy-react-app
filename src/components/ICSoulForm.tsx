import React, { FunctionComponent, useState } from "react";
import { Button } from "@mui/material";
import "./css/ICForm.css";
import PhoneInput from "./PhoneInput";

interface FormData {
  firstName: string;
  lastName: string;
  origin: string;
  destination: string;
  departureTime: string;
  airline: string;
}

interface Props {
  isEdit?: boolean;
  isDisabled?: boolean;
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    regexRemove?: RegExp
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ICSoulForm: FunctionComponent<Props> = (props) => {
  const {
    isEdit = false,
    isDisabled = false,
    formData,
    onChange,
    onSubmit,
  } = props;
  const { firstName, lastName, origin, destination, departureTime, airline } =
    formData;
  const formId = isEdit ? "ic-form__soul-edit" : "ic-form__soul";

  return (
    <div className="ic-form-container">
      <div>
        <label className="ic-form-label">Passasjer(er)</label>
      </div>
      <form
        className="ic-form"
        id={formId}
        name="ic-soul-form"
        onSubmit={onSubmit}
      >
        <div className="ic-form__input-container">
          <div>
            <label htmlFor="ic-soul-firstName">Fornavn</label>
            <br />
            <input
              className="input-form"
              id="ic-soul-firstName"
              name="ic-soul-firstName"
              type="text"
              placeholder="Fornavn"
              value={firstName}
              onChange={(e) => onChange(e)}
              disabled={isDisabled}
              pattern="^([\p{L}\p{P}\d+](\s)?){2,31}$"
              maxLength={31}
              required
            />
            <div></div>
          </div>
          <div>
            <label htmlFor="ic-soul-lastName">Etternavn</label>
            <br />
            <input
              className="input-form"
              id="ic-soul-lastName"
              name="ic-soul-lastName"
              type="text"
              placeholder="Etternavn"
              value={lastName}
              onChange={onChange}
              disabled={isDisabled}
              pattern="^([\p{L}\p{P}\d+](\s)?){2,31}$"
              maxLength={31}
              required
            />
            <div />
          </div>
          <div>
            <label htmlFor="ic-soul-origin">Avgang fra</label>
            <br />
            <input
              className="input-form"
              id="ic-soul-origin"
              name="ic-soul-origin"
              type="text"
              placeholder="Avgang fra"
              value={origin}
              onChange={onChange}
              disabled={isDisabled}
              pattern="^([\p{L}\p{P}\d+](\s)?){2,31}$"
              maxLength={31}
              required
            />
            <div />
          </div>
          <div>
            <label htmlFor="ic-soul-destination">Ankomst til</label>
            <br />
            <input
              className="input-form"
              id="ic-soul-destination"
              name="ic-soul-destination"
              type="text"
              placeholder="Ankomst til"
              value={destination}
              onChange={onChange}
              disabled={isDisabled}
              pattern="^([\p{L}\p{P}\d+](\s)?){2,31}$"
              maxLength={31}
              required
            />
            <div />
          </div>
          <div>
            <label htmlFor="ic-soul-departureTime">Avgangstid</label>
            <br />
            <input
              className="input-dateTime"
              id="ic-soul-departureTime"
              name="ic-soul-departureTime"
              type="datetime-local"
              placeholder="Avgangstid"
              value={departureTime}
              onChange={onChange}
              disabled={isDisabled}
              min="2017-06-01T08:30"
              required
            />
            <div />
          </div>
          <div>
            <label htmlFor="ic-soul-airline">Selskap</label>
            <br />
            <input
              className="input-form"
              id="ic-soul-airline"
              name="ic-soul-airline"
              type="text"
              placeholder="Selskap"
              value={airline}
              onChange={onChange}
              disabled={isDisabled}
              pattern="^([\p{L}\p{P}\d+](\s)?){2,31}$"
              maxLength={31}
            />
            <div />
          </div>
        </div>
        <div className="ic-form__btn-container">
          {!isEdit && (
            <Button
              type="submit"
              variant="contained"
              sx={{ ":hover": { backgroundColor: "#369E3B" }, margin: 1 }}
              disabled={isDisabled}
            >
              Legg til
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ICSoulForm;
