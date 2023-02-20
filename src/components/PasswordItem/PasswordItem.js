import { useState } from "react";
import Input from "./Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import "./PasswordItem.css";

const PasswordItem = ({ name, pass, onSave, id }) => {
  const [password, setPassword] = useState(pass);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const changePass = (value) => {
    setIsChanged(true);
    setPassword(value);
  };

  const handleSaveClick = async () => {
    onSave({ id, name, password });
    setIsChanged(false);
  };

  return (
    <div className="password-item">
      <h2>{name}</h2>
      <div className="password-item-input">
        <Input
          type={isPassVisible ? "text" : "password"}
          value={password}
          onChange={changePass}
        />
        {isPassVisible ? (
          <FontAwesomeIcon
            className="eye"
            icon={faEyeSlash}
            onClick={() => setIsPassVisible(false)}
          />
        ) : (
          <FontAwesomeIcon
            className="eye"
            icon={faEye}
            onClick={() => setIsPassVisible(true)}
          />
        )}
      </div>
      <Button disabled={!isChanged} onClick={handleSaveClick}>
        Save
      </Button>
    </div>
  );
};

export default PasswordItem;
