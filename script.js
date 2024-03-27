const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
let count = config.count;
const apiKey = config.apiKey;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoadded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
  }
}

// helper Function to set attributes on DOM
function setAttributes(element, attributes) {
  for (const Key in attributes) {
    element.setAttribute(Key, attributes[Key]);
  }
}

//Create elements for links  photos, add to DOM
function displayPhotos() {
  totalImages = photosArray.length;

  //Run function for eatch object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link o unplash
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoadded);
    // put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch (erro) {}
}
// Check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
