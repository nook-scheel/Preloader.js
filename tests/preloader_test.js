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
    var preloader = Preloader(['http://localhost/', 'http://localhost/']);
    
    it('should return a preloader object', function() {
      assert.typeOf( {tea: 'chai'}, 'object', 'we have an object' );
    });

    it('should return a list array', function() {
      assert.isArray( preloader.list(), 'we have an array' );
    });

    it('should return true if contains element', function() {
      assert.isTrue( preloader.start(0), 'in the list' );
    });

    it('should return false if not contains element', function() {
      assert.isFalse( preloader.start(2), 'is not in the list' );
    });
  })
})
