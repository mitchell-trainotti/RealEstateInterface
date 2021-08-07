const colTitles = ['Title', 'Link', 'Post Date', 'Rent', 'Bedrooms', 'Sqft', 'Neighborhood']
const exportedData = [];
exportedData.push(colTitles);
const minPrice = '2000'
const maxPrice = '3000'
const minBed = '1'
const minSqft = '700'
const url = `https://www.zillow.com/homes/for_rent/${minBed}-_beds/?searchQueryState=%7B%22mapBounds%22%3A%7B%22west%22%3A-122.46133594044552%2C%22east%22%3A-122.37035541066037%2C%22south%22%3A37.75982795247918%2C%22north%22%3A37.81983390088691%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22price%22%3A%7B%22min%22%3A823461%2C%22max%22%3A1235192%7D%2C%22mp%22%3A%7B%22min%22%3A${minPrice}%2C%22max%22%3A${maxPrice}%7D%2C%22beds%22%3A%7B%22min%22%3A1%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22manu%22%3A%7B%22value%22%3Afalse%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%2C%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22sqft%22%3A%7B%22min%22%3A${minSqft}%7D%2C%22cat%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A13%2C%22customRegionId%22%3A%22906d7610d7X1-CR1o9g1ju0ocigu_uh1re%22%7D`
const executeLookup = async () => {
    // const colTitles = [];
    // ExportedData.push(colTitles);
    const parser = new DOMParser();
    console.log(`Fetching: ${url}`)
    const res = await fetch(url);
    console.log(`Parsing html!`)
    const text = await res.text();
    var el = parser.parseFromString(text, "text/html");
    window.scrollTo(0,document.body.scrollHeight);

    var loadedResults = el.getElementsByClassName("list-card list-card-additional-attribution list-card_not-saved list-card_building");
    var unloadedResults = el.getElementsByClassName("list-card list-card-additional-attribution list-card_not-saved");


    // var loadedResults = el.getElementsByClassName("list-card-info");    
    // var unloadedResults = el.getElementsByClassName("list-card-info list-card-additional-attribution-space");


    var results = document.getElementsByTagName("article");

    var ind = 2;
    var info = results[ind].children[0].children[2].children[1].innerText;
    var rent = results[ind].children[0].children[2].children[0].innerText;
    rent = rent.slice(0,6);
    rent = rent.replace("," , "");
    rent = rent.trim();
    var title = results[ind].children[0].children[0].children[0].innerText;
    title = title.trim();
    var link = results[ind].children[0].children[0].href;

    propValues = [rent, title, link, info];
    console.log(propValues);
};



var ignore = await executeLookup();