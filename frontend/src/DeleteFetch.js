export const DeleteFetch = async (url, id) => {
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
};
