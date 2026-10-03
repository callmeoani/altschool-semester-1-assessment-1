// Problem 3 — Deep Freeze
function deepFreeze(obj) {
  
  // first ensure obj is of type 'object'
  if (typeof obj === 'object') {
    // carry out a shallow freeze
    Object.freeze(obj);
    
    //Now we will do a deep freeze
    // loop through the object
    for (key in obj) {
      // check for object value
      // if type is 'object' then use deepFree recursively
      if(typeof obj[key] === 'object') {
        deepFreeze(obj[key]);
      }
    }
  }
  else {
    alert("An argument of type 'object' expected!")
  }
  
  return obj;
}

const config = deepFreeze({ api: { baseUrl: 'https://x.com', retries: 3 }, debug: false })
config.api.baseUrl = 'https://changed.com' // should be ignored
config.debug = true                        // should be ignored
console.log(config.api.baseUrl, config.debug) // "https://x.com" false
console.log(Object.isFrozen(config.api))       // true