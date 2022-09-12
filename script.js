const dropdownMenu = document.getElementById("dropdownMenu");
const btn = document.getElementById("submit");
const countryList = document.getElementById("countryList");
const countryInput = document.getElementById("country-input");
const allCountriesDiv = document.getElementById("all-countries");
const submitBtn = document.getElementById("submit");
const showAllBtn = document.getElementById("show-all");
const itemName = document.getElementById("item-name");

let countries = [];
load();

function pushValueToArray() {
  countries.push(countryInput.value);
  countryInput.value = "";
  localStorage.setItem("item", JSON.stringify(countries));
  console.log(countries);
}

function load() {
  const parsedData = JSON.parse(localStorage.getItem("item"));

  for (item of parsedData) {
    countries.push(item);
    console.log(countries);
    setData(countries, countryList);
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

submitBtn.addEventListener("click", function () {
  pushValueToArray();
});

countryInput.addEventListener("input", function () {
  const filteredData = searchCountry(countryInput.value, countries);
  setData(filteredData, countryList);
});

countryList.addEventListener("click", function(e){
    itemName.innerHTML = e.target.innerHTML
})