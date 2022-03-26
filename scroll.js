const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let pageNo = 1;

const count = 5;
const apiKey = "E03t67ARY3wIhYzUOJ507SKniykg0wsii70w7LqNhWc";

function imageLoader() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    console.log("Here");
    ready = true;
    pageNo++;
    console.log(ready, pageNo);
  }
  console.log("images loaded", imagesLoaded, totalImages);
}

//Helper function to add attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
function displayPhotos() {
  // Run for each
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    item.appendChild(img);
    imageContainer.appendChild(item);
    img.addEventListener("load", imageLoader);
  });
}

//get photos from Unsplash
async function getPhotos() {
  const apiURL = `https://api.unsplash.com/photos/?client_id=${apiKey}&per_page=${count}&page=${pageNo}`;
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    // console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // Catch error
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
  console.log("scrolled");
});
//On Load
getPhotos();
