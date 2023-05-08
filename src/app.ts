import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const API_KEY = "testtestaaa";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO";
};

// declare var google: any;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enterdAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://example.com?address=${encodeURI(enterdAddress)}&key=${API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("座標を取得できませんでした");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 16,
      });
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
    });
}

form.addEventListener("submit", searchAddressHandler);
