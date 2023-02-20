import { useEffect, useState, useCallback } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { decrypt } from "../../utils/decrypt";
import PasswordItem from "../PasswordItem/PasswordItem";
import "./PasswordList.css";

const PasswordList = () => {
  const { tg, query, user } = useTelegram();
  const [changes, setChanges] = useState([]);
  const [passes, setPasses] = useState([]);

  useEffect(() => console.log(query));

  const onSendData = useCallback(() => {
    const data = {
      changes,
      total: changes.length,
      queryId: query,
    };
    fetch(process.env.REACT_APP_API_URL + "/web-data", {
      crossDomain: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [changes]);

  useEffect(() => {
    async function fetchPasses() {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/web-data/${user.id}`,
        {
          crossDomain: true,
        }
      );
      if (!response.ok) {
        alert("HTTP error: " + response.status);
      } else {
        const json = await response.json();
        setPasses(json);
        console.log(json);
      }
    }

    fetchPasses();
  }, []);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: `Save ${changes.length} changes`,
    });
  }, [changes]);

  useEffect(() => {
    if (changes.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [changes]);

  const onSave = (obj) => setChanges([...changes, obj]);

  return (
    <div className="password-list">
      {passes.map((pass) => (
        <PasswordItem
          key={pass._id}
          id={pass._id}
          name={pass.name}
          pass={decrypt(pass.password)}
          onSave={onSave}
        />
      ))}
    </div>
  );
};

export default PasswordList;
