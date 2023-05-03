import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  Typography,
  Paper,
  Button,
  Input,
} from "@mui/material";
import Modal from "../layout/Modal";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import DefaultContainer from "../layout/DefaultContainer";
import en from "../languages/en.json";
import no from "../languages/no.json";
import "./css/Controlpanel.css";

// Define the structure of the affected item
interface AffectedItem {
  id: number;
  person: {
    id: 0;
    firstName: "";
    lastName: "";
    email: "";
    phone: "";
  };
  processed: 0 | 1 | 2;
}

// Define the props passed to the Affected component
const Affected: FunctionComponent<Props> = (props) => {
  // Set the default language based on the value stored in localStorage
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "no"
  );

  // Set the texts object based on the language selected
  const texts = language === "en" ? en.affected : no.affected;

  // Function to handle language change
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // State variables to store the affected items
  const [affected, setAffected] = useState<AffectedItem[]>([]);
  const [newAffected, setNewAffected] = useState();

  // State variables to manage the modal windows
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // State variables to manage the selected items
  const [checked, setChecked] = useState<readonly number[]>([]);
  const [left, setLeft] = useState<readonly number[]>([]);
  const [right, setRight] = useState<readonly number[]>([]);
  const [center, setCenter] = useState<readonly number[]>([]);

  const [processed, setProcessed] = useState(false);
  const [processing, setProcessing] = useState(false);

  // UseEffect hook to fetch the affected items from the API
  useEffect(() => {
    const fetchAffected = async () => {
      const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Affected");
      const data = await response.json();
      setAffected(data);
      setLeft(data);
      setCenter(data);
      setRight(data);
    };
    fetchAffected();
  }, []);

  const handleToggle = (value: number) => async () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    // Update the processed property of the affected item
    const itemIndex = affected.findIndex((item) => item.id === value);
    const item = affected[itemIndex];
    let processedValue;

    if (item.processed === 0) {
      processedValue = 1;
      setProcessing(true);
    } else if (item.processed === 2) {
      processedValue = 1;
      setProcessed(true);
    } else {
      processedValue = item.center ? 1 : 2;
      setProcessing(true);
    }

    if (
      window.confirm(
        `Er du sikker på at du vil gjøre endringer for ${item.person.firstName} ${item.person.lastName}?`
      )
    ) {
      await fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Affected/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, processed: processedValue }),
      });

      // Update the affected state variable
      setAffected((prev) => [
        ...prev.slice(0, itemIndex),
        { ...item, processed: processedValue },
        ...prev.slice(itemIndex + 1),
      ]);

      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  };
  // Function to add a new affected item
  // TODO: This function is not working as intended
  const handleAdd = async (affectedId: string) => {
    const affected = await fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Affected`).then(
      (res) => res.json()
    );

    // Store the added affected in the state
    setNewAffected(affected);

    // Open the edit modal
    setIsNewModalOpen(true);
    console.log(JSON.stringify(affected));
  };

  // Function to render the custom list of affected items
  const customList = (items, backgroundColor, processed) => (
    <Paper
      sx={{
        width: "100%",
        height: "250px",
        backgroundColor: backgroundColor,
        overflow: "auto",
      }}
    >
      <List dense component="div" role="list">
        {items
          .filter((item) => item.processed === processed)
          .map((item) => {
            const labelId = `transfer-list-item-${item.id}-label`;

            return (
              <ListItem
                key={item.id}
                role="listitem"
                button
                onClick={handleToggle(item.id)}
              >
                <ListItemSecondaryAction>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(item.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                </ListItemSecondaryAction>
                <Link to={`/AffectedInformation/${item.id}`}>
                  <ListItemText
                    id={labelId}
                    primary={`${item.person.firstName} ${item.person.lastName}`}
                    style={{ paddingLeft: "10px" }}
                  />
                </Link>
              </ListItem>
            );
          })}
      </List>
    </Paper>
  );

  // TODO: Fiks Modall Legg inn pårørende. Bruk liknede som Passenger og Crew
  return (
    <>
      <DefaultContainer
        navHeader={texts.title}
        onLanguageChange={handleLanguageChange}
      >
        <Button
          className="add-crew"
          onClick={() => handleAdd()}
          variant="contained"
          style={{
            position: "absolute",
            top: "17%",
            right: "2%",
            width: "250px",
            height: "54px",
            margin: 2,
            backgroundColor: "#369E3B",
          }}
          sx={{
            ":hover": { backgroundColor: "#369E3B" },
            margin: 1,
          }}
        >
          {texts.addAffected}
        </Button>

        <Grid container justifyContent="center" spacing={2}>
          {processed && (
            <Grid item xs={10} md={10}>
              <Stack
                sx={{ width: "85%", position: "centered", marginTop: "2%" }}
              >
                <Alert severity="success" onClose={() => setProcessed(false)}>
                  Du har flyttet pårørende til under behandling
                </Alert>
              </Stack>
            </Grid>
          )}
          {processing && (
            <Grid item xs={10} md={10}>
              <Stack
                sx={{ width: "85%", position: "centered", marginTop: "2%" }}
              >
                <Alert severity="success" onClose={() => setProcessing(false)}>
                  Du har flyttet pårørende til fullført behandling
                </Alert>
              </Stack>
            </Grid>
          )}
          <Grid item xs={10} md={10}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              sx={{
                height: "50% !important",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                marginTop: "8%",
                "& > *": {
                  flexBasis: "33% !important",
                },
              }}
            >
              <Grid item xs={12} sm={12}>
                <Typography variant="h6">{texts.unprocessed}</Typography>
                {customList(left, "mistyrose", 0)}
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography variant="h6">{texts.processing}</Typography>
                {customList(center, "ivory", 1)}
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6">{texts.processed}</Typography>
                {customList(right, "Honeydew", 2)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Modal
          className="my-modal"
          isOpen={isNewModalOpen}
          modalHeadLine={texts.addAffected}
          onClose={() => setIsNewModalOpen(false)}
        >
          <h2></h2>
          <div className="container">
            <div>
              <label htmlFor="soul-firstName">{texts.firstName}</label>
              <br />
              <Input
                className="input-form"
                id="soul-firstName"
                name="soul-firstName"
                type="text"
                placeholder=""
                onChange={(e) => onChange(e)}
                pattern="^([\p{L}\p{P}\d+](\s)?){2,31}$"
                maxLength={31}
                style={{ width: "450px" }}
                required
              />
            </div>

            <div>
              <label htmlFor="soul-firstName">{texts.lastName}</label>
              <br />
              <Input
                className="input-form"
                id="soul-firstName"
                name="soul-firstName"
                type="text"
                placeholder=""
                onChange={(e) => onChange(e, /^([\p{L}\p{P}\d+](\s)?){2,31}$/)}
                maxLength={31}
                style={{ width: "450px" }}
                required
              />
            </div>

            <div>
              <label htmlFor="soul-firstName">{texts.email}</label>
              <br />
              <Input
                className="input-form"
                id="soul-firstName"
                name="soul-firstName"
                type="text"
                placeholder=""
                onChange={(e) => onChange(e)}
                pattern="^([\p{L}\p{P}\d+](\s)?){2,31}$"
                maxLength={31}
                style={{ width: "450px" }}
                required
              />
            </div>

            <div>
              <label htmlFor="soul-firstName">{texts.phone}</label>
              <br />
              <Input
                className="input-form"
                id="soul-firstName"
                name="soul-firstName"
                type="text"
                placeholder=""
                onChange={(e) => onChange(e)}
                pattern="^([\p{L}\p{P}\d+](\s)?){2,31}$"
                maxLength={31}
                style={{ width: "450px" }}
                required
              />
            </div>
          </div>

          <div className="btn-container">
            <Button
              className="change-btn"
              type="submit"
              form="ic-form__affected"
              variant="contained"
              style={{
                backgroundColor: "#369E3B",
                width: "230px",
                height: "40px",
              }}
              onSubmit={handleAdd}
            >
              {texts.addAffected}
            </Button>

            <Button
              className="back-btn"
              type="submit"
              form="ic-form__affected"
              variant="contained"
              style={{
                backgroundColor: "#369E3B",
                width: "230px",
                height: "40px",
              }}
              onClick={() => setIsNewModalOpen(false)}
            >
              {texts.back}
            </Button>
          </div>
        </Modal>
        <div className="backBtn">
          <Link to="/">{texts.back}</Link>
        </div>
      </DefaultContainer>
    </>
  );
};

export default Affected;
