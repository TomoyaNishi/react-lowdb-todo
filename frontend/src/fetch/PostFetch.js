export const PostFetch = async (url, option) => {
  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(option),
  });
};
