import { useState } from "react";

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
              <button
                className={
                  updateItem === list.id
                    ? "update-done-button"
                    : "update-button"
                }
                onClick={
                  updateItem === list.id
                    ? () => handleUpdateDone(list.id)
                    : () => handleUpdate(list.id, list.text)
                }
              >
                {updateItem === list.id ? "DONE" : "UPDATE"}
              </button>
              <button
                className={
                  updateItem ? "delete-button-disabled" : "delete-button"
                }
                onClick={() => clickDelete(list.id)}
                disabled={updateItem ? true : false}
              >
                DELETE
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
