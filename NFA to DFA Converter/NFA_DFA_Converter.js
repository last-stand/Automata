var _ = require('lodash');
var epsilon = 'e';
var NFA_DFA_Converter = function(touple){
    var dfaTouple = {};
    dfaTouple.alphabetSet = touple.alphabetSet;
    dfaTouple.statesSet = _.map(getAllStateCombinations(touple.statesSet), function(state){ return state.join('') });
    dfaTouple.trasitionFunction = getDFATransitionTable(touple.trasitionFunction, touple.alphabetSet, touple.statesSet);
    dfaTouple.initialState = getDFAInitialState(touple.trasitionFunction, [touple.initialState])[0];
    dfaTouple.finalState = getDFAFinalStates(dfaTouple.statesSet, touple.finalState);
    return dfaTouple;
}

var getDFAInitialState = function(trasitionFunction, initialState){
   return epsilonStateMapper(trasitionFunction, initialState).sort(ascendingSort).join('');
};

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

var getDFAFinalStates = function(statesSet, finalStates){
    return statesSet.filter(function(state){
        return isInFinalStateSet(finalStates, state).indexOf(true) > -1;
    });
};

var isInFinalStateSet = function(finalStates, state){
  return _.map(finalStates, function(elementState){
      return state.indexOf(elementState) > -1;
  });
};

var getDFATransitionTable = function(trasitionFunction, alphabetSet, statesSet){
  var resultSet = {};
  _.forEach(getAllStateCombinations(statesSet), function(states){
    var newState = resultSet[states.sort(ascendingSort).join('')] = {}
      statesTraverse(states, alphabetSet, newState, trasitionFunction);
  });
  combineStateName(resultSet, alphabetSet);
  return resultSet;
}

var combineStateName = function(transitionTable, alphabetSet) {
    _.forEach(transitionTable, function(transition, keyState){
        _.forEach(alphabetSet, function(alphabet){
            if(transition[alphabet])
                transition[alphabet] = transition[alphabet].join('');
        });
  });
}

var statesTraverse = function(states, alphabetSet, newState, trasitionFunction){
    _.forEach(states, function(state){
        alphabetTraverse(state, alphabetSet, newState, trasitionFunction);
    });
};

var alphabetTraverse = function(state, alphabetSet, newState, trasitionFunction){
    _.forEach(alphabetSet, function(alphabet){
      if(!_.isEmpty(trasitionFunction[state]))
        newState[alphabet] = _.union(trasitionFunction[state][alphabet], newState[alphabet]).sort(ascendingSort);
    });
}

var ascendingSort = function(first,next){
  return first>next;
}

var combinationReducer = function(resultSet, element) {
    return _.map(resultSet, function(state){
        return state.concat(element);
    }).concat(resultSet);
};

var getAllStateCombinations = function(statesSet) {
    return _.reduce(statesSet, combinationReducer, [[]]);
}



exports.NFA_DFA_Converter = NFA_DFA_Converter;
