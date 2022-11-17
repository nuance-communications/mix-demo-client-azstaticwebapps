// package: nuance.nlu.v1
// file: nuance/nlu/v1/interpretation-common.proto

import * as jspb from "google-protobuf";

export class TextRange extends jspb.Message {
  getStartIndex(): number;
  setStartIndex(value: number): void;

  getEndIndex(): number;
  setEndIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TextRange.AsObject;
  static toObject(includeInstance: boolean, msg: TextRange): TextRange.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TextRange, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TextRange;
  static deserializeBinaryFromReader(message: TextRange, reader: jspb.BinaryReader): TextRange;
}

export namespace TextRange {
  export type AsObject = {
    startIndex: number,
    endIndex: number,
  }
}

export class AudioRange extends jspb.Message {
  getStartTimeMs(): number;
  setStartTimeMs(value: number): void;

  getEndTimeMs(): number;
  setEndTimeMs(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AudioRange.AsObject;
  static toObject(includeInstance: boolean, msg: AudioRange): AudioRange.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AudioRange, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AudioRange;
  static deserializeBinaryFromReader(message: AudioRange, reader: jspb.BinaryReader): AudioRange;
}

export namespace AudioRange {
  export type AsObject = {
    startTimeMs: number,
    endTimeMs: number,
  }
}

export interface EnumOriginMap {
  UNKNOWN: 0;
  GRAMMAR: 1;
  STATISTICAL: 2;
}

export const EnumOrigin: EnumOriginMap;

