const root = document.getElementById("root");

// Funktion för att hämta besökta städer från localStorage
//Ändrar från string till number
function loadVisitedCities() {
    const visited = JSON.parse(localStorage.getItem('visitedCities')) || [];
    return visited.map(id => Number(id));
};

// Funktion för att skapa top-sectionen
function createTopSection() {
    //Skapa topsection-div för att lägga länderna inuti
    const topSection = document.createElement("div");
    topSection.classList.add("top-section");
    root.appendChild(topSection);

    //Hämta data från land.json
    fetch("land.json")
        .then(res => res.json())
        .then(data => {
            data.map(country => {
                //Skapa en div-container för varje land
                const countryContainer = document.createElement("div");
                countryContainer.classList.add("country");
                countryContainer.innerText = country.countryname + " - ";
                topSection.appendChild(countryContainer);
                //Lägg till en eventlistener för att visa städerna i det specifika landet
                countryContainer.addEventListener("click", () => showCities(country.id));
                topSection.appendChild(countryContainer);

            })
            //Skapa en div för att länka till sidan med besökta städer
            const visitedCities = document.createElement("div");
            visitedCities.innerText = "Besökta städer";
            visitedCities.classList.add("visited-cities");
            visitedCities.addEventListener("click", showVisitedCities);
            topSection.appendChild(visitedCities);
        })
    
}

//Funktion för att visa städerna i en specifik land
function showCities(countryId) {
    //Om main-section inte hittas, kallas funktionen för att skapa den
    const mainSection = document.querySelector('.main-section') || createMainSection();
    mainSection.innerHTML = '';

    //Hämta data från stad.json
    fetch("stad.json")
        .then(res => res.json())
        .then(data => {
            //Använd filter för att hämta städerna som matchar det land som klickas på
            cities = data.filter(city => city.countryid === countryId);
            //För varje stad i cities, skapa en div och lägg till stadens namn
            cities.map(city => {
                const cityDiv = document.createElement('div');
                cityDiv.classList.add('city');

                const cityName = document.createElement('div');
                cityName.innerText = city.stadname;
                cityDiv.appendChild(cityName);
                //Skapar en div, hämtar "population:" och lägger till den i en div
                //Använder display none för att dölja invånarantal i start.
                const cityPopulation = document.createElement('div');
                cityPopulation.classList.add('population');
                cityPopulation.style.display = 'none';
                cityPopulation.innerText = `Invånare: ${city.population}`;
                cityDiv.appendChild(cityPopulation);
                //Visar invånarantal när staden klickas på och döljer det när staden klickas på igen via 'none'
                //Använder event.target !== checkbox för att undvika att dölja invånarantalet när checkboxen klickas på
                cityDiv.addEventListener('click', (event) => {
                    if (!checkboxContainer.contains(event.target)) {
                        cityPopulation.style.display = cityPopulation.style.display === 'none' ? 'block' : 'none';
                    }
            });

            //Skapar en checkbox för att markera staden som besökt
            //Lägger till .id på checkboxen för att kunna hänvisa till specific stad
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `checkbox-${city.id}`;
            checkbox.classList.add('city-checkbox');
            cityPopulation.appendChild(checkbox);

            let visitedCities = loadVisitedCities();
            checkbox.checked = visitedCities.includes(city.id);
            checkbox.addEventListener('change', (event) => {
                let visitedCities = loadVisitedCities();
                if (event.target.checked) {
                    if (!visitedCities.includes(city.id)) {
                        visitedCities.push(city.id);
                    }} else {
                    visitedCities = visitedCities.filter(id => id !== city.id);
                }
                localStorage.setItem('visitedCities', JSON.stringify(visitedCities));
            });
                    
            cityPopulation.appendChild(checkbox);

            const label = document.createElement('label');
            label.htmlFor = `checkbox-${city.id}`;
            label.innerText = 'Besökt';

            //Använder div för att placera checkboxen och labelen i samma container
            const checkboxContainer = document.createElement('div');
            checkboxContainer.classList.add('checkbox-container');
            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(label);
            cityPopulation.appendChild(checkboxContainer);

            mainSection.appendChild(cityDiv);
            });
        });
}

createTopSection();

function createMainSection() {
    const mainSection = document.createElement('div');
    mainSection.classList.add('main-section');
    root.appendChild(mainSection);
    return mainSection;
}

//Funktion för att visa besökta städer
function showVisitedCities() {
    const mainSection = document.querySelector('.main-section') || createMainSection();
    mainSection.innerHTML = '';
    //Kallar på funktionen för att hämta besökta städer
    const visitedCityIds = loadVisitedCities();

    fetch("stad.json")
        .then(res => res.json())
        .then(data => {
            const visitedCities = data.filter(city => visitedCityIds.includes(city.id));
            let totalPopulation = 0;
            
            visitedCities.map(city => {
                const cityDiv = document.createElement('div');
                cityDiv.classList.add('city');

                const cityName = document.createElement('div');
                cityName.innerText = city.stadname;
                cityDiv.appendChild(cityName);

                const cityPopulation = document.createElement('div');
                cityPopulation.innerText = `Invånare: ${city.population}`;
                cityDiv.appendChild(cityPopulation);

                mainSection.appendChild(cityDiv);

                totalPopulation += city.population;
            });

            //Skapa div för total befolkning
            const totalPopulationDiv = document.createElement('div');
            totalPopulationDiv.classList.add('total-population');
            totalPopulationDiv.innerText = `Totalt invånare du träffat: ${totalPopulation}`;
            mainSection.appendChild(totalPopulationDiv);

        });
    //Skapa knapp för att ta bort besökta städer
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Ta bort besökta städer';
    removeButton.addEventListener('click', removeVisitedCities);
    mainSection.appendChild(removeButton);
}
//Funktion för att rensa besökta städer ur localStorage
function removeVisitedCities() {
    localStorage.removeItem('visitedCities');
    showVisitedCities();
}