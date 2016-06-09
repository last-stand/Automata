var nfa_gen = require('../NFA Generator/NFA_Generator');
var expect = require('chai').expect;

var statesSet = ['q1', 'q2', 'q3'];
var alphabetSet = ['0', '1'];
var initialState = 'q1';
var finalState = ['q3'];
var trasitionFunction = {
                         'q1':{'0':['q1'], '1': ['q1','q2']},
                         'q2':{'0':['q1'], '1': ['q2', 'q3']},
                         'q3':{'0':['q1'], '1': ['q3']}
                       };
var nfa = nfa_gen.NFA_Generator(statesSet, alphabetSet, initialState, finalState, trasitionFunction);

describe('| NFA_Generator |',function(){
  	beforeEach(function(){
  	});

  	describe('# NFA should accept if pair of ones at the end of the string',function(){
  		it('NFA should accept 11',function(done){
         expect(nfa('11')).to.equal(true);
         done();
  		})

      it('NFA should accept 11111',function(done){
         expect(nfa('11111')).to.equal(true);
         done();
  		})

      it('NFA should accept 00011',function(done){
         expect(nfa('00011')).to.equal(true);
         done();
  		})

      it('NFA should accept 100011',function(done){
         expect(nfa('100011')).to.equal(true);
         done();
  		})

      it('NFA should accept 010110110011',function(done){
         expect(nfa('010110110011')).to.equal(true);
         done();
  		})

      it('NFA should not accept 101',function(done){
         expect(nfa('101')).to.equal(false);
         done();
  		})

      it('NFA should not accept 000',function(done){
         expect(nfa('000')).to.equal(false);
         done();
  		})

      it('NFA should not accept 100',function(done){
         expect(nfa('100')).to.equal(false);
         done();
  		})

    })

})
