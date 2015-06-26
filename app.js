var remo = require('remo');
var attempt = require('./attempt');
var message = require('./node_modules/remo/conf.json').defaults;
var log = console.log;

var run = function(message, cb) {
  remo.connect(message, function(err, db) {
    attempt(db, message, function(err, res) {
      cb(err, res);
    });
  });
};

message.action = 'insert';
message.doc = {quantity: 0};

run(message, function(err, res){
  log('err:'+err,res.toString());

  run(remo.merge(message, {action:'find', doc:{}}), function(err, res){
    log('err:'+err,res);
    message.action = 'inc';
    message.doc = {quantity: 1};

    run(message, function(err, res){
      log('err:'+err,res.toString());

      run(remo.merge(message, {action: 'drop'}), function(err, res){
        log('err:'+err,res.toString());
        process.exit()
      });
    });
  });
});

