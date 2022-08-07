export const DeleteFetch = async (url, option) => {
  const token = sessionStorage.getItem("token");
  return await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(option),
  });
};
