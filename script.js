const breedSelect = document.getElementById('breedFilter');
const dogContainer = document.getElementById('dogContainer');
const refreshBtn = document.getElementById('refreshBtn');

// Fetch breeds for dropdown
async function loadBreeds() {
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await res.json();
  const breeds = Object.keys(data.message);
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed;
    option.textContent = breed;
    breedSelect.appendChild(option);
  });
}

// Fetch and show 5 dog images
async function fetchDogs(breed = '') {
  let url = breed 
    ? `https://dog.ceo/api/breed/${breed}/images/random/5`
    : `https://dog.ceo/api/breeds/image/random/5`;

  const res = await fetch(url);
  const data = await res.json();

  dogContainer.innerHTML = '';
  data.message.forEach(img => {
    const imgElem = document.createElement('img');
    imgElem.src = img;
    imgElem.className = 'dog-img';
    dogContainer.appendChild(imgElem);
  });
}

refreshBtn.addEventListener('click', () => {
  const breed = breedSelect.value;
  fetchDogs(breed);
});

breedSelect.addEventListener('change', () => {
  fetchDogs(breedSelect.value);
});

loadBreeds();
fetchDogs();
