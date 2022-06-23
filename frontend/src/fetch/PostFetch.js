export const PostFetch = async (url, state) => {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: state }),
  });
};
