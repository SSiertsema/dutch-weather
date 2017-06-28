/**
 * Flexible function to retrieve data from external sources
 * @param {Object} configuration - Preferred configuration of call to make.
 * @returns {Promise}
 */

const askAPI = (_config) => {

    // default configuration
    let config = {
        url: '/',
        method: 'GET',
        async: true,
        user: null,
        password: null,
        responseType: 'json'
    }

    // overwrite default settings with config given
    config = Object.assign(config, _config);

    // add query string to url if needed
    if( typeof config.query !== 'undefined' &&
        Object.prototype.toString.call( config.query ) === '[object Object]' ){
        config.url += '?' + createQueryString( config.query );
    }

    // do the promise
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(config.method, config.url, config.async, config.user, config.password)
        xhr.responseType = config.responseType
        xhr.onload = () => resolve(xhr.response)
        xhr.onerror = () => reject(config)
        xhr.send()
    });

};


/**
 * Transform query object to queryString
 * @example
 * // returns "q=value&cities[]=amsterdam&cities[]=berlin"
 * createQueryString({ q: "value", cities: ["amsterdam", "berlin"]})
 * @param queryObject - containing keys and values
 * @returns {string} Returns query string converted from query object
 */
const createQueryString = (queryObject) => {
    let queryParts = [];
    for(let key in queryObject){
        const value = queryObject[key]
        // if value is array we should add values multiple times
        if(Object.prototype.toString.call( value ) === '[object Array]'){
            for(let i=0; i<value.length; i++){
                queryParts.push(key + '[]=' + value[i] )
            }
        }
        else {
            queryParts.push(key + '=' + value )
        }
    }
    return queryParts.join('&');
}


export default askAPI
