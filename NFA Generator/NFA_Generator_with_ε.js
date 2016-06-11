var _ = require('lodash');
var epsilon = 'e';
var NFA_Generator = function (statesSet, alphabetSet, initialState, finalState, trasitionFunction) {
    return function(input){
        var endState;
        if(_.isEmpty(input))
          endStates = _.flattenDeep(epsilonStateMapper(trasitionFunction, [initialState]));
        else
          endStates = input.split('').reduce(function(states, alphabet){
              var epslonReturn = epsilonStateMapper(trasitionFunction, states);
              var alphabetReturn = alphabetStateMapper(epslonReturn, trasitionFunction, alphabet);
              return epsilonStateMapper(trasitionFunction, alphabetReturn);
          }, [initialState]);
        return _.intersection( finalState ,endStates).length > 0;
    }
}

var epsilonStateMapper = function(trasitionFunction, states){
    var eStates = _.flattenDeep(states.map(function(state){
      if(_.isEmpty(trasitionFunction[state]))
          trasitionFunction[state] = {epsilon: []};
      return trasitionFunction[state][epsilon] || [];
    }));
    if(_.difference(eStates, states).length > 0)
        return epsilonStateMapper(trasitionFunction, _.union(eStates, states));
    return states;
};

var alphabetStateMapper = function(states, trasitionFunction, alphabet){
  return _.flattenDeep(states.map(function(state){
        return trasitionFunction[state][alphabet] || [];
  }));
};
exports.NFA_Generator = NFA_Generator;
