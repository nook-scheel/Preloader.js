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
    self.elements = {};
    return self;
  }

  K.prototype = Preloader.prototype;

  var loadStart = function(index, cb) {
    var image = document.createElement('img');
    var url = this.innerArray[index];
      
    this.elements[index] = image;

    this.elements[index].onload = function() {
      if(!this.executed) {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(null);
        this.executed = true;
        cb.apply(this, args);
      }
    };

    this.elements[index].onerror = function() {
      if(!this.executed) {
        var args = Array.prototype.slice.call(arguments);
                
        args.unshift('File not found');
        this.executed = true;
        cb.apply(this, args);
      } 
    }

    this.elements[index].src = url + '?cache=' + Math.random();
  };

  var loadClose = function(index, cb) {
    if(index in this.elements) {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(null);
      
      this.elements[index].src = '';
      
      cb.apply(this.elements[index], args);
    } else {
      cb('Element is not load');
    }
  }

  Preloader.prototype.loadStart = loadStart;
  Preloader.prototype.loadClose = loadClose;

  Preloader.prototype.list = function() {
    return this.innerArray;
  };

  Preloader.prototype.start = function(index, cb) {
    if(index in this.innerArray) {
      this.loadStart(index, cb);
    } else {
      cb.apply(this, ['Not list', {}])
    }
  };

  Preloader.prototype.stop = function(index, cb) {
    if(index in this.innerArray) {
      this.loadClose(index, cb);
    } else {
      cb.apply(this, ['Not list', {}]);
    }
  }

  window.Preloader = Preloader;
})(this);
