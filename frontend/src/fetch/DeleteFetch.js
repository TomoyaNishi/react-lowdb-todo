export const DeleteFetch = async (url, option) => {
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(option),
  });
};
