var nfa_gen = require('../NFA Generator/NFA_Generator_with_ε');
var expect = require('chai').expect;

var statesSet = ['q1', 'q2', 'q3', 'q4', 'q5'];
var alphabetSet = ['0', '1'];
var initialState = 'q1';
var finalState = ['q2', 'q4'];
var trasitionFunction = {
                'q1': {'e':['q2','q4'], '0':[], '1':[]},
                'q2': {'0':['q3'], '1':['q2']},
                'q3': {'0':['q2'], '1':['q3']},
                'q4': {'0':['q4'], '1':['q5']},
                'q5': {'0':['q5'], '1':['q4']}
            };

var nfa = nfa_gen.NFA_Generator(statesSet, alphabetSet, initialState, finalState, trasitionFunction);

describe('| NFA Generator with e |',function(){
  	beforeEach(function(){
  	});

  	describe('# NFA should accept strings that contains even number of 0s or 1s',function(){

      it('NFA should accept 11',function(done){
         expect(nfa('11')).to.equal(true);
         done();
  		})

      it('NFA should accept 00',function(done){
         expect(nfa('00')).to.equal(true);
         done();
  		})

      it('NFA should accept 001',function(done){
         expect(nfa('01010')).to.equal(true);
         done();
  		})

      it('NFA should accept 1001',function(done){
         expect(nfa('1001')).to.equal(true);
         done();
  		})

      it('NFA should accept 10101',function(done){
         expect(nfa('10101')).to.equal(true);
         done();
  		})

      it('NFA should accept 01010',function(done){
         expect(nfa('01010')).to.equal(true);
         done();
  		})

      it('NFA should accept 1011001',function(done){
         expect(nfa('10011001')).to.equal(true);
         done();
  		})

      it('NFA should not accept 10',function(done){
         expect(nfa('10')).to.equal(false);
         done();
  		})

      it('NFA should not accept 101010',function(done){
         expect(nfa('101010')).to.equal(false);
         done();
  		})

      it('NFA should not accept 10001111',function(done){
         expect(nfa('10001111')).to.equal(false);
         done();
  	  })

  });

  describe('# NFA should accept strings that contains consecutive N number of 0s or 1s',function(){
    it('NFA should not accept 1',function(done){
       expect(nfa('1')).to.equal(true);
       done();
    })

    it('NFA should not accept 0',function(done){
       expect(nfa('0')).to.equal(true);
       done();
    })

    it('NFA should not accept 111',function(done){
       expect(nfa('111')).to.equal(true);
       done();
    })

    it('NFA should not accept 00000',function(done){
       expect(nfa('00000')).to.equal(true);
       done();
    })
  });

  describe('# NFA should accept strings that contains 0 with two or three length',function(){
      it("should accept string with tuple_two_or_three_length with multiple epsilon transition",function(done){
          var statesSet = ['q1','q2','q3','q4','q5','q6','q7','q8','q9'];
          var alphabetSet = ['0'];
          var initialState = 'q1';
          var finalState = ['q4'];
          var trasitionFunction = {
                                    'q1':{'e':['q2','q5']},
                                    'q2':{'0':['q3']},
                                    'q3':{'0':['q4']},
                                    'q5':{'0':['q6']},
                                    'q6':{'0':['q7']},
                                    'q7':{'e':['q8']},
                                    'q8':{'e':['q9']},
                                    'q9':{'0':['q4']}
                                  };
          var nfa_two_or_three_length = nfa_gen.NFA_Generator(statesSet, alphabetSet, initialState, finalState, trasitionFunction);

          expect(nfa_two_or_three_length('0')).to.equal(false);
          expect(nfa_two_or_three_length('00')).to.equal(true);
          expect(nfa_two_or_three_length('000')).to.equal(true);
          done();
        });
  });
  describe('# NFA should accept strings that contains any number of 1s with utmost one zero',function(){
    it("should accept string any number of 1s with utmost one zero",function(done){
        var statesSet = ["q1","q3","q2","q5","q4"];
        var alphabetSet = ['0', '1'];
        var initialState = 'q1';
        var finalState = ["q3","q5"];
        var trasitionFunction = {
          "q1":{"e":["q2","q4"]},
          "q2":{"0":["q2"],"e":["q3"]},
          "q3":{"1":["q3"]},
          "q4":{"1":["q4"],"e":["q5"]},
          "q5":{"0":["q5"]}
        };
        var nfa = nfa_gen.NFA_Generator(statesSet, alphabetSet, initialState, finalState, trasitionFunction);
        expect(nfa('0')).to.equal(true);
        done();
    });
  });
});
