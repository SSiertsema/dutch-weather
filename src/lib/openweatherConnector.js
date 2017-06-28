import askAPI from './askAPI'
import config from '../config.json'
import cities from '../data/cities.NL.json'

const baseUrl = config.api.openweathermap.baseUrl
const appId = config.api.openweathermap.appId

/**
 * Returns city details from json file based on city name. For this mvp this dutch cities only.
 * @example
 * // returns "{"id":2744819,"name":"Gemeente Wervershoof","country":"NL","coord":{"lon":5.13333,"lat":52.716671}}"
 * getCityDetails("Gemeente Wervershoof")
 * @param cityName {string} - Name of city e.g. "london"
 * @return {Promise}
 */
export const getCityDetails = (cityName) => {
    return new Promise((resolve, reject) => {
        cityName = cityName.toLowerCase()
        for(let i=0; i<cities.length; i++){
            if(cityName === cities[i].name.toLowerCase()){
                resolve(cities[i])
            }
        }
    })
}

/**
 * Returns current weather for a specific city based on it's id
 * @example
 * // returns {object} - see http://openweathermap.org/current#parameter"
 * getCurrent("1851632")
 * @param cityId - Id of city defined by openweather
 * @return {Promise}
 */
export const getCurrent = (cityId) => {
    return new Promise((resolve) => {
        askAPI({
            url: `${baseUrl}/weather`,
            query: {
                appid: appId,
                id: cityId
            }
        })
        .then((result) => {
            resolve(result)
        })
    })
}


/**
 * Returns a five day forecast for a specific city based on it's id
 * @example
 * // returns {object} - see http://openweathermap.org/forecast5#parameter"
 * getForecast("1851632")
 * @param cityId - Id of city defined by openweather
 * @return {Promise}
 */
export const getForecast = (cityId) => {

    return new Promise((resolve) => {
        askAPI({
            url: `${baseUrl}/forecast`,
            query: {
                appid: appId,
                id: cityId
            }
        })
        .then((result) => {
            resolve(result)
        })
    })
}
