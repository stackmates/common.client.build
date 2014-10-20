'use strict';

var io = require('socket.io-client');


module.exports = angular.module('sm.socket.io', [
])

.provider('$socket', function $socketProvider() {

  var ioConfig = {};
  var ioUrl;

  this.setConnectionUrl = function setConnectionUrl(url) {
    if (typeof url == 'string') {
      ioUrl = url;
    } else {
      throw new TypeError('url must be of type string');
    }
  };

  function setOption(name, value, type) {
    if (typeof value != type) {
      throw new TypeError('"' + name + '" must be of type "' + type + '"' );
    }
    ioConfig[name] = value;
  };

  this.setResource = function setResource(value) {
      setOption('resource', value, 'string');
  };
  this.setConnectTimeout = function setConnectTimeout(value) {
      setOption('connectTimeout', value, 'number');
  };
  this.setTryMultipleTransports = function setTryMultipleTransports(value) {
      setOption('tryMultipleTransports', value, 'boolean');
  };
  this.setReconnect = function setReconnect(value) {
      setOption('reconnect', value, 'boolean');
  };
  this.setReconnectionDelay = function setReconnectionDelay(value) {
      setOption('reconnectionDelay', value, 'number');
  };
  this.setReconnectionLimit = function setReconnectionLimit(value) {
      setOption('reconnectionLimit', value, 'number');
  };
  this.setMaxReconnectionAttempts = function setMaxReconnectionAttempts(value) {
      setOption('maxReconnectionAttempts', value, 'number');
  };
  this.setSyncDisconnectOnUnload = function setSyncDisconnectOnUnload(value) {
      setOption('syncDisconnectOnUnload', value, 'boolean');
  };
  this.setAutoConnect = function setAutoConnect(value) {
      setOption('autoConnect', value, 'boolean');
  };
  this.setFlashPolicyPort = function setFlashPolicyPort(value) {
      setOption('flashPolicyPort', value, 'number')
  };
  this.setForceNewConnection = function setForceNewConnection(value) {
      setOption('forceNewConnection', value, 'boolean');
  };

  this.$get = function $socketFactory($rootScope) {
    var socket = io(ioUrl, ioConfig);
    return {
        on: function on(event, callback) {
          socket.on(event, function(){
            var args = arguments;
            $rootScope.$apply(function(){
              callback.apply(socket, args);
            });
          });
        },
        off: function off(event, callback) {
          // remove one or all event listeners for a given event ie route change
          // avoid memory leaks and unexpected behaviour
          if (typeof callback == 'function') {
            socket.removeListener(event, callback);
          } else {
            socket.removeAllListeners(event);
          }
        },
        emit: function emit(event, data, callback) {
          if (typeof callback == 'function') {
            socket.emit(event, data, function(){
              var args = arguments;

              $rootScope.$apply(function () {
                callback.apply(socket, args);
              });
            });
          } else {
            socket.emit(event, data);
          }
        }
    };
  }

  return this;

})

;


// Useful references

// see http://code.tutsplus.com/tutorials/more-responsive-single-page-applications-with-angularjs-socketio-creating-the-library--cms-21738
