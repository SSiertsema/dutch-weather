/**
 * Extract Country Cities from enormous open weather city file
 */
const fs = require('fs')
const cities = require('../src/data/city.list.min.json')

let countryCode = process.argv[2];

// validate country code
if(typeof countryCode === 'string' && countryCode.length === 2){
    // we expect county code to be upper cased
    countryCode = countryCode.toLocaleUpperCase()
    const filteredCities = cities.filter((city)=>{
        if(city.country === countryCode){
            return city;
        }
    })

    fs.writeFile(`./src/data/cities.json`, JSON.stringify(filteredCities), 'utf8')
    // fs.writeFile(`./src/data/cities.${countryCode}.json`, JSON.stringify(filteredCities), 'utf8')
}
else {
    console.error(`Argument country code not valid. We expect 2 letters. For example 'NL'. We recieved '${countryCode}'`)
}
