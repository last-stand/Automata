var _ = require('lodash');

var NFA_Generator = function (statesSet, alphabetSet, initialState, finalState, trasitionFunction) {
    return function(input){
        var reducer = function(state,alphabet){
            return _.flattenDeep(stateMapper(trasitionFunction, state, alphabet));
        };
        var endState = [initialState];
        if(_.isEmpty(input))
            endState = _.flattenDeep(stateMapper(trasitionFunction, [initialState], input));
        else
            endState = input.split('').reduce(reducer, [initialState]);
        return _.intersection( finalState ,endState).length > 0;
    }
}

var epsilonStateMapper = function(trasitionFunction, currentState, alphabet){
  if(_.has(trasitionFunction[currentState],'ε'))
      return trasitionFunction[currentState]['ε'].map(function(state){
        if(_.isEmpty(alphabet))
          return epsilonStateMapper(trasitionFunction, state, alphabet);
        return trasitionFunction[state][alphabet];
      });
};

var stateMapper = function(trasitionFunction, state, alphabet){
  return state.map(function(currentState){
    if(trasitionFunction[currentState] == undefined){
        return [currentState];
      }
    return _.union(trasitionFunction[currentState][alphabet], epsilonStateMapper(trasitionFunction, currentState, alphabet));
  });
};
exports.NFA_Generator = NFA_Generator;
