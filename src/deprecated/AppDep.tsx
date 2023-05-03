import React, { useState, useEffect } from "react";
import "./AppDep.css";

const App: React.FC = () => {
  const [number, setNumber] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("white-background");
  const [prevNumbers, setPrevNumbers] = useState<number[]>([]);

  const fetchData = async () => {
    const response = await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Eros");
    const data = await response.json();
    setNumber(data);
    setPrevNumbers([...prevNumbers, data]);

    if (data === 42) {
      setBackgroundColor("yellow-background");
    } else {
      setBackgroundColor("white-background");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // <div className={backgroundColor}>
    <div className="app">
      <div className="number-card">
        <div className="number-card__items">
          <p className="text-desc">
            Click the button to fetch a number from the API
          </p>
          <button className="number-card__fetch-button" onClick={fetchData}>
            Get Number
          </button>
          <p className="prev-numbers">
            Previous numbers: {prevNumbers.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
