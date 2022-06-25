import { useState } from "react";
import "./List.css";
import { Button } from "../Button/Button";

export const Lists = ({ lists, clickUpdate, clickDelete }) => {
  const [updateItem, setUpdateItem] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleUpdate = (id, text) => {
    setUpdateItem(id);
    setInputValue(text);
  };

  const handleUpdateDone = (id) => {
    clickUpdate(id, inputValue) && setUpdateItem(null) && setInputValue("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <ul className="lists">
      {lists.map((list, index) => {
        return (
          <li key={index} className="list-item">
            {updateItem === list.id ? (
              <input
                className="list-input"
                onChange={(e) => handleChange(e)}
                value={inputValue}
              ></input>
            ) : (
              <p className="list-text">{list.text}</p>
            )}
            <div className="list-button-wrap">
              <Button
                style={
                  updateItem === list.id
                    ? "update-done-button"
                    : "update-button"
                }
                disabled={false}
                arg={false}
                onClick={
                  updateItem === list.id
                    ? () => handleUpdateDone(list.id)
                    : () => handleUpdate(list.id, list.text)
                }
                text={updateItem === list.id ? "DONE" : "UPDATE"}
              />

              <Button
                style={"delete-button"}
                arg={updateItem !== null}
                disabled={updateItem !== null ? true : false}
                onClick={() => clickDelete(list.id)}
                text={"DELETE"}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};
