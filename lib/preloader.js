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

    this.elements[index].onload = function(e) {
      if(!this.executed) {
        this.executed = true;
        cb.call(this, null, e);
      }
    };

    this.elements[index].onerror = function(e) {
      if(!this.executed) {
        this.executed = true;
        cb.call(this, 'File not found', e);
      } 
    }

    this.elements[index].src = url + '?cache=' + Math.random();
  };

  var loadClose = function(index, cb) {
    if(index in this.elements) {
      this.elements[index].src = '';
      cb.call(this.elements[index], null);
    } else {
      cb.call(false, 'This element was not in loading');
    }
  }

  Preloader.prototype.list = function() {
    return this.innerArray;
  };

  Preloader.prototype.start = function(index, cb) {
    if(index in this.innerArray) {
      loadStart.call(this, index, cb);
    } else {
      cb.call(this, 'Not list')
    }
  };

  Preloader.prototype.stop = function(index, cb) {
    if(index in this.innerArray) {
      loadClose.call(this, index, cb);
    } else {
      cb.call(this, 'Not list');
    }
  }

  window.Preloader = Preloader;
})(this);
