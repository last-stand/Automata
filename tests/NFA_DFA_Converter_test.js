var nfa_dfa = require('../NFA to DFA Converter/NFA_DFA_Converter');
var dfa_gen = require('../DFA Generator/DFA_Generator');
var expect = require('chai').expect;

var touple = {};

describe('| NFA to DFA Converter |',function(){
  	beforeEach(function(){
  	});

  	describe("#  DFA should accept if pair of 'b' at the end of the string",function(){
        touple.statesSet = ['q1', 'q2', 'q3'];
        touple.alphabetSet = ['a', 'b'];
        touple.initialState = 'q1';
        touple.finalState = ['q3'];
        touple.trasitionFunction = {
                                 'q1':{'a':['q1'], 'b': ['q1','q2']},
                                 'q2':{'a':['q1'], 'b': ['q2', 'q3']},
                                 'q3':{'a':['q1'], 'b': ['q3']}
                               };
        var dfaTouple = nfa_dfa.NFA_DFA_Converter(touple);
        var dfa = dfa_gen.DFA_Generator(dfaTouple.statesSet, dfaTouple.alphabetSet, dfaTouple.initialState, dfaTouple.finalState, dfaTouple.trasitionFunction);

    		it('DFA should accept bb',function(done){
          expect(dfa('bb')).to.equal(true);
          done();
    		})

        it('NFA should accept bbbbb',function(done){
           expect(dfa('bbbbb')).to.equal(true);
           done();
    		})

        it('NFA should accept aaabb',function(done){
           expect(dfa('aaabb')).to.equal(true);
           done();
    		})

        it('NFA should accept baaabb',function(done){
           expect(dfa('baaabb')).to.equal(true);
           done();
    		})

        it('NFA should accept ababbabbabb',function(done){
           expect(dfa('ababbabbabb')).to.equal(true);
           done();
    		})

        it('NFA should not accept bab',function(done){
           expect(dfa('bab')).to.equal(false);
           done();
    		})

        it('NFA should not accept aaa',function(done){
           expect(dfa('aaa')).to.equal(false);
           done();
    		})

        it('NFA should not accept baa',function(done){
           expect(dfa('baa')).to.equal(false);
           done();
    		})
    });

    describe('# DFA should accept strings that contains any number of 1s with utmost one zero',function(){
      it("should accept string any number of 1s with utmost one zero",function(done){
          touple.statesSet = ["q1","q3","q2","q5","q4"];
          touple.alphabetSet = ['0', '1'];
          touple.initialState = 'q1';
          touple.finalState = ["q3","q5"];
          touple.trasitionFunction = {
            "q1":{"e":["q2","q4"]},
            "q2":{"0":["q2"],"e":["q3"]},
            "q3":{"1":["q3"]},
            "q4":{"1":["q4"],"e":["q5"]},
            "q5":{"0":["q5"]}
          };

          var dfaTouple = nfa_dfa.NFA_DFA_Converter(touple);
          var dfa = dfa_gen.DFA_Generator(dfaTouple.statesSet, dfaTouple.alphabetSet, dfaTouple.initialState, dfaTouple.finalState, dfaTouple.trasitionFunction);
          expect(dfa('0')).to.equal(true);
          done();
      });
    });
});
