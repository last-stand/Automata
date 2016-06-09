var _ = require('lodash');

var NFA_Generator = function (statesSet, alphabetSet, initialState, finalState, trasitionFunction) {
  return function(input){
    var reducer = function(state,alphabet){
        var nextState = state.map(function(currentState){
          return trasitionFunction[currentState][alphabet];
        });
        return _.flattenDeep(nextState);
    };
    var currentState = input.split('').reduce(reducer, [initialState]);
    return _.intersection( finalState ,currentState).length > 0;
  }
}
exports.NFA_Generator = NFA_Generator;
