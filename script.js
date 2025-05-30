const fileInput = document.getElementById('fileInput');
const btnText = document.querySelector('.btn-text');
const removeBtn = document.getElementById('removeBtn');
const icon = document.querySelector('.icon');
const umberellaImage = document.getElementById("main-image");
const main_Container = document.getElementById("main");
const logo = document.getElementById("bottom-image");

const blue_background = "#e7f6fc";
const blue_border = "#ddf2ff";

const yellow_background = "#fff2c7";
const yellow_border = "#fff0c5";

const pink_background = "#ffd8ed";
const pink_border = "#ee9ab6";

let selectedColor = blue_border;
let lastImageSrc = "";
let uploadiconsrc = "";
let selectedFile = null;


//Simulate loading and show the logo after delay
function simulateLoading() {
  if (!selectedFile) return;
 umberellaImage.classList.add("loading-size");
  umberellaImage.src = "./public/loader_icon.svg";
  icon.src = "./public/loader_icon.svg";

  umberellaImage.classList.add("spin", "rotating");
  icon.classList.add("spin", "rotating");

  
  setTimeout(() => {
    const localURL = URL.createObjectURL(selectedFile);
    umberellaImage.classList.remove("loading-size");
    umberellaImage.src = lastImageSrc;
    icon.src = uploadiconsrc;

    umberellaImage.classList.remove("spin", "rotating");
    icon.classList.remove("spin", "rotating");

    logo.src = localURL;
    logo.style.display = "inline";
  }, 1500);
}

// Handle file input change
fileInput.addEventListener('change', function () {
  const file = fileInput.files[0];

  if (file) {
    // Validate type
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      alert('Only PNG and JPEG files are allowed.');
      fileInput.value = '';
      return;
    }

    // Validate size
    if (file.size > 5 * 1024 * 1024) {
      alert('File must be 5MB or smaller.');
      fileInput.value = '';
      return;
    }

    selectedFile = file; // Store selected file
    lastImageSrc = umberellaImage.src;
    uploadiconsrc = icon.src;

    btnText.textContent = file.name;
    removeBtn.style.display = 'inline';

    simulateLoading(); // Start loading animation
  }
});

// Handle logo removal
removeBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  fileInput.value = '';
  btnText.textContent = 'UPLOAD LOGO';
  icon.style.display = 'inline';
  removeBtn.style.display = 'none';
  logo.src = "";
  logo.style.display = "none";
  selectedFile = null;
});

//  Handle umbrella color change
function handleClick(color) {
 
 
  // Reset all color box borders
  const colorDivs = ['pink', 'yellow', 'blue'];
  colorDivs.forEach(id => {
    const div = document.getElementById(id);
    if (div) {
      div.style.border = "3px solid transparent"; 
    }
  });
  switch (color) {
    case "pink":
      umberellaImage.src = "./public/Pink_umbrella.png";
      document.body.style.backgroundColor = pink_background;
      document.getElementById("pink").style.border = `3px solid ${pink_border}`;
      document.getElementsByClassName("upload-btn-container")[0].style.backgroundColor = "#e21a70";
      selectedColor = pink_border;
      break;

    case "yellow":
      umberellaImage.src = "./public/Yellow_umbrella.png";
      document.body.style.backgroundColor = yellow_background;
      document.getElementById("yellow").style.border = `3px solid ${yellow_border}`;
      document.getElementsByClassName("upload-btn-container")[0].style.backgroundColor = "#ffcf43";
      selectedColor = yellow_border;
      break;

    case "blue":
      umberellaImage.src = "./public/Blue_umbrella.png";
      document.body.style.backgroundColor = blue_background;
      document.getElementById("blue").style.border = `3px solid ${blue_border}`;
      document.getElementsByClassName("upload-btn-container")[0].style.backgroundColor = "#38b2dc";
      selectedColor = blue_border;
      break;

    default:
      console.log("Invalid color");
  }

   //  If a logo was already selected, simulate loading again
  if (selectedFile) {
    lastImageSrc = umberellaImage.src;
    uploadiconsrc = icon.src;
    logo.style.display = "none"
    simulateLoading();
  }

}
