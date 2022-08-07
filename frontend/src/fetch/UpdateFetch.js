export const UpdateFetch = async (url, option) => {
  const token = sessionStorage.getItem("token");
  return await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(option),
  });
};
