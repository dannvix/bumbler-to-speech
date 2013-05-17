(function() {
  var AUDIO_MAP, BumblerSpeech, defaultOptions;

  AUDIO_MAP = {
    d1: {
      start: 0.45,
      duration: 0.5
    },
    d2: {
      start: 1.43,
      duration: 0.5
    },
    d3: {
      start: 2.65,
      duration: 0.5
    },
    d4: {
      start: 3.55,
      duration: 0.5
    },
    d5: {
      start: 4.9,
      duration: 0.6
    },
    d6: {
      start: 5.9,
      duration: 0.6
    },
    d7: {
      start: 6.7,
      duration: 0.55
    },
    d8: {
      start: 7.75,
      duration: 0.5
    },
    d9: {
      start: 8.77,
      duration: 0.53
    },
    d10: {
      start: 9.52,
      duration: 0.7
    },
    thank: {
      start: 10.73,
      duration: 1.55
    }
  };

  defaultOptions = {
    player: '#ma-speech'
  };

  BumblerSpeech = (function() {

    function BumblerSpeech(options) {
      var mergedOptions;
      if (options == null) {
        options = {};
      }
      if (typeof options === "string") {
        this.player = document.querySelector(options);
      } else {
        mergedOptions = $.extend({}, defaultOptions, options);
        this.player = document.querySelector(mergedOptions.player);
      }
    }

    BumblerSpeech.prototype.playPartial = function(partialIndex) {
      var partial,
        _this = this;
      partial = AUDIO_MAP[partialIndex];
      this.player.currentTime = partial.start;
      this.player.play();
      return setTimeout(function() {
        return _this.player.pause();
      }, partial.duration * 1000);
    };

    BumblerSpeech.prototype.playSequence = function(indexQueue) {
      var audioEventHandler, queueIterate,
        _this = this;
      audioEventHandler = function() {
        _this.player.removeEventListener('pause', audioEventHandler);
        return queueIterate();
      };
      queueIterate = function() {
        var curentIndex;
        curentIndex = indexQueue.shift();
        if (curentIndex === void 0 || null) {
          return false;
        }
        _this.player.addEventListener('pause', audioEventHandler);
        return _this.playPartial(curentIndex);
      };
      return queueIterate();
    };

    BumblerSpeech.prototype.numberToSpeechQueue = function(number) {
      var digit1, digit10, queueArray;
      if (number >= 100 || number < 1) {
        return false;
      }
      queueArray = [];
      digit1 = number % 10;
      digit10 = (number - digit1) / 10;
      if (digit10 > 0) {
        queueArray.push("d" + digit10, "d10");
      }
      if (digit1 > 0) {
        queueArray.push("d" + digit1);
      }
      return queueArray;
    };

    BumblerSpeech.prototype.playNumber = function(number) {
      var speechQueue;
      speechQueue = this.numberToSpeechQueue(number);
      return this.playSequence(speechQueue);
    };

    return BumblerSpeech;

  })();

  $(function() {
    window.speaker = new BumblerSpeech("#ma-speech");
    return console.log(speaker);
  });

  /*
  document.addEventListener 'click', (event) ->
    speaker.currentTime = AUDIO_MAP.d2.start
    speaker.play()
    setTimeout( ->
      speaker.pause()
      speaker.currentTime = AUDIO_MAP.d10.start
      speaker.play()
    , 500)
    setTimeout( ->
      speaker.pause()
      speaker.currentTime = AUDIO_MAP.d2.start
      speaker.play()
    , 1000)
    setTimeout( ->
      speaker.pause()
    , 1500)
  */


}).call(this);
