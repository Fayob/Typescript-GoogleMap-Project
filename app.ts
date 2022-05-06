import axios from "axios"

// install @types/googlemaps using "npm install --save @types/googlemaps" for google map type check iin typescript

const form = document.querySelector("form")
const addressInput = document.getElementById("address") as HTMLInputElement

const GOOGLE_API_KEY = "your api key here"

declare var google: any

type GoogleGeoCodingResponse = {
    results: {geometry: {location: {lat: number, lng: number}}}[],
    status: "OK" | "ZERO_RESULTS"
}

function searchAddressHandler(event: Event){
    event.preventDefault()
    const enteredAddress = addressInput.value

    // send this to Google's API!
   axios.get<GoogleGeoCodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`).then(response => {
       if (response.data.status !== "OK") {
           throw new Error("Could not fetch location!")
       }
       const coordinate = response.data.results[0].geometry.location
       const map = new google.maps.Map(document.getElementById("map"), {
           center: coordinate,
           zoom: 16
       })

       new google.maps.Marker({position: coordinate, map:map})
   }).catch(error => {
       alert(error.message)
       console.log(error);      
   })
}

form.addEventListener("submit", searchAddressHandler)