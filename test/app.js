var ss = require('socketstream').start(),
    sinon = require('sinon');

describe('app.sendMessage', function(){
  it('when message has body its sent to everyone', function(done){
    ss.publish.all = sinon.spy();

    ss.rpc('app.sendMessage', 'foo', function(params){
      ss.publish.all.called.should.be.true
      done();
    });
  });

  it('when message has body is empty nothing is done', function(done) {
    ss.publish.all = sinon.spy();
    ss.rpc('app.sendMessage', '', function(params){
      ss.publish.all.called.should.be.false;
      done();
    });
  });
});
