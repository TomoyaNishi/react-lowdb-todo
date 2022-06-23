export const GetFetch = async (url, setState) => {
  const res = await fetch(url, { method: "GET" });
  const data = await res.json();
  setState(data);
};
