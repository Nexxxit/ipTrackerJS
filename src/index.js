import "babel-polyfill";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { addTileLayer, validateIp, getAddress, addOffset } from "./helpers";
import icon from "../images/icon-location.svg";

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
});

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
  zoomControl: false,
});
addTileLayer(map);
L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

function getData() {
  if (!validateIp(ipInput.value)) {
    return;
  }

  getAddress(ipInput.value).then(setInfo);
}

function handleKeydown(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  const {
    ip,
    location: { country, region, timezone, lat, lng },
    isp,
  } = mapData;
  ipInfo.innerText = ip || "-";
  locationInfo.innerText = `${country} ${region}` || "-";
  timezoneInfo.innerText = timezone || "-";
  ispInfo.innerText = isp || "-";

  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);

  if(matchMedia("(max-width: 768px)").matches) {
    addOffset(map);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getAddress('102.22.22.1').then(setInfo)
})