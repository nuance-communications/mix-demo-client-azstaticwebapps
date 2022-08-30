// package: nuance.tts.v1
// file: nuance/tts/v1/nuance_tts_v1.proto

var nuance_tts_v1_nuance_tts_v1_pb = require("../../../nuance/tts/v1/nuance_tts_v1_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Synthesizer = (function () {
  function Synthesizer() {}
  Synthesizer.serviceName = "nuance.tts.v1.Synthesizer";
  return Synthesizer;
}());

Synthesizer.GetVoices = {
  methodName: "GetVoices",
  service: Synthesizer,
  requestStream: false,
  responseStream: false,
  requestType: nuance_tts_v1_nuance_tts_v1_pb.GetVoicesRequest,
  responseType: nuance_tts_v1_nuance_tts_v1_pb.GetVoicesResponse
};

Synthesizer.Synthesize = {
  methodName: "Synthesize",
  service: Synthesizer,
  requestStream: false,
  responseStream: true,
  requestType: nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest,
  responseType: nuance_tts_v1_nuance_tts_v1_pb.SynthesisResponse
};

Synthesizer.UnarySynthesize = {
  methodName: "UnarySynthesize",
  service: Synthesizer,
  requestStream: false,
  responseStream: false,
  requestType: nuance_tts_v1_nuance_tts_v1_pb.SynthesisRequest,
  responseType: nuance_tts_v1_nuance_tts_v1_pb.UnarySynthesisResponse
};

exports.Synthesizer = Synthesizer;

function SynthesizerClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SynthesizerClient.prototype.getVoices = function getVoices(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Synthesizer.GetVoices, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

SynthesizerClient.prototype.synthesize = function synthesize(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Synthesizer.Synthesize, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

SynthesizerClient.prototype.unarySynthesize = function unarySynthesize(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Synthesizer.UnarySynthesize, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.SynthesizerClient = SynthesizerClient;

