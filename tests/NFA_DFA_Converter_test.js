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

    describe('# 0*1* or 1*0*',function(){
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

      //  pass-cases\":[\"\",\"0\",\"1\",\"00\",\"11\",\"001\",\"110\",\"011\",\"100\",\"0011\",\"1100\"],\"fail-cases\":[\"101\",\"010\",\"11001\",\"00110\",\"0101\",\"1010\"]
      it("should accept empty string",function(done){
          expect(dfa('')).to.equal(true);
          done();
      });

      it("should accept string with one 0 or one 1",function(done){
          expect(dfa('0')).to.equal(true);
          expect(dfa('1')).to.equal(true);
          done();
      });

      it("should accept string with pair of 0's or 1's",function(done){
          expect(dfa('00')).to.equal(true);
          expect(dfa('11')).to.equal(true);
          done();
      });
      
    });
});
