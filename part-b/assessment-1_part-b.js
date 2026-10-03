
// Problem 1 — Deep Equal
function deepEqual(objA, objB) {
    let isEqual = true;
    
  for (key in objA) {
    // check whether ObjB has all keys of ObjA
    if(!(Object.hasOwn(objB, key))) {
      isEqual = false;
      break;
    }else {
      // check that typeof key's value are the same for both
      if(typeof objA[key] !== typeof objB[key]) {
        isEqual = false;
        break;
      }
      else {
        if (typeof objA[key] !== 'object') {
          if (objA[key] !== objB[key]) {
            isEqual = false;
            break;
          }
        }
        else {
           return deepEqual(objA[key], objB[key]);
        }
      }
    }
  }
  
  // check whether objB has what objA doesn't
  for (key in objB) {
    if (!(Object.hasOwn(objA, key))){
      isEqual = false;
      break;
    }
  }
    
  return isEqual
} 

console.log(deepEqual({a:1, b:{c:2}}, {a:1, b:{c:2}}));

console.log(deepEqual({a:1, b:{c:2}}, {a:1, b:{c:3}}));

console.log(deepEqual({a:1}, {a:1, b:2}));




// Problem 2 — Object Diff
function diffObjects(oldObj, newObj) {
  const removed = {};
  const changed = {};
  let result = {};

  // check for removal and changes
  for (key in oldObj) {
    // solve for removal
    if(!(key in newObj)) {
      removed[key] = oldObj[key];
      result["removed"] = removed;
    }
    else {
      // solve for change
      if (oldObj[key] !== newObj[key]) {
        changed[key] = {
          from: oldObj[key],
          to: newObj[key]
        }
        result["changed"] = changed;
      }
    }
  }
  
  // check for new addtions
  for (key in newObj) {
    // solve for addition
    if(!(key in oldObj)) {
      const added = {};
      added[key] = newObj[key];
      result["added"] = added;
    }
  }
  
  return result;
}

console.log(diffObjects(
  { name: 'Setemi', role: 'Engineer', country: 'Jamaica', age: 18, hobby: "reading" },
  { name: 'Setemii', role: 'Senior Engineer', city: 'Kingston' }
))


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


// Problem 4 — Private Counter Factory
function createCounter() {
  let count = 0;
  
  return {
    increment() {
      ++count;
      return count;
    },
    decrement() {
      --count;
      return count;
    },
    get value() {
      return count;
    }
  }
}

const counter = createCounter()
counter.increment()
console.log("count: ", counter.value)
counter.increment()
console.log("count: ", counter.value)
counter.decrement()
console.log("count: ", counter.value)  // 1
console.log(counter.count) 


// Problem 5 — Schema Validator
function validateSchema(obj, schema) {
  const result= [];
  
  for (key in schema) {
    if(!(Object.hasOwn(obj, key))) {
      const errorMsg = `${key}: missing property`;
      result.push(errorMsg);
    }
    else {
      if (typeof obj[key] !== schema[key]) {
        const errorMsg = `${key}: expected ${schema[key]}, got ${typeof obj[key]}`
        result.push(errorMsg);
      }
    }
  }
  
  return result;
}

const schema = { name: 'string', age: 'number', isAdmin: 'boolean' }
console.log(validateSchema({ name: 'Ada', age: 21, isAdmin: false }, schema))
// []
console.log(validateSchema({ name: 'Ada', age: '21' }, schema))