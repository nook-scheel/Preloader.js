// Support running the tests in a browser where we won't have `require`.
if (typeof require === 'function') {
  // We are running in Node.
  var assert = require('chai').assert;
}
else {
  // We are running in the browser.
  var assert = chai.assert;
}

describe('Preloader.js', function(){
  describe('#Preloader()', function(){
    // Preloader init
    var preloader = Preloader(['http://afisha.mail.ru/ext/pic/423880/', 'http://pumpkincorp.com/image']);
    
    it('should return a preloader object', function() {
      assert.typeOf( preloader, 'object', 'we have an object' );
    });

    it('should return a list array', function() {
      assert.isArray( preloader.list(), 'we have an array' );
    });

    it('should stop loading image', function(done) {
      this.timeout(10000);
      preloader.start(1, function(err, event) {
        assert.equal(err, 'File not found', 'there was no error');
      });

      preloader.stop(1, function(err, event) {
        assert.isNull(err, 'there was no error');
        done();
      });
    });

    it('should load the image and call callback', function(done) {
      preloader.start(0, function(err, event) {
        assert.isNull(err, 'there was no error');
        done();
      });
    });

    it('should callback return err if not contains element', function(done) {
      preloader.start(2, function(err, event) {
        assert.equal(err, 'Not list', 'is not in the list');
        done();
      });
    });
  });
});
