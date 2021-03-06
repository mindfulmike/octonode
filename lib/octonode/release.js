// Generated by CoffeeScript 1.12.2
(function() {
  var Release;

  Release = (function() {
    function Release(repo, number, client) {
      this.repo = repo;
      this.number = number;
      this.client = client;
    }

    Release.prototype.info = function(cb) {
      return this.client.get("/repos/" + this.repo + "/releases/" + this.number, function(err, s, b, h) {
        if (err) {
          return cb(err);
        }
        if (s !== 200) {
          return cb(new Error("Release info error"));
        } else {
          return cb(null, b, h);
        }
      });
    };

    Release.prototype.uploadAssets = function(file, optionsOrCb, cb) {
      var options, uploadHost;
      if ((cb == null) && typeof optionsOrCb === 'function') {
        cb = optionsOrCb;
        optionsOrCb = {};
      }
      options = {
        query: {
          name: optionsOrCb.name || 'archive.zip'
        },
        body: file,
        headers: {
          'Content-Type': optionsOrCb.contentType || 'application/zip'
        }
      };
      uploadHost = optionsOrCb.uploadHost || 'uploads.github.com';
      return this.client.post("https://" + uploadHost + "/repos/" + this.repo + "/releases/" + this.number + "/assets", null, options, function(err, s, b, h) {
        if (err) {
          return cb(err);
        }
        if (s !== 201) {
          return cb(new Error("Release assets error"));
        } else {
          return cb(null, b, h);
        }
      });
    };

    return Release;

  })();

  module.exports = Release;

}).call(this);
