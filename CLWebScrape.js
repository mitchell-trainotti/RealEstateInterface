
// img1 = <img src="https://images.craigslist.org/00p0p_1HxVI3blK98z_0c6095_600x450.jpg" title="1" alt="1"></img>

const colTitles = ['Title', 'Link', 'Post Date', 'Rent', 'Bedrooms', 'Sqft', 'Neighborhood']
const exportedData = [];
exportedData.push(colTitles);
const searchDistance = '1.2'
const zipCode = '94123'
const minPrice = '2000'
const maxPrice = '3000'
const minBed = '1'
const maxBed = '2'
const minSqft = '700'

const url = `https://sfbay.craigslist.org/search/sfc/hhh?bundleDuplicates=1&search_distance=${searchDistance}&postal=${zipCode}&min_price=${minPrice}&max_price=${maxPrice}&min_bedrooms=${minBed}&max_bedrooms=${maxBed}&minSqft=${minSqft}&availabilityMode=0&pets_cat=1&sale_date=all+dates`



const executeLookup = async () => {
    // const colTitles = [];
    // ExportedData.push(colTitles);
    const parser = new DOMParser();
    console.log(`Fetching: ${url}`)
    const res = await fetch(url);
    console.log(`Parsing html!`)
    const text = await res.text();
    var el = parser.parseFromString(text, "text/html");

    var results = el.getElementsByClassName("result-info");


    // while (true){

    //     exportedData.push(propValues);
    //     if(true){
    //         break
    //     }
    // }
    var title = results[0].childNodes[5].textContent;
    title = title.replace(/(\r\n|\n|\r|,|=)/gm, " ");
    title = title.trim();

    var link = results[0].childNodes[5].firstElementChild.href;
    var postDate = results[0].childNodes[3].textContent;
    var generalInfo = results[0].childNodes[7].textContent;
    var generalValues = parseGeneralInfo(generalInfo);

    propValues = [title, link, postDate]
    propValues.push(...generalValues);
    exportedData.push(propValues);

};

function parseGeneralInfo(generalInfo){
    var rent = generalInfo.slice(generalInfo.indexOf("$"),generalInfo.indexOf("$")+6);
    var brCount = generalInfo.slice(generalInfo.indexOf("br")-2,generalInfo.indexOf("br"));
    var sqft = generalInfo.slice(generalInfo.indexOf("ft2")-4,generalInfo.indexOf("ft2"));
    var address = generalInfo.slice(generalInfo.indexOf("(")+1,generalInfo.indexOf(")"));
    var address = address.slice(0,address.indexOf(","));

    generalValues = [rent,brCount, sqft, address];
    return generalValues;
}

var ignore = await executeLookup();
console.log(exportedData);