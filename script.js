const dropdownMenu = document.getElementById("dropdownMenu");
const btn = document.getElementById("submit");
const countryList = document.getElementById("countryList");
const countryInput = document.getElementById("country-input");
const allCountriesDiv = document.getElementById("all-countries");
const submitBtn = document.getElementById("submit");
const showAllBtn = document.getElementById("show-all-btn");
const itemName = document.getElementById("item-name");
const showAllDiv = document.getElementById("show-all-div");
const clearAllBtn = document.getElementById("clear-all-btn");

let countries = [];
let x;
load();

function pushValueToArray() {
  if (countryInput.value.length > 2) {
    countries.push(countryInput.value);
    countryInput.value = "";
    localStorage.setItem("item", JSON.stringify(countries));
    console.log(countries);
  }
}

function load() {
  const parsedData = JSON.parse(localStorage.getItem("item"));
  if (parsedData) {
    for (item of parsedData) {
      countries.push(item);
      console.log(countries);
      setData(countries, countryList);
    }
  }
}

function setData(data, element) {
  element.innerHTML = "";
  let innerElement = "";

  if (data) {
    data.forEach((item) => {
      innerElement += `<li><a class="dropdown-item" href="#">${item}</a></li>`;
    });
    element.innerHTML = innerElement;
  }
}

function searchCountry(value, data) {
  if (value) {
    return data.filter((element) =>
      element.toLowerCase().includes(value.toLowerCase())
    );
  }
}

function clearAll() {
  itemName.innerHTML = "";
  showAllDiv.innerHTML = "";
  countryList.innerHTML = "";
  countryInput.value = "";
  localStorage.clear();
  countries = [];
  x = 1;
}

submitBtn.addEventListener("click", function () {
  pushValueToArray();
  x = false;
});

countryInput.addEventListener("input", function () {
  const filteredData = searchCountry(countryInput.value, countries);
  if (!x) {
    setData(filteredData, countryList);
    console.log(x);
  }
});

countryList.addEventListener("click", function (e) {
  itemName.innerHTML = e.target.innerHTML;
});
let sortedCountries = [];
showAllBtn.addEventListener("click", function () {
  console.log(showAllDiv);
  let x = 0;
  sortedCountries = countries.sort().map((item) => `<li class="country-item"> ${item}</li> <br>`).join("");
  showAllDiv.innerHTML = sortedCountries;
});

function randomBackgroundColor(){
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


showAllDiv.addEventListener("click", function (e) {
  if (e.target === e.target.closest(".country-item")) {
    e.target.style.backgroundColor = randomBackgroundColor();
  }

})


clearAllBtn.addEventListener("click", function () {
  clearAll();
});
