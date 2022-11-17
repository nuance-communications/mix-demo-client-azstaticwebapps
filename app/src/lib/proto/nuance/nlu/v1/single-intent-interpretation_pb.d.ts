// package: nuance.nlu.v1
// file: nuance/nlu/v1/single-intent-interpretation.proto

import * as jspb from "google-protobuf";
import * as nuance_nlu_v1_interpretation_common_pb from "../../../nuance/nlu/v1/interpretation-common_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class SingleIntentInterpretation extends jspb.Message {
  getIntent(): string;
  setIntent(value: string): void;

  getConfidence(): number;
  setConfidence(value: number): void;

  getOrigin(): nuance_nlu_v1_interpretation_common_pb.EnumOriginMap[keyof nuance_nlu_v1_interpretation_common_pb.EnumOriginMap];
  setOrigin(value: nuance_nlu_v1_interpretation_common_pb.EnumOriginMap[keyof nuance_nlu_v1_interpretation_common_pb.EnumOriginMap]): void;

  getEntitiesMap(): jspb.Map<string, SingleIntentEntityList>;
  clearEntitiesMap(): void;
  getMetadataMap(): jspb.Map<string, google_protobuf_any_pb.Any>;
  clearMetadataMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SingleIntentInterpretation.AsObject;
  static toObject(includeInstance: boolean, msg: SingleIntentInterpretation): SingleIntentInterpretation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SingleIntentInterpretation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SingleIntentInterpretation;
  static deserializeBinaryFromReader(message: SingleIntentInterpretation, reader: jspb.BinaryReader): SingleIntentInterpretation;
}

export namespace SingleIntentInterpretation {
  export type AsObject = {
    intent: string,
    confidence: number,
    origin: nuance_nlu_v1_interpretation_common_pb.EnumOriginMap[keyof nuance_nlu_v1_interpretation_common_pb.EnumOriginMap],
    entitiesMap: Array<[string, SingleIntentEntityList.AsObject]>,
    metadataMap: Array<[string, google_protobuf_any_pb.Any.AsObject]>,
  }
}

export class SingleIntentEntityList extends jspb.Message {
  clearEntitiesList(): void;
  getEntitiesList(): Array<SingleIntentEntity>;
  setEntitiesList(value: Array<SingleIntentEntity>): void;
  addEntities(value?: SingleIntentEntity, index?: number): SingleIntentEntity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SingleIntentEntityList.AsObject;
  static toObject(includeInstance: boolean, msg: SingleIntentEntityList): SingleIntentEntityList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SingleIntentEntityList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SingleIntentEntityList;
  static deserializeBinaryFromReader(message: SingleIntentEntityList, reader: jspb.BinaryReader): SingleIntentEntityList;
}

export namespace SingleIntentEntityList {
  export type AsObject = {
    entitiesList: Array<SingleIntentEntity.AsObject>,
  }
}

export class SingleIntentEntity extends jspb.Message {
  hasTextRange(): boolean;
  clearTextRange(): void;
  getTextRange(): nuance_nlu_v1_interpretation_common_pb.TextRange | undefined;
  setTextRange(value?: nuance_nlu_v1_interpretation_common_pb.TextRange): void;

  getConfidence(): number;
  setConfidence(value: number): void;

  getOrigin(): nuance_nlu_v1_interpretation_common_pb.EnumOriginMap[keyof nuance_nlu_v1_interpretation_common_pb.EnumOriginMap];
  setOrigin(value: nuance_nlu_v1_interpretation_common_pb.EnumOriginMap[keyof nuance_nlu_v1_interpretation_common_pb.EnumOriginMap]): void;

  getEntitiesMap(): jspb.Map<string, SingleIntentEntityList>;
  clearEntitiesMap(): void;
  hasStringValue(): boolean;
  clearStringValue(): void;
  getStringValue(): string;
  setStringValue(value: string): void;

  hasStructValue(): boolean;
  clearStructValue(): void;
  getStructValue(): google_protobuf_struct_pb.Struct | undefined;
  setStructValue(value?: google_protobuf_struct_pb.Struct): void;

  getLiteral(): string;
  setLiteral(value: string): void;

  getSensitive(): boolean;
  setSensitive(value: boolean): void;

  getFormattedLiteral(): string;
  setFormattedLiteral(value: string): void;

  hasFormattedTextRange(): boolean;
  clearFormattedTextRange(): void;
  getFormattedTextRange(): nuance_nlu_v1_interpretation_common_pb.TextRange | undefined;
  setFormattedTextRange(value?: nuance_nlu_v1_interpretation_common_pb.TextRange): void;

  getMetadataMap(): jspb.Map<string, google_protobuf_any_pb.Any>;
  clearMetadataMap(): void;
  hasAudioRange(): boolean;
  clearAudioRange(): void;
  getAudioRange(): nuance_nlu_v1_interpretation_common_pb.AudioRange | undefined;
  setAudioRange(value?: nuance_nlu_v1_interpretation_common_pb.AudioRange): void;

  getValueUnionCase(): SingleIntentEntity.ValueUnionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SingleIntentEntity.AsObject;
  static toObject(includeInstance: boolean, msg: SingleIntentEntity): SingleIntentEntity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SingleIntentEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SingleIntentEntity;
  static deserializeBinaryFromReader(message: SingleIntentEntity, reader: jspb.BinaryReader): SingleIntentEntity;
}

export namespace SingleIntentEntity {
  export type AsObject = {
    textRange?: nuance_nlu_v1_interpretation_common_pb.TextRange.AsObject,
    confidence: number,
    origin: nuance_nlu_v1_interpretation_common_pb.EnumOriginMap[keyof nuance_nlu_v1_interpretation_common_pb.EnumOriginMap],
    entitiesMap: Array<[string, SingleIntentEntityList.AsObject]>,
    stringValue: string,
    structValue?: google_protobuf_struct_pb.Struct.AsObject,
    literal: string,
    sensitive: boolean,
    formattedLiteral: string,
    formattedTextRange?: nuance_nlu_v1_interpretation_common_pb.TextRange.AsObject,
    metadataMap: Array<[string, google_protobuf_any_pb.Any.AsObject]>,
    audioRange?: nuance_nlu_v1_interpretation_common_pb.AudioRange.AsObject,
  }

  export enum ValueUnionCase {
    VALUE_UNION_NOT_SET = 0,
    STRING_VALUE = 6,
    STRUCT_VALUE = 7,
  }
}

