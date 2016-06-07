var dfa_gen = require('../DFA Generator/DFA_Generator');
var expect = require('chai').expect;

var statesSet = ['q1', 'q2', 'q3'];
var alphabetSet = ['0', '1'];
var initialState = 'q1';
var finalState = ['q3'];
var trasitionFunction = {
                         'q1':{'0': 'q1', '1':'q2'},
                         'q2':{'0': 'q4', '1':'q3'},
                         'q3':{'0': 'q3', '1':'q2'},
                         'q4':{'0': 'q4', '1':'q4'},
                        }

var dfa = dfa_gen.DFA_Generator(statesSet, alphabetSet, initialState, finalState, trasitionFunction);
describe('DFA_Generator',function(){
  	beforeEach(function(){
  	});

  	describe('# DFA should accept pair of ones',function(){
  		it('DFA should accept 11',function(done){
         expect(dfa('11')).to.equal(true);
         done();
  		})

      it('DFA should accept 11000011',function(done){
        expect(dfa('11000011')).to.equal(true);
        done();
      })

      it('DFA should accept 11000',function(done){
        expect(dfa('11000')).to.equal(true);
        done();
      })

      it('DFA should accept 00011',function(done){
        expect(dfa('00011')).to.equal(true);
        done();
      })

      it('DFA should accept 111111',function(done){
        expect(dfa('111111')).to.equal(true);
        done();
      })

      it('DFA should accept 1111001101100011',function(done){
        expect(dfa('1111001101100011')).to.equal(true);
        done();
      })

      it('DFA should not accept 101',function(done){
        expect(dfa('101')).to.equal(false);
        done();
      })

      it('DFA should not accept 1011',function(done){
         expect(dfa('1011')).to.equal(false);
         done();
  		})

      it('DFA should not accept 11111',function(done){
         expect(dfa('11111')).to.equal(false);
         done();
  		})

  	})
})
