// package: nuance.dlg.v1
// file: nuance/dlg/v1/dlg_interface.proto

var nuance_dlg_v1_dlg_interface_pb = require("../../../nuance/dlg/v1/dlg_interface_pb");
var nuance_dlg_v1_dlg_messages_pb = require("../../../nuance/dlg/v1/dlg_messages_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var DialogService = (function () {
  function DialogService() {}
  DialogService.serviceName = "nuance.dlg.v1.DialogService";
  return DialogService;
}());

DialogService.Start = {
  methodName: "Start",
  service: DialogService,
  requestStream: false,
  responseStream: false,
  requestType: nuance_dlg_v1_dlg_messages_pb.StartRequest,
  responseType: nuance_dlg_v1_dlg_messages_pb.StartResponse
};

DialogService.Update = {
  methodName: "Update",
  service: DialogService,
  requestStream: false,
  responseStream: false,
  requestType: nuance_dlg_v1_dlg_messages_pb.UpdateRequest,
  responseType: nuance_dlg_v1_dlg_messages_pb.UpdateResponse
};

DialogService.Execute = {
  methodName: "Execute",
  service: DialogService,
  requestStream: false,
  responseStream: false,
  requestType: nuance_dlg_v1_dlg_messages_pb.ExecuteRequest,
  responseType: nuance_dlg_v1_dlg_messages_pb.ExecuteResponse
};

DialogService.ExecuteStream = {
  methodName: "ExecuteStream",
  service: DialogService,
  requestStream: true,
  responseStream: true,
  requestType: nuance_dlg_v1_dlg_messages_pb.StreamInput,
  responseType: nuance_dlg_v1_dlg_messages_pb.StreamOutput
};

DialogService.Stop = {
  methodName: "Stop",
  service: DialogService,
  requestStream: false,
  responseStream: false,
  requestType: nuance_dlg_v1_dlg_messages_pb.StopRequest,
  responseType: nuance_dlg_v1_dlg_messages_pb.StopResponse
};

DialogService.Status = {
  methodName: "Status",
  service: DialogService,
  requestStream: false,
  responseStream: false,
  requestType: nuance_dlg_v1_dlg_messages_pb.StatusRequest,
  responseType: nuance_dlg_v1_dlg_messages_pb.StatusResponse
};

exports.DialogService = DialogService;

function DialogServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DialogServiceClient.prototype.start = function start(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DialogService.Start, {
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

DialogServiceClient.prototype.update = function update(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DialogService.Update, {
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

DialogServiceClient.prototype.execute = function execute(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DialogService.Execute, {
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

DialogServiceClient.prototype.executeStream = function executeStream(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: [],
    error: []
  };
  var client = grpc.client(DialogService.ExecuteStream, {
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

DialogServiceClient.prototype.stop = function stop(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DialogService.Stop, {
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

DialogServiceClient.prototype.status = function status(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DialogService.Status, {
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

exports.DialogServiceClient = DialogServiceClient;

