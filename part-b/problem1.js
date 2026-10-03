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