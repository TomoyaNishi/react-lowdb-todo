export const UpdateFetch = async (url, option) => {
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(option),
  });
};
