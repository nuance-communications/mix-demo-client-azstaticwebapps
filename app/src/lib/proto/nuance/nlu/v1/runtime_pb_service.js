// package: nuance.nlu.v1
// file: nuance/nlu/v1/runtime.proto

var nuance_nlu_v1_runtime_pb = require("../../../nuance/nlu/v1/runtime_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Runtime = (function () {
  function Runtime() {}
  Runtime.serviceName = "nuance.nlu.v1.Runtime";
  return Runtime;
}());

Runtime.Interpret = {
  methodName: "Interpret",
  service: Runtime,
  requestStream: false,
  responseStream: false,
  requestType: nuance_nlu_v1_runtime_pb.InterpretRequest,
  responseType: nuance_nlu_v1_runtime_pb.InterpretResponse
};

exports.Runtime = Runtime;

function RuntimeClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RuntimeClient.prototype.interpret = function interpret(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Runtime.Interpret, {
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

exports.RuntimeClient = RuntimeClient;

