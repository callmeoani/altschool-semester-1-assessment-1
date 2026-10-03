// Problem 4 — Private Counter Factory
function createCounter() {
  let count = 0;
  
  // create another scope which whose content will be the one accessible from outside.
  return {
    increment() {
      ++count;
      return count;
    },
    decrement() {
      --count;
      return count;
    },
    get value() { // a getter function
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