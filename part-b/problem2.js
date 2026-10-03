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