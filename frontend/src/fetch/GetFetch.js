export const GetFetch = async (url, setState) => {
  const token = sessionStorage.getItem("token");
  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: token },
  });
  const data = await res.json();
  setState(data);
};
