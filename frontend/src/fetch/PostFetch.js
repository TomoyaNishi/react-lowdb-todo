export const PostFetch = async (url, option) => {
  const token = sessionStorage.getItem("token");
  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(option),
  });
};
