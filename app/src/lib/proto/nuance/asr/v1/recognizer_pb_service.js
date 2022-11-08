// package: nuance.asr.v1
// file: nuance/asr/v1/recognizer.proto

var nuance_asr_v1_recognizer_pb = require("../../../nuance/asr/v1/recognizer_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Recognizer = (function () {
  function Recognizer() {}
  Recognizer.serviceName = "nuance.asr.v1.Recognizer";
  return Recognizer;
}());

Recognizer.Recognize = {
  methodName: "Recognize",
  service: Recognizer,
  requestStream: true,
  responseStream: true,
  requestType: nuance_asr_v1_recognizer_pb.RecognitionRequest,
  responseType: nuance_asr_v1_recognizer_pb.RecognitionResponse
};

exports.Recognizer = Recognizer;

function RecognizerClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RecognizerClient.prototype.recognize = function recognize(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: [],
    error: []
  };
  var client = grpc.client(Recognizer.Recognize, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport.bind(null, listeners.error)
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.RecognizerClient = RecognizerClient;

