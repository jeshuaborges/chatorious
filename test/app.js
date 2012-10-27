var ss    = require('socketstream').start(),
    sinon = require('sinon');

describe('app.sendMessage', function(){
  describe('when message body is valid', function() {
    it('broadcasts', function(done){
      ss.publish.all = sinon.spy();

      ss.rpc('app.sendMessage', 'foo', function(params){
        ss.publish.all.called.should.be.true
        done();
      });
    });

    it('responds with true',function(done) {
      ss.rpc('app.sendMessage', 'foobar', function(params){
        params[0].should.be.true;
        done();
      });
    });
  });

  describe('when message body is valid', function() {
    it('does not broadcast', function(done) {
      ss.publish.all = sinon.spy();
      ss.rpc('app.sendMessage', '', function(params){
        ss.publish.all.called.should.be.false;
        done();
      });
    });

    it('responds with false',function(done) {
      ss.rpc('app.sendMessage', '', function(params){
        params[0].should.be.false;
        done();
      });
    });
  });
});

describe('app.authenticate', function() {
  it('sets the session user id', function(done) {
    ss.rpc('app.authenticate', 'username', function(params) {
      params[0].should.be.true;
      done();
    });
  });
});

