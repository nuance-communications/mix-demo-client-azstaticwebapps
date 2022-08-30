// source: nuance/nlu/v1/result.proto
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

var nuance_nlu_v1_single$intent$interpretation_pb = require('../../../nuance/nlu/v1/single-intent-interpretation_pb.js');
goog.object.extend(proto, nuance_nlu_v1_single$intent$interpretation_pb);
var nuance_nlu_v1_multi$intent$interpretation_pb = require('../../../nuance/nlu/v1/multi-intent-interpretation_pb.js');
goog.object.extend(proto, nuance_nlu_v1_multi$intent$interpretation_pb);
goog.exportSymbol('proto.nuance.nlu.v1.InterpretResult', null, global);
goog.exportSymbol('proto.nuance.nlu.v1.Interpretation', null, global);
goog.exportSymbol('proto.nuance.nlu.v1.Interpretation.InterpretationUnionCase', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.nuance.nlu.v1.InterpretResult = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.nuance.nlu.v1.InterpretResult.repeatedFields_, null);
};
goog.inherits(proto.nuance.nlu.v1.InterpretResult, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.nuance.nlu.v1.InterpretResult.displayName = 'proto.nuance.nlu.v1.InterpretResult';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.nuance.nlu.v1.Interpretation = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.nuance.nlu.v1.Interpretation.oneofGroups_);
};
goog.inherits(proto.nuance.nlu.v1.Interpretation, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.nuance.nlu.v1.Interpretation.displayName = 'proto.nuance.nlu.v1.Interpretation';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.nuance.nlu.v1.InterpretResult.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.nuance.nlu.v1.InterpretResult.prototype.toObject = function(opt_includeInstance) {
  return proto.nuance.nlu.v1.InterpretResult.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.nuance.nlu.v1.InterpretResult} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nuance.nlu.v1.InterpretResult.toObject = function(includeInstance, msg) {
  var f, obj = {
    literal: jspb.Message.getFieldWithDefault(msg, 1, ""),
    interpretationsList: jspb.Message.toObjectList(msg.getInterpretationsList(),
    proto.nuance.nlu.v1.Interpretation.toObject, includeInstance),
    sensitive: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    formattedLiteral: jspb.Message.getFieldWithDefault(msg, 11, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.nuance.nlu.v1.InterpretResult}
 */
proto.nuance.nlu.v1.InterpretResult.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.nuance.nlu.v1.InterpretResult;
  return proto.nuance.nlu.v1.InterpretResult.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.nuance.nlu.v1.InterpretResult} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.nuance.nlu.v1.InterpretResult}
 */
proto.nuance.nlu.v1.InterpretResult.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setLiteral(value);
      break;
    case 2:
      var value = new proto.nuance.nlu.v1.Interpretation;
      reader.readMessage(value,proto.nuance.nlu.v1.Interpretation.deserializeBinaryFromReader);
      msg.addInterpretations(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSensitive(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setFormattedLiteral(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.nuance.nlu.v1.InterpretResult.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.nuance.nlu.v1.InterpretResult.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.nuance.nlu.v1.InterpretResult} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nuance.nlu.v1.InterpretResult.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLiteral();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getInterpretationsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.nuance.nlu.v1.Interpretation.serializeBinaryToWriter
    );
  }
  f = message.getSensitive();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getFormattedLiteral();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
};


/**
 * optional string literal = 1;
 * @return {string}
 */
proto.nuance.nlu.v1.InterpretResult.prototype.getLiteral = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.nuance.nlu.v1.InterpretResult} returns this
 */
proto.nuance.nlu.v1.InterpretResult.prototype.setLiteral = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated Interpretation interpretations = 2;
 * @return {!Array<!proto.nuance.nlu.v1.Interpretation>}
 */
proto.nuance.nlu.v1.InterpretResult.prototype.getInterpretationsList = function() {
  return /** @type{!Array<!proto.nuance.nlu.v1.Interpretation>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.nuance.nlu.v1.Interpretation, 2));
};


/**
 * @param {!Array<!proto.nuance.nlu.v1.Interpretation>} value
 * @return {!proto.nuance.nlu.v1.InterpretResult} returns this
*/
proto.nuance.nlu.v1.InterpretResult.prototype.setInterpretationsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.nuance.nlu.v1.Interpretation=} opt_value
 * @param {number=} opt_index
 * @return {!proto.nuance.nlu.v1.Interpretation}
 */
proto.nuance.nlu.v1.InterpretResult.prototype.addInterpretations = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.nuance.nlu.v1.Interpretation, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.nuance.nlu.v1.InterpretResult} returns this
 */
proto.nuance.nlu.v1.InterpretResult.prototype.clearInterpretationsList = function() {
  return this.setInterpretationsList([]);
};


/**
 * optional bool sensitive = 3;
 * @return {boolean}
 */
proto.nuance.nlu.v1.InterpretResult.prototype.getSensitive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.nuance.nlu.v1.InterpretResult} returns this
 */
proto.nuance.nlu.v1.InterpretResult.prototype.setSensitive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional string formatted_literal = 11;
 * @return {string}
 */
proto.nuance.nlu.v1.InterpretResult.prototype.getFormattedLiteral = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.nuance.nlu.v1.InterpretResult} returns this
 */
proto.nuance.nlu.v1.InterpretResult.prototype.setFormattedLiteral = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.nuance.nlu.v1.Interpretation.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.nuance.nlu.v1.Interpretation.InterpretationUnionCase = {
  INTERPRETATION_UNION_NOT_SET: 0,
  SINGLE_INTENT_INTERPRETATION: 1,
  MULTI_INTENT_INTERPRETATION: 2
};

/**
 * @return {proto.nuance.nlu.v1.Interpretation.InterpretationUnionCase}
 */
proto.nuance.nlu.v1.Interpretation.prototype.getInterpretationUnionCase = function() {
  return /** @type {proto.nuance.nlu.v1.Interpretation.InterpretationUnionCase} */(jspb.Message.computeOneofCase(this, proto.nuance.nlu.v1.Interpretation.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.nuance.nlu.v1.Interpretation.prototype.toObject = function(opt_includeInstance) {
  return proto.nuance.nlu.v1.Interpretation.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.nuance.nlu.v1.Interpretation} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nuance.nlu.v1.Interpretation.toObject = function(includeInstance, msg) {
  var f, obj = {
    singleIntentInterpretation: (f = msg.getSingleIntentInterpretation()) && nuance_nlu_v1_single$intent$interpretation_pb.SingleIntentInterpretation.toObject(includeInstance, f),
    multiIntentInterpretation: (f = msg.getMultiIntentInterpretation()) && nuance_nlu_v1_multi$intent$interpretation_pb.MultiIntentInterpretation.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.nuance.nlu.v1.Interpretation}
 */
proto.nuance.nlu.v1.Interpretation.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.nuance.nlu.v1.Interpretation;
  return proto.nuance.nlu.v1.Interpretation.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.nuance.nlu.v1.Interpretation} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.nuance.nlu.v1.Interpretation}
 */
proto.nuance.nlu.v1.Interpretation.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new nuance_nlu_v1_single$intent$interpretation_pb.SingleIntentInterpretation;
      reader.readMessage(value,nuance_nlu_v1_single$intent$interpretation_pb.SingleIntentInterpretation.deserializeBinaryFromReader);
      msg.setSingleIntentInterpretation(value);
      break;
    case 2:
      var value = new nuance_nlu_v1_multi$intent$interpretation_pb.MultiIntentInterpretation;
      reader.readMessage(value,nuance_nlu_v1_multi$intent$interpretation_pb.MultiIntentInterpretation.deserializeBinaryFromReader);
      msg.setMultiIntentInterpretation(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.nuance.nlu.v1.Interpretation.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.nuance.nlu.v1.Interpretation.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.nuance.nlu.v1.Interpretation} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.nuance.nlu.v1.Interpretation.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSingleIntentInterpretation();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      nuance_nlu_v1_single$intent$interpretation_pb.SingleIntentInterpretation.serializeBinaryToWriter
    );
  }
  f = message.getMultiIntentInterpretation();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      nuance_nlu_v1_multi$intent$interpretation_pb.MultiIntentInterpretation.serializeBinaryToWriter
    );
  }
};


/**
 * optional SingleIntentInterpretation single_intent_interpretation = 1;
 * @return {?proto.nuance.nlu.v1.SingleIntentInterpretation}
 */
proto.nuance.nlu.v1.Interpretation.prototype.getSingleIntentInterpretation = function() {
  return /** @type{?proto.nuance.nlu.v1.SingleIntentInterpretation} */ (
    jspb.Message.getWrapperField(this, nuance_nlu_v1_single$intent$interpretation_pb.SingleIntentInterpretation, 1));
};


/**
 * @param {?proto.nuance.nlu.v1.SingleIntentInterpretation|undefined} value
 * @return {!proto.nuance.nlu.v1.Interpretation} returns this
*/
proto.nuance.nlu.v1.Interpretation.prototype.setSingleIntentInterpretation = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.nuance.nlu.v1.Interpretation.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.nuance.nlu.v1.Interpretation} returns this
 */
proto.nuance.nlu.v1.Interpretation.prototype.clearSingleIntentInterpretation = function() {
  return this.setSingleIntentInterpretation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.nuance.nlu.v1.Interpretation.prototype.hasSingleIntentInterpretation = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional MultiIntentInterpretation multi_intent_interpretation = 2;
 * @return {?proto.nuance.nlu.v1.MultiIntentInterpretation}
 */
proto.nuance.nlu.v1.Interpretation.prototype.getMultiIntentInterpretation = function() {
  return /** @type{?proto.nuance.nlu.v1.MultiIntentInterpretation} */ (
    jspb.Message.getWrapperField(this, nuance_nlu_v1_multi$intent$interpretation_pb.MultiIntentInterpretation, 2));
};


/**
 * @param {?proto.nuance.nlu.v1.MultiIntentInterpretation|undefined} value
 * @return {!proto.nuance.nlu.v1.Interpretation} returns this
*/
proto.nuance.nlu.v1.Interpretation.prototype.setMultiIntentInterpretation = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.nuance.nlu.v1.Interpretation.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.nuance.nlu.v1.Interpretation} returns this
 */
proto.nuance.nlu.v1.Interpretation.prototype.clearMultiIntentInterpretation = function() {
  return this.setMultiIntentInterpretation(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.nuance.nlu.v1.Interpretation.prototype.hasMultiIntentInterpretation = function() {
  return jspb.Message.getField(this, 2) != null;
};


goog.object.extend(exports, proto.nuance.nlu.v1);
