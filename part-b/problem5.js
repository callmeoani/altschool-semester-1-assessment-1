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