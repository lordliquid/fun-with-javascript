'use strict';
let map = new WeakMap();

let internal = function (object) {
  if (!map.has(object)) {
    map.set(object, {});
  }
  return map.get(object);
};

class Store {
  constructor() {
    let hist = [];
    let state = {};
    this.count = 0;
    internal(this).hist = hist;
    internal(this).state = state;
  }
};
  
Store.prototype.setState = function (obj) {
  if(typeof obj !== 'object'){
    console.error('.setState() expects an object and instead received ' + typeof obj + ' type.');
    return this;
  }

  for(var o in obj){
    this.count++;
    internal(this).state[o] = obj[o];
  }

  return obj;
}

Store.prototype.getState = function () {
  console.log(internal(this).state); // Remove this later
  return internal(this).state;
}


Store.prototype.saveStateHistory = function () {
  let date = Date();
  let state = Object.assign({...internal(this).state, date});
  internal(this).hist.push(state);
  return internal(this).hist;
}

Store.prototype.getStateHistory = function () {
  console.log(internal(this).hist); // Remove this later
  return internal(this).hist;
}

var store = new Store();
store.setState({cool: 'stuff', prop: 'awesome'});

setTimeout(() => {
  store.setState({cool: 'better', wow: 'someting'});
  store.getState();
  store.getStateHistory();
  store.saveStateHistory();
  store.getStateHistory();
}, 5000);

store.saveStateHistory();
store.getStateHistory();

console.log(store.hist);
