export async function getAddress(ip) {
  try {
    const response = await fetch(`
https://geo.ipify.org/api/v2/country,city?apiKey=at_EBl8VVjaSs5FqvSXiHvIj6ufodQXD&ipAddress=${ip}`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
