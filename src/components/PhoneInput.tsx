import React, { FunctionComponent } from "react";
import "./css/PhoneInput.css";

interface Props {
  id?: string;
  name?: string;
  phone: string;
  isDisabled?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    regexRemove?: RegExp
  ) => void;
}

const PhoneInput: FunctionComponent<Props> = (props) => {
  const { id = "phone", name, phone, isDisabled, onChange } = props;

  if (RegExp("^(\\+47)").test(phone)) {
    return (
      <>
        <label htmlFor={id}>Telefonnummer</label>
        <br />
        <input
          className="input-phone"
          id={id}
          name={name}
          type="tel"
          placeholder="Telefon"
          value={phone}
          onChange={(e) => onChange(e, /^[^\+\d]?|[\s\D]/g)}
          disabled={isDisabled}
          pattern="^[+][0-9]{2}[0-9]{8}$"
          maxLength={11}
          required
        />
        <div className="input-phone__description"></div>
      </>
    );
  } else if (RegExp("^\\+").test(phone)) {
    return (
      <>
        <label htmlFor={id}>Telefonnummer</label>
        <br />
        <input
          className="input-phone"
          id={id}
          name={name}
          type="tel"
          placeholder="Telefon"
          value={phone}
          onChange={(e) => onChange(e, /^[^\+\d]?|[\s\D]/g)}
          disabled={isDisabled}
          pattern="^[+]?([0-9]{7,15}){1}$"
          maxLength={16}
          required
        />
        <div className="input-phone__description-international"></div>
      </>
    );
  } else {
    return (
      <>
        <label htmlFor={id}>Telefonnummer</label>
        <br />
        <input
          className="input-phone"
          id={id}
          name={name}
          type="tel"
          placeholder="Telefon"
          value={phone}
          onChange={(e) => onChange(e, /^[^\+\d]?|[\s\D]/g)}
          disabled={isDisabled}
          pattern="^[0-9]{8}$"
          maxLength={8}
          required
        />
        <div className="input-phone__description"></div>
      </>
    );
  }
};

export default PhoneInput;
