import React, { FunctionComponent, useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./css/ICForm.css";
import PhoneInput from "./PhoneInput";

interface FormData {
  firstName: string;
  lastName: string;
  relation: string;
  address: string;
  city: string;
  postNumber: string;
  phone: string;
  email: string;
  affectedOf: string;
}

interface SoulRow {
  firstName: string;
  lastName: string;
  origin: string;
  destination: string;
  departureTime: string;
  airline: string;
}

interface SoulRowWithCheckBox extends SoulRow {
  checked: boolean;
}

interface Props {
  isEdit?: boolean;
  isDisabled?: boolean;
  formData: FormData;
  soulRows: SoulRowWithCheckBox[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    regexRemove?: RegExp
  ) => void;
  onCheckbox: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ICAffectedForm: FunctionComponent<Props> = (props) => {
  const {
    isEdit = false,
    isDisabled = false,
    formData,
    soulRows,
    onChange,
    onCheckbox,
    onSubmit,
  } = props;
  const {
    firstName,
    lastName,
    relation,
    address,
    city,
    postNumber,
    phone,
    email,
    affectedOf,
  } = formData;
  const formId = isEdit ? "ic-form__affected-edit" : "ic-form__affected";

  return (
    <>
      <div className="ic-form-container">
        <div>
          <label className="ic-form-label">Pårørende</label>
        </div>
        <form
          className="ic-form"
          id={formId}
          name="ic-affected-form"
          onSubmit={onSubmit}
        >
          <div className="ic-form__input-container">
            <div>
              <label htmlFor="ic-affected-firstName">Fornavn</label>
              <br />
              <input
                className="input-form"
                id="ic-affected-firstName"
                name="ic-affected-firstName"
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
              <label htmlFor="ic-affected-lastName">Etternavn</label>
              <br />
              <input
                className="input-form"
                id="ic-affected-lastName"
                name="ic-affected-lastName"
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
              <label htmlFor="ic-affected-relation">Relasjon</label>
              <br />
              <input
                className="input-form"
                id="ic-affected-relation"
                name="ic-affected-relation"
                type="text"
                placeholder="Hen er min: ..."
                value={relation}
                onChange={onChange}
                disabled={isDisabled}
                pattern="^([\p{L}\p{P}\d+](\s)?){2,31}$"
                maxLength={31}
                required
              />
              <div />
            </div>
            <div>
              <label htmlFor="ic-affected-address">Adresse</label>
              <br />
              <input
                className="input-form"
                id="ic-affected-address"
                name="ic-affected-address"
                type="text"
                placeholder="Adresse"
                value={address}
                onChange={onChange}
                disabled={isDisabled}
                pattern="^([\p{L}\p{P}\d+](\s)?){2,31}$"
                maxLength={31}
                required
              />
              <div />
            </div>
            <div>
              <label htmlFor="ic-affected-city">Sted/By</label>
              <br />
              <input
                className="input-form"
                id="ic-affected-city"
                name="ic-affected-city"
                type="text"
                placeholder="Sted/by"
                value={city}
                onChange={onChange}
                disabled={isDisabled}
                pattern="^([\p{L}\p{P}\d+](\s)?){2,31}$"
                maxLength={31}
                required
              />
              <div />
            </div>
            <div>
              <label htmlFor="ic-affected-postNumber">Postnr.</label>
              <br />
              <input
                className="input-form"
                id="ic-affected-postNumber"
                name="ic-affected-postNumber"
                type="text"
                placeholder="Postnr."
                value={postNumber}
                onChange={onChange}
                disabled={isDisabled}
                pattern="^([\p{L}\p{P}\d+](\s)?){2,31}$"
                maxLength={31}
                required
              />
              <div />
            </div>
            <div>
              <PhoneInput
                id="ic-affected-phone"
                name="ic-affected-phone"
                phone={phone}
                isDisabled={isDisabled}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="ic-affected-email">Epost</label>
              <br />
              <input
                className="input-form"
                id="ic-affected-email"
                name="ic-affected-email"
                type="text"
                placeholder="Epost"
                value={email}
                onChange={onChange}
                disabled={isDisabled}
                pattern="^([\p{L}\p{P}\d+](\s)?){2,31}$"
                maxLength={31}
                required
              />
              <div />
            </div>
          </div>
          <div className="ic-affected-form__connected-souls">
            <label>Pårørende av</label>
            <br />
            {soulRows &&
              soulRows.length &&
              soulRows.map((row, index) => (
                <React.Fragment key={index}>
                  <label htmlFor="ic-affected-affectedOf">
                    {row.firstName} {row.lastName}
                  </label>
                  <input
                    className="input-form"
                    id="ic-affected-affectedOf"
                    name="ic-affected-affectedOf"
                    type="checkbox"
                    checked={row.checked}
                    value={affectedOf}
                    onChange={(e) => onCheckbox(e, index)}
                    disabled={isDisabled}
                  />
                  <br />
                </React.Fragment>
              ))}
          </div>
          <div className="ic-form__btn-container">
            {!isEdit && (
              <Button
                className="ic-add-btn"
                type="submit"
                form="ic-form__affected"
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
    </>
  );
};

export default ICAffectedForm;
