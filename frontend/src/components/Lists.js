export const Lists = ({ lists, onClick }) => {
  return (
    <ul className="lists">
      {lists
        ? lists.map((list, index) => {
            return (
              <li key={index} className="list-item">
                <p>{list.text}</p>
                <button
                  className="delete-button"
                  onClick={() => onClick(list.id)}
                >
                  DELETE
                </button>
              </li>
            );
          })
        : null}
    </ul>
  );
};
