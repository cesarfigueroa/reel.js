(function () {
  'use strict';

  window.Reel = function (options) {
    this.configure(options || {});
    this.setup();
  };

  Reel.prototype.configure = function (options) {
    for (var defaultValue in this.defaults) {
      this[defaultValue] = options[defaultValue] || this.defaults[defaultValue];
    }

    this.video = document.querySelector(this.selector);
  };

  Reel.prototype.defaults = {
    breakpointWidth: 480,
    selector: '.hero-video',
    threshold: 0.9
  };

  Reel.prototype.setup = function () {
    this.preloadVideo();
    this.bindEvents();
  };

  Reel.prototype.bindEvents = function () {
    window.addEventListener('resize', this.toggleVideo.bind(this));
    window.addEventListener('scroll', this.toggleVideo.bind(this));

    ['moz', 'ms', 'webkit', ''].forEach(function (prefix) {
      var visibilityChange = prefix + 'visibilitychange';
      document.addEventListener(visibilityChange, this.toggleVideo.bind(this));
    }.bind(this));
  };

  Reel.prototype.playVideo = function () {
    if (this.video.paused) {
      this.video.play();
    }
  };

  Reel.prototype.preloadVideo = function () {
    if (document.documentElement.clientWidth >= this.breakpointWidth) {
      this.toggleVideo();
    }
  };

  Reel.prototype.pauseVideo = function () {
    if (!this.video.paused) {
      this.video.pause();
    }
  };

  Reel.prototype.toggleVideo = function () {
    if (this.isVideoVisible() && !this.isDocumentHidden()) {
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  };

  Reel.prototype.isVideoVisible = function () {
    var rect = this.video.getBoundingClientRect();
    return rect.bottom >= rect.height - (rect.height * this.threshold);
  };

  Reel.prototype.isDocumentHidden = function () {
    return document.hidden
        || document.mozHidden
        || document.msHidden
        || document.webkitHidden;
  };
})();