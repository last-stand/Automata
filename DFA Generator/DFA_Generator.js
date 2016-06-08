var DFA_Generator = function (statesSet, alphabetSet, initialState, finalState, trasitionFunction) {
  return function(input){
    var reducer = function(state, alphabet){
      return trasitionFunction[state][alphabet];
    }
    var currentState = input.split('').reduce(reducer, initialState);
    return finalState.includes(currentState);
  }
}
exports.DFA_Generator = DFA_Generator;
