export const UpdateFetch = async (url, id, text) => {
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      id: id,
      text: text,
    }),
  });
};
