// ==========================================================================
// Project:   preloader
// Copyright: ©2012 Pumpkin Inc. All rights reserved.
// ==========================================================================
(function(window) {
  var K = function() {},
      document = window.document;
  
  // Constructor that supports either Preloader([]) or new
  // Preloader([]);
  // 
  // Takes a array as the argument.
  
  var Preloader = function(array) {
    var self;

    if(this instanceof Preloader) {
      self = this;
    } else {
      self = new K();
    }

    self.innerArray = array;
    return self;
  }

  K.prototype = Preloader.prototype;

  Preloader.prototype.list = function() {
    return this.innerArray;
  };
  Preloader.prototype.start = function( index ) {
    if( index in this.innerArray )
      return true;
    else
      return false;
  };

  window.Preloader = Preloader;
})(this);
