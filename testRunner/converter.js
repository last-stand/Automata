// require your nfa/dfa generator libs here
// ex:
var dfaGen=require('../DFA Generator/DFA_Generator');
var nfaGen=require('../NFA Generator/NFA_Generator_with_ε');
var nfa_dfa_converter = require('../NFA to DFA Converter/NFA_DFA_Converter');


/*

Implement the following function to return
a dfa or an nfa.
The function accepts two variables, a type and a tuple.
The type a string of value nfa or dfa.
The tuple consists of:
      tuple.states is an array of states.
      tuple.alphabets is an array of alphabets.
			tuple.delta is a transition function.
      tuple["start-state"] is a single state.
      tuple["final-states"] is an array of states.

You will have to do the work of converting this tuple into a format
that your generator will accept as function arguments. Return either an nfa
or a dfa based on the tuple.
*/

exports.finiteAutomata = function(type,tuple){
    var statesSet = tuple.states;
    var alphabetSet = tuple.alphabets;
    var initialState = tuple["start-state"];
    var finalState = tuple["final-states"];
    var trasitionFunction = tuple.delta;
    switch(type){
      case "dfa":
          return dfaGen.DFA_Generator(statesSet, alphabetSet, initialState, finalState, trasitionFunction);
      case "nfa":
          return nfaGen.NFA_Generator(statesSet, alphabetSet, initialState, finalState, trasitionFunction);
      case "nfa-to-dfa":
          touple = nfa_dfa_converter.NFA_DFA_Converter(touple);
          return dfaGen.DFA_Generator(tuple.states, tuple.alphabets, tuple["start-state"], tuple["final-states"], tuple.delta);
    }
    console.log("Please provide proper finiteAutomata.");
}
