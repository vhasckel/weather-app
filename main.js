const apiKey = "3c31ccf9d661c27eb017a5b6ca5bab14";
const cityInput = document.querySelector("#city-input");

let cityDefault = "Florianópolis";

async function getWeather(name) {
  try {
    var getData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${apiKey}&lang=pt_br`
    );

    var getDataConvert = await getData.json();

    if (getDataConvert.erro) {
      throw Error("algo deu errado");
    }
    var cityName = document.querySelector("#city-name");
    cityName.innerText = getDataConvert.name;

    var tempNow = document.querySelector("#number");
    tempNow.innerText = parseInt(getDataConvert.main.temp);

    var tempMax = document.querySelector("#max");
    tempMax.innerText = parseInt(getDataConvert.main.temp_max);

    var tempMin = document.querySelector("#min");
    tempMin.innerText = parseInt(getDataConvert.main.temp_min);

    var clouds = document.querySelector("#clouds-now");
    clouds.innerText = getDataConvert.weather[0].description;

    var icon = document.querySelector("#icon");
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${getDataConvert.weather[0].icon}.png`
    );
    console.log(getDataConvert);
    return getDataConvert;
  } catch (erro) {
    console.log(erro);
  }
}

cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather(cityInput.value);
    cityInput.value = "";
  }
});

getWeather(cityDefault);
