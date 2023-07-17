export async function fetchCat() {
  const openAPI = "http://placekitten.com";
  const res = await fetch(`${openAPI}/cat?json=true`);
  const resJson = await res.json();
  console.log(resJson);
  return `${openAPI}/${resJson.url}`;
}
