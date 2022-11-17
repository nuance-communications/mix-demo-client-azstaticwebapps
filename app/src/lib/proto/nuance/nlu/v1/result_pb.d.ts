// package: nuance.nlu.v1
// file: nuance/nlu/v1/result.proto

import * as jspb from "google-protobuf";
import * as nuance_nlu_v1_single_intent_interpretation_pb from "../../../nuance/nlu/v1/single-intent-interpretation_pb";
import * as nuance_nlu_v1_multi_intent_interpretation_pb from "../../../nuance/nlu/v1/multi-intent-interpretation_pb";

export class InterpretResult extends jspb.Message {
  getLiteral(): string;
  setLiteral(value: string): void;

  clearInterpretationsList(): void;
  getInterpretationsList(): Array<Interpretation>;
  setInterpretationsList(value: Array<Interpretation>): void;
  addInterpretations(value?: Interpretation, index?: number): Interpretation;

  getSensitive(): boolean;
  setSensitive(value: boolean): void;

  getFormattedLiteral(): string;
  setFormattedLiteral(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InterpretResult.AsObject;
  static toObject(includeInstance: boolean, msg: InterpretResult): InterpretResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InterpretResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InterpretResult;
  static deserializeBinaryFromReader(message: InterpretResult, reader: jspb.BinaryReader): InterpretResult;
}

export namespace InterpretResult {
  export type AsObject = {
    literal: string,
    interpretationsList: Array<Interpretation.AsObject>,
    sensitive: boolean,
    formattedLiteral: string,
  }
}

export class Interpretation extends jspb.Message {
  hasSingleIntentInterpretation(): boolean;
  clearSingleIntentInterpretation(): void;
  getSingleIntentInterpretation(): nuance_nlu_v1_single_intent_interpretation_pb.SingleIntentInterpretation | undefined;
  setSingleIntentInterpretation(value?: nuance_nlu_v1_single_intent_interpretation_pb.SingleIntentInterpretation): void;

  hasMultiIntentInterpretation(): boolean;
  clearMultiIntentInterpretation(): void;
  getMultiIntentInterpretation(): nuance_nlu_v1_multi_intent_interpretation_pb.MultiIntentInterpretation | undefined;
  setMultiIntentInterpretation(value?: nuance_nlu_v1_multi_intent_interpretation_pb.MultiIntentInterpretation): void;

  getInterpretationUnionCase(): Interpretation.InterpretationUnionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Interpretation.AsObject;
  static toObject(includeInstance: boolean, msg: Interpretation): Interpretation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Interpretation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Interpretation;
  static deserializeBinaryFromReader(message: Interpretation, reader: jspb.BinaryReader): Interpretation;
}

export namespace Interpretation {
  export type AsObject = {
    singleIntentInterpretation?: nuance_nlu_v1_single_intent_interpretation_pb.SingleIntentInterpretation.AsObject,
    multiIntentInterpretation?: nuance_nlu_v1_multi_intent_interpretation_pb.MultiIntentInterpretation.AsObject,
  }

  export enum InterpretationUnionCase {
    INTERPRETATION_UNION_NOT_SET = 0,
    SINGLE_INTENT_INTERPRETATION = 1,
    MULTI_INTENT_INTERPRETATION = 2,
  }
}

