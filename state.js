class State {
  constructor(name) {
    this.name = name;
    this.count = 0;
  }
  
  setState(obj) {

    if(typeof obj !== 'object'){
      console.log('This was called');
      return this;
    }

    for(var o in obj){
      this.count++;
      let key = o;
      this[key] = obj[key];
    }
    
    return this;
  }

  
  getState() {
    return this;
  }
  
};

var state = new State('My State');
var myfunc = () => { return 'function' }
state.setState({test: myfunc });

console.log(state.test())

console.log(state.getState());
