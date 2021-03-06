var paramify = require('paramify');
var domready = require('domready');
var reconnect = require('reconnect-engine');
var linestream = require('./linestream');

domready(function() {

  var match = paramify(document.location.pathname);

  var con = reconnect(function(stream) {
    linestream(stream); // split the stream on new lines and emit json

    if (match('/home') || match('/'))
      return require('home/client')(stream);

    if (match('/project/:id'))
      return require('project/client')(stream);

  });

  con.connect('/server');

  //
  // TODO
  // handle UI events for disconnect/reconnect here.
  //

});

