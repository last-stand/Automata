var DFA_Generator = function (statesSet, alphabetSet, initialState, finalState, trasitionFunction) {
  return function(input){
    var processor = function(state, alphabet){
      return trasitionFunction[state][alphabet];
    }
    var currentState = input.split('').reduce(processor, initialState);
    return finalState.includes(currentState);
  }
}
exports.DFA_Generator = DFA_Generator;
