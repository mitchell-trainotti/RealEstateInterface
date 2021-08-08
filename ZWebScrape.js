const colTitles = ['Rent', 'Title', 'State & Zip', 'Link', 'Info'];
const exportedData = [];
exportedData.push(colTitles);

const minPrice = '2000'
const maxPrice = '3000'
const minBed = '1'
const minSqft = '700'
const url = `https://www.zillow.com/homes/for_rent/${minBed}-_beds/?searchQueryState=%7B%22mapBounds%22%3A%7B%22west%22%3A-122.46133594044552%2C%22east%22%3A-122.37035541066037%2C%22south%22%3A37.75982795247918%2C%22north%22%3A37.81983390088691%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22price%22%3A%7B%22min%22%3A823461%2C%22max%22%3A1235192%7D%2C%22mp%22%3A%7B%22min%22%3A${minPrice}%2C%22max%22%3A${maxPrice}%7D%2C%22beds%22%3A%7B%22min%22%3A1%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22manu%22%3A%7B%22value%22%3Afalse%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%2C%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22sqft%22%3A%7B%22min%22%3A${minSqft}%7D%2C%22cat%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A13%2C%22customRegionId%22%3A%22906d7610d7X1-CR1o9g1ju0ocigu_uh1re%22%7D`
const executeLookup = async () => {
    const parser = new DOMParser();
    console.log(`Fetching: ${url}`)
    const res = await fetch(url);
    console.log(`Parsing html!`)
    const text = await res.text();
    var el = parser.parseFromString(text, "text/html");
    window.scrollTo(0,0);
    pageScroll();

    var results = document.getElementsByTagName("article");
    var ind = 0;

    while (true){
        rent = "";
        title = "";
        link = "";
        info = "";

        info = results[ind].children[0].children[2].children[1].innerText;
        var rent = results[ind].children[0].children[2].children[0].innerText;

        info = info.replace(",","");
        rent = rent.slice(0,6);
        rent = rent.replace("," , "");
        rent = rent.trim();

        var title = results[ind].children[0].children[0].children[0].innerText;
        title = title.replace(",","");
        title = title.trim();
        var link = results[ind].children[0].children[0].href;
        if (link.includes(",")){
            link = "err , included"
        }
        propValues = [rent, title, link, info];
        exportedData.push(propValues);
        ind++
        if(ind==results.length){
            break
        }
    }
    exportToCsv(exportedData);
};

exportToCsv = function (ExportedData) {
    var fileName = ("Zillow.csv");
    var CsvString = "";
    ExportedData.forEach(function (RowItem, RowIndex) {
        RowItem.forEach(function (ColItem, ColIndex) {
            CsvString += ColItem + ',';
        });
        CsvString += "\r\n";
    });
    CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    var x = document.createElement("A");
    x.setAttribute("href", CsvString);
    x.setAttribute("download", fileName);
    document.body.appendChild(x);
    x.click();
}

function pageScroll() {
    window.scrollBy(0, 10); // horizontal and vertical scroll increments
    scrolldelay = setTimeout('pageScroll()', 10); // scrolls every 10 milliseconds
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
      clearTimeout(scrolldelay);
      scrolldelay = setTimeout('PageUp()', 2000);
    }
}

var ignore = await executeLookup();