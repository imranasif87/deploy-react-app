import { FunctionComponent, useEffect, useState, useRef } from "react";
import { Link, json } from "react-router-dom";
import DefaultContainer from "../layout/DefaultContainer";
import "./css/RegisterAffected.css";
import ICSoulTable from "../components/ICSoulTable";
import ICSoulForm from "../components/ICSoulForm";
import Modal from "../layout/Modal";
import ICAffectedTable from "../components/ICAffectedTable";
import ICAffectedForm from "../components/ICAffectedForm";

const emptySoulFormData: SoulRow = {
  soulId: 0,
  firstName: "",
  lastName: "",
  flightId: 0,
  origin: "",
  destination: "",
  departureTime: "",
  airline: "",
};

const emptyAffectedFormData: AffectedRow = {
  firstName: "",
  lastName: "",
  relation: "",
  address: "",
  city: "",
  postNumber: "",
  phone: "",
  email: "",
  affectedOf: "",
};

// const emptyRegistrationData: ICRegistration = {
//   id: 0,
//   souls: [],
//   incident: {
//     id: 0,
//     createdAt: new Date(),
//     timeOfIncident: new Date(),
//     flight: {
//       origin: '',
//       departureTime: new Date(),
//       destination: '',
//       airline: '',
//     },

//     description: ''
//   }
// }

interface SoulRow {
  soulId: number;
  firstName: string;
  lastName: string;
  flightId: number;
  origin: string;
  destination: string;
  departureTime: string;
  airline: string;
}

interface SoulRowWithCheckBox extends SoulRow {
  checked: boolean;
}

interface AffectedRow {
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

interface ICAffected {
  id: number;
  person: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}

interface ICSoul {
  id: number;
  person: {
    firstName: string;
    lastName: string;
  };
  type: number;
  flight: ICFlight;
  isConfirmed: boolean;
}

interface ICRegistration {
  id: number;
  souls: ICSoul[];
  affectedList: ICAffected[];
  incident: {
    id: number;
    createdAt: any;
    timeOfIncident: any;
    flight: ICFlight;
    description: string;
  };
}

interface ICFlight {
  id: number;
  origin: string;
  departureTime: any;
  destination: string;
  airline: string;
}

interface Props {
  navHeader: string;
}

const RegisterAffected: FunctionComponent<Props> = (props) => {
  const { navHeader } = props;
  const [isSoulEdit, setIsSoulEdit] = useState(false);
  const [isAffectedEdit, setIsAffectedEdit] = useState(false);
  const [soulFormData, setSoulFormData] = useState(emptySoulFormData);
  const [editSoulFormData, setEditSoulFormData] = useState(emptySoulFormData);
  const [affectedFormData, setAffectedFormData] = useState(
    emptyAffectedFormData
  );
  const [editAffectedFormData, setEditAffectedFormData] = useState(
    emptyAffectedFormData
  );
  const [editRowIndex, setEditRowIndex] = useState(0);
  const [soulRows, setSoulRows] = useState<SoulRow[]>([]);
  const [affectedRows, setAffectedRows] = useState<AffectedRow[]>([]);
  const [soulRowsWithCheckBox, setRowsWithCheckBox] = useState<
    SoulRowWithCheckBox[]
  >([]);

  useEffect(() => {
    setRowsWithCheckBox(soulRows.map((row) => ({ ...row, checked: true })));
  }, [soulRows]);

  const [registration, setRegistration] = useState<ICRegistration | null>(null);
  const [soulList, setSoulList] = useState<ICSoul[]>([]);
  const [affectedList, setAffectedList] = useState<ICAffected[]>([]);
  const regId = 1;

  const getRegistration = async () => {
    try {
      const response = await fetch(
        `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Registration/${regId}`
      );
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  };

  const addSoul = async (soul: ICSoul) => {
    try {
      const flightResponse = await fetch(
        `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Registration/soul/flight`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(soul.flight),
        }
      );

      const flightData = await flightResponse.json();
      const flightId: number = flightData.id;
      console.log("flightId", flightId);
      const soulResponse = await fetch(
        `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Registration/${regId}/${flightId}/soul`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(soul),
        }
      );

      const soulData = await soulResponse.json();
      const soulId: number = soulData.id;
      console.log("soulId", soulId);

      return {
        flightId: flightId,
        soulId: soulId,
      };
    } catch (e) {
      console.error(e);
    }
  };

  const updateSoul = async (icSoul: ICSoul) => {
    const soulId = icSoul.id;
    const flightId = icSoul.flight.id;

    try {
      const soulResponse = await fetch(
        `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/registration/soul/${soulId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(icSoul),
        }
      );

      if (!soulResponse.ok) {
        throw new Error("Error in soulResponse");
      }

      const flightResponse = await fetch(
        `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/registration/soul/flight/${flightId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(icSoul.flight),
        }
      );

      if (!flightResponse.ok) {
        throw new Error("Error in flightResponse");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteSoul = async (index: number) => {
    const soulId = registration!.souls[index].id;
    const flightId = registration!.souls[index].flight.id;
    console.log("soulId:", soulId);
    console.log("flightId:", flightId);

    try {
      const soulResponse = await fetch(
        `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Soul/${soulId}`,
        {
          method: "DELETE",
        }
      );

      if (!soulResponse.ok) {
        throw new Error("Failed to delete data.");
      }

      const flightResponse = await fetch(
        `https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Flight/${flightId}`,
        {
          method: "DELETE",
        }
      );

      if (!flightResponse.ok) {
        throw new Error("Failed to delete flight.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      const registration: ICRegistration = await getRegistration();
      setRegistration(registration);
    })();
  }, []);

  useEffect(() => {
    if (registration) {
      const newSoulRows: SoulRow[] = registration.souls.map((row: ICSoul) => ({
        soulId: row.id,
        firstName: row.person.firstName,
        lastName: row.person.lastName,
        flightId: row.flight.id,
        origin: row.flight != null ? row.flight.origin : "",
        destination: row.flight != null ? row.flight.destination : "",
        departureTime: row.flight != null ? row.flight.departureTime : "",
        airline: row.flight != null ? row.flight.airline : "",
      }));

      setSoulRows(newSoulRows);
    }
  }, [registration]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    regexRemove: RegExp = /$^/
  ) => {
    const name = e.target.name.split("-");
    if (!isSoulEdit && !isAffectedEdit) {
      if (name[1] === "soul") {
        setSoulFormData((prevState) => ({
          ...prevState,
          [name[2]]: e.target.value.replace(regexRemove, ""),
        }));
      } else if (name[1] === "affected") {
        setAffectedFormData((prevState) => ({
          ...prevState,
          [name[2]]: e.target.value.replace(regexRemove, ""),
        }));
      }
    } else {
      if (name[1] === "soul") {
        setEditSoulFormData((prevState) => ({
          ...prevState,
          [name[2]]: e.target.value.replace(regexRemove, ""),
        }));
      } else if (name[1] === "affected") {
        setEditAffectedFormData((prevState) => ({
          ...prevState,
          [name[2]]: e.target.value.replace(regexRemove, ""),
        }));
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formName = formElement.getAttribute("name");

    console.log("onSubmit");

    if (!isSoulEdit && !isAffectedEdit) {
      switch (formName) {
        case "ic-soul-form":
          const icSoul: ICSoul = {
            id: 0,
            person: {
              firstName: soulFormData.firstName,
              lastName: soulFormData.lastName,
            },
            type: 0,
            flight: {
              id: 0,
              origin: soulFormData.origin,
              departureTime: soulFormData.departureTime,
              destination: soulFormData.destination,
              airline: soulFormData.airline,
            },
            isConfirmed: false,
          };

          const ids = await addSoul(icSoul);
          icSoul.id = ids!.soulId;
          icSoul.flight.id = ids!.flightId;
          setRegistration((prevState) => ({
            ...prevState!,
            souls: [...prevState!.souls, icSoul],
          }));

          setSoulFormData(emptySoulFormData);
          break;
        case "ic-affected-form":
          const newAffectedRows = affectedRows.concat(affectedFormData);
          setAffectedRows(newAffectedRows);
          setAffectedFormData(emptyAffectedFormData);
          break;
      }
    } else {
      switch (formName) {
        case "ic-soul-form":
          const icSoul: ICSoul = {
            id: 0,
            person: {
              firstName: editSoulFormData.firstName,
              lastName: editSoulFormData.lastName,
            },
            type: 0,
            flight: {
              id: 0,
              origin: editSoulFormData.origin,
              departureTime: editSoulFormData.departureTime,
              destination: editSoulFormData.destination,
              airline: editSoulFormData.airline,
            },
            isConfirmed: false,
          };

          const newSoulRows = soulRows.map((row, i) => {
            if (i !== editRowIndex) {
              return row;
            } else {
              icSoul.id = row.soulId;
              icSoul.flight.id = row.flightId;
              editSoulFormData.soulId = row.soulId;
              editSoulFormData.flightId = row.flightId;
              return editSoulFormData;
            }
          });

          await updateSoul(icSoul);

          setSoulRows(newSoulRows);
          setIsSoulEdit(false);
          setEditRowIndex(0);
          setEditSoulFormData(emptySoulFormData);
          break;
        case "ic-affected-form":
          const newAffectedRows = affectedRows.map((row, i) =>
            i !== editRowIndex ? row : editAffectedFormData
          );

          setAffectedRows(newAffectedRows);
          setIsAffectedEdit(false);
          setEditRowIndex(0);
          setEditAffectedFormData(emptyAffectedFormData);
          break;
      }
    }
  };

  const onCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updateRows = [...soulRowsWithCheckBox];
    const isChecked = updateRows[index].checked;
    updateRows[index].checked = !isChecked;

    setRowsWithCheckBox(updateRows);
  };

  const onDeleteRow = <T,>(row: T, index: number) => {
    if (
      window.confirm(`Er du sikker på at du vil slette rad:\r ${index + 1}?`)
    ) {
      if (!isSoulRow(row)) {
        const newAffectedRows = affectedRows.filter((_, i) => i !== index);

        setAffectedRows(newAffectedRows);
      } else {
        deleteSoul(index);
        const newSoulRows = soulRows.filter((_, i) => i !== index);

        setSoulRows(newSoulRows);
      }
    }
  };

  const onEditRow = <T,>(row: T, index: number) => {
    if (!isSoulRow(row)) {
      setIsAffectedEdit(true);
      setEditAffectedFormData(row as AffectedRow);
      setEditRowIndex(index);
    } else {
      setIsSoulEdit(true);
      const rowCopy = row;
      rowCopy.departureTime = row.departureTime.substring(0, 16);
      setEditSoulFormData(rowCopy as SoulRow);
      setEditRowIndex(index);
    }
  };

  const onCancelEdit = () => {
    setIsSoulEdit(false);
    setIsAffectedEdit(false);
    setEditSoulFormData(emptySoulFormData);
    setEditAffectedFormData(emptyAffectedFormData);
  };

  const isSoulRow = (row: any): row is SoulRow => {
    return "airline" in row;
  };

  return (
    <DefaultContainer navHeader={navHeader}>
      <div className="flex-cancel-wrap">
        <h1>Registrering</h1>
        <Link to="path" className="ic-guidance-link">
          Veiledning til samtalen
        </Link>
        <div className="ic-registration">
          <div className="ic-registration__affected">
            <Modal
              isOpen={isAffectedEdit}
              formId="ic-form__affected-edit"
              onNegative={onCancelEdit}
              modalHeadLine="Rediger linjen"
              positiveBtn="Endre"
            >
              <ICAffectedForm
                isDisabled={false}
                isEdit={true}
                formData={editAffectedFormData}
                soulRows={soulRowsWithCheckBox}
                onChange={onChange}
                onCheckbox={onCheckbox}
                onSubmit={onSubmit}
              />
            </Modal>
            <div className="override-border-radius">
              <ICAffectedTable
                affectedRows={affectedRows}
                onDeleteRow={onDeleteRow}
                onEditRow={onEditRow}
              ></ICAffectedTable>
            </div>
            <ICAffectedForm
              isDisabled={false}
              formData={affectedFormData}
              soulRows={soulRowsWithCheckBox}
              onChange={onChange}
              onCheckbox={onCheckbox}
              onSubmit={onSubmit}
            />
          </div>
          <div className="ic-registration__soul">
            <Modal
              isOpen={isSoulEdit}
              formId="ic-form__soul-edit"
              onNegative={onCancelEdit}
              modalHeadLine="Rediger linjen"
              positiveBtn="Endre"
            >
              <ICSoulForm
                isDisabled={false}
                isEdit={true}
                formData={editSoulFormData}
                onChange={onChange}
                onSubmit={onSubmit}
              />
            </Modal>

            {/* <div>{JSON.stringify(soulList)}</div> */}
            <div className="override-border-radius">
              <ICSoulTable
                soulRows={soulRows}
                onDeleteRow={onDeleteRow}
                onEditRow={onEditRow}
              />
            </div>
            <ICSoulForm
              isDisabled={false}
              formData={soulFormData}
              onChange={onChange}
              onSubmit={onSubmit}
            />
            {/* {soulList.length && soulList.map((soul) => {
              <h1>{soul.flight.origin}</h1>
            })} */}
          </div>
        </div>
      </div>
    </DefaultContainer>
  );
};

export default RegisterAffected;
