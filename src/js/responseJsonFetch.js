export async function fetchJsonResponse(url, params) {
  try {
    const response = await fetch(url + '?' + new URLSearchParams(params));
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}
