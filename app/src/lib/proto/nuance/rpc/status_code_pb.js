// source: nuance/rpc/status_code.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() { return this || window || global || self || Function('return this')(); }).call(null);

goog.exportSymbol('proto.nuance.rpc.StatusCode', null, global);
/**
 * @enum {number}
 */
proto.nuance.rpc.StatusCode = {
  UNSPECIFIED: 0,
  OK: 1,
  BAD_REQUEST: 2,
  INVALID_REQUEST: 3,
  CANCELLED_CLIENT: 4,
  CANCELLED_SERVER: 5,
  DEADLINE_EXCEEDED: 6,
  NOT_AUTHORIZED: 7,
  PERMISSION_DENIED: 8,
  NOT_FOUND: 9,
  ALREADY_EXISTS: 10,
  NOT_IMPLEMENTED: 11,
  UNKNOWN: 15,
  TOO_LARGE: 51,
  BUSY: 52,
  OBSOLETE: 53,
  RATE_EXCEEDED: 54,
  QUOTA_EXCEEDED: 55,
  INTERNAL_ERROR: 56
};

goog.object.extend(exports, proto.nuance.rpc);
