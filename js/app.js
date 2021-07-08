"use strict";

//  VARIABLES

const communityBtn = document.querySelector(".communityBtn");
const featuredBtn = document.querySelector(".featuredBtn");
const featuredContent = document.querySelector(".featuredContent");
const communityContent = document.querySelector(".communityContent");
const modal = document.querySelector(".modal-bg");
const contentAndButtons = [
  communityBtn,
  featuredBtn,
  featuredContent,
  communityContent,
];
const jamConfirmModal = document.querySelector(".jamConfirmModal");
let searchResults = [];
let formButton = document.querySelector("#modalSearchBtn");
const searchHTML = document.querySelector("#searchContent");

//
// //////////////////////////////////////////////////////////////
// -- Search Modal Functionality---//////////////////////////////
// ///////////////////////////////////////////////////////////////
//

const modalBtn = document.querySelector(".modal-button");
const modalBg = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");

modalBtn.addEventListener("click", () => {
  searchResults = [];
  searchHTML.innerHTML = `<h2 id="searchPlaceholder">Let's find that jam you were talking about...</h2>`;
  modalBg.classList.add("visible");
});

modalClose.addEventListener("click", () => {
  modalBg.classList.remove("visible");
  searchResults = [];
});

communityBtn.addEventListener("click", () => {
  toggleClass(contentAndButtons, "hide");
});

featuredBtn.addEventListener("click", () => {
  toggleClass(contentAndButtons, "hide");
});

// ///////////////////////////////////////////////
// -----------------FUNCTIONS-------------------
//////////////////////////////////////////////////

const spaceToPlus = function (str) {
  str.split(" ").join("+");
  return str.split(" ").join("+");
};

const returnUrlString = function (value, queryType) {
  if (value.length > 0) {
    return (value = `${queryType}:` + value + "%20");
  } else {
    return (value = "");
  }
};

function createSearchHTML(arrayOfObjects) {
  let html;
  arrayOfObjects.forEach((jam) => {
    if (html === undefined) {
      html = `
      <div class="resultJamHTML">
        <img class="coverIMG"src="${jam.albumCover}" alt="${jam.album}" style="width: 100%"/>
        <div class="deets">
          <h3>Track: ${jam.track}</h3>
          <h3>Artist: ${jam.artist}</h3>
          <h3>Album: ${jam.album}</h3>
          <h3>Release Date: ${jam.year}</h3>
        </div>
        <div class="radioSelect">
          <label for="theOne">This Is The One!</label>
          <input type="radio" name ="theOne">
        </div>
      </div>
      `;
    } else {
      html += `
      <div class="resultJamHTML">
        <img class="coverIMG"src="${jam.albumCover}" alt="${jam.album}" style="width: 100%"/>
        <div class="deets">
          <h3>Track: ${jam.track}</h3>
          <h3>Artist: ${jam.artist}</h3>
          <h3>Album: ${jam.album}</h3>
          <h3>Release Date: ${jam.year}</h3>
        </div>
        <div class="radioSelect">
          <label for="theOne">This Is The One!</label>
          <input type="radio" name ="theOne">
        </div>
      </div>
      `;
    }
  });
  return html;
}

let toggleClass = function (elements, className) {
  for (let each of elements) {
    if (each.classList.contains(className)) {
      each.classList.remove(className);
    } else {
      each.classList.add(className);
    }
  }
};

// /////////////////////////////////////////
// --------Classes ------------
// ////////////////////////////////////////

class Jam {
  constructor(track, artist, album, year, albumCover, spotifyLink, trackID) {
    this.track = track;
    this.artist = artist;
    this.album = album;
    this.year = year;
    this.albumCover = albumCover;
    this.spotifyLink = spotifyLink;
    this.trackID = trackID;
    this.username;
    this.userEmail;
    this.descriptionTitle;
    this.description;
  }
}

//  ///////////////////////////////////////////////
//  //////////// API AJAX REQUEST //////////////////
//  ////////////////////////////////////////////////

formButton.addEventListener("click", () => {
  searchResults = [];
  let artist = document.querySelector("#artist").value;
  artist = returnUrlString(spaceToPlus(artist), "artist");

  let track = document.querySelector("#track").value;
  track = returnUrlString(spaceToPlus(track), "track");

  let key = btoa(document.querySelector("#apikey").value);

  // Begins Auth Token XHR request
  let auth = new XMLHttpRequest();
  let successfulResponse = 4;

  auth.onreadystatechange = function () {
    if (auth.readyState === successfulResponse) {
      let authObject = JSON.parse(auth.responseText);

      // Query XHR request (only executes if auth is successful)
      let query = new XMLHttpRequest();
      query.onreadystatechange = () => {
        if (query.readyState === successfulResponse) {
          // LOGS AND PARSES RESPONSE TO JSON
          let queryObject = JSON.parse(query.responseText);
          // CREATES HTML and array of search result objects

          let searchListHTML;
          // LOOP TO CREATE HTML FOR SEARCH RESULTS
          for (let i = 0; i < queryObject.tracks.items.length; i++) {
            const currentItem = queryObject.tracks.items[i];
            const currentTrack = currentItem.name;
            const currentArtist = currentItem.artists[0].name;
            const currentAlbum = currentItem.album.name;
            const currentYear = currentItem.album.release_date;
            const currentAlbumCover = currentItem.album.images[0].url;
            const currentSLink = currentItem.external_urls.spotify;
            const currentID = currentItem.id;
            searchListHTML += `<li> Track: ${currentTrack}<br>Artist: ${currentArtist}<br> Album: ${currentAlbum}<br> Year: ${currentYear}<br>  <img src="${currentAlbumCover}" alt="${currentAlbum} album cover" height="100px" width="100px"></li>`;

            let jamObject = new Jam(
              currentTrack,
              currentArtist,
              currentAlbum,
              currentYear,
              currentAlbumCover,
              currentSLink,
              currentID
            );
            searchResults.push(jamObject);
          }
          console.log(searchResults);

          // ----------------INSERTS SEARCH RESULTS HTML /////////
          searchHTML.innerHTML = createSearchHTML(searchResults);
        } else {
          searchHTML.innerHTML = `
          <section class="errorAPI">
            <h4>Something went wrong. Did you enter an API credentials? They should be formatted without spaces, separated by a colon. :P</h4><br>
            <p>(For example 1243132:1982346)</p>
          </section>
            `;
        }
      };
      query.open(
        "GET", // type
        "https://api.spotify.com/v1/search?q=" + artist + track + "&type=track" // queryString
      );
      query.setRequestHeader(
        "Authorization",
        "Bearer " + authObject.access_token
      );
      query.send();
    }
  };

  // Finishes Authorization Request (Auth Request Wraps actual request)
  auth.open("POST", "https://accounts.spotify.com/api/token", true);
  auth.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  auth.setRequestHeader("Authorization", "Basic " + key);
  auth.send("grant_type=client_credentials");
});

// //////////////////////////////////////////////
// confirm Jam functionality ///////////////////
/////////////////////////////////////////////////

let myJamBtn = document.querySelector("#thatsMyJamBtn");
let notMyJamBtn = document.querySelector("#notMyJamBtn");
let confirmHTML = document.querySelector(".confirmJamFigure");
let confirmJamModal = document.querySelector(".confirmJamModal");

modal.addEventListener("click", () => {
  const theOneRadio = document.querySelectorAll(".resultJamHTML input");
  theOneRadio.forEach((e, i) => {
    if (e.checked) {
      confirmHTML.innerHTML = `
      <section id="confirmImage">
        <img src="${searchResults[i].albumCover}" alt="${searchResults[i].album}">
      </section>
      <section id="confirmJamDetails">
        <h4>Track: ${searchResults[i].track}</h4>
        <h4>Artist: ${searchResults[i].artist}</h4>
        <h4>Album: ${searchResults[i].album}</h4>
        <h4>Year: ${searchResults[i].year}</h4>
      </section>
      `;
      confirmJamModal.style.display = "flex";
      console.log(searchResults[i]);
      e.checked = false;
    }
  });
});

notMyJamBtn.addEventListener("click", () => {
  confirmJamModal.style.display = "none";
});
