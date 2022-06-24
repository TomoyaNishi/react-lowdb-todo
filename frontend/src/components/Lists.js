export const Lists = ({ lists, clickDelete }) => {
  return (
    <ul className="lists">
      {lists.map((list, index) => {
        return (
          <li key={index} className="list-item">
            <p className="list-text">{list.text}</p>
            <div className="list-button-wrap">
              <button className="update-button">UPDATE</button>
              <button
                className="delete-button"
                onClick={() => clickDelete(list.id)}
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
