import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {addTileLayer, validateIp } from "./helpers";
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector(".search-bar__btn");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKeydown);

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
})

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
  zoomControl: false,
});
addTileLayer(map);
L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);

async function getData() {
  if (!validateIp(ipInput.value)) {
    return;
  }

  try {
    const response = await fetch(`
https://geo.ipify.org/api/v2/country?apiKey=at_EBl8VVjaSs5FqvSXiHvIj6ufodQXD&ipAddress=${ipInput.value}`);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return setInfo(data);
  } catch (error) {
    console.error(error);
  }
}

function handleKeydown(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  const {
    ip,
    location: { country, timezone },
    isp,
  } = mapData;
  ipInfo.innerText = ip || "-";
  locationInfo.innerText = country || "-";
  timezoneInfo.innerText = timezone || "-";
  ispInfo.innerText = isp || "-";
}
