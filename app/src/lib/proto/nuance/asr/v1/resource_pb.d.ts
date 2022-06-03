// package: nuance.asr.v1
// file: nuance/asr/v1/resource.proto

import * as jspb from "google-protobuf";

export class RecognitionResource extends jspb.Message {
  hasExternalReference(): boolean;
  clearExternalReference(): void;
  getExternalReference(): ResourceReference | undefined;
  setExternalReference(value?: ResourceReference): void;

  hasInlineWordset(): boolean;
  clearInlineWordset(): void;
  getInlineWordset(): string;
  setInlineWordset(value: string): void;

  hasBuiltin(): boolean;
  clearBuiltin(): void;
  getBuiltin(): string;
  setBuiltin(value: string): void;

  hasInlineGrammar(): boolean;
  clearInlineGrammar(): void;
  getInlineGrammar(): string;
  setInlineGrammar(value: string): void;

  hasWakeupWord(): boolean;
  clearWakeupWord(): void;
  getWakeupWord(): WakeupWord | undefined;
  setWakeupWord(value?: WakeupWord): void;

  hasWeightEnum(): boolean;
  clearWeightEnum(): void;
  getWeightEnum(): EnumWeightMap[keyof EnumWeightMap];
  setWeightEnum(value: EnumWeightMap[keyof EnumWeightMap]): void;

  hasWeightValue(): boolean;
  clearWeightValue(): void;
  getWeightValue(): number;
  setWeightValue(value: number): void;

  getReuse(): EnumResourceReuseMap[keyof EnumResourceReuseMap];
  setReuse(value: EnumResourceReuseMap[keyof EnumResourceReuseMap]): void;

  getResourceUnionCase(): RecognitionResource.ResourceUnionCase;
  getWeightUnionCase(): RecognitionResource.WeightUnionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecognitionResource.AsObject;
  static toObject(includeInstance: boolean, msg: RecognitionResource): RecognitionResource.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RecognitionResource, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecognitionResource;
  static deserializeBinaryFromReader(message: RecognitionResource, reader: jspb.BinaryReader): RecognitionResource;
}

export namespace RecognitionResource {
  export type AsObject = {
    externalReference?: ResourceReference.AsObject,
    inlineWordset: string,
    builtin: string,
    inlineGrammar: string,
    wakeupWord?: WakeupWord.AsObject,
    weightEnum: EnumWeightMap[keyof EnumWeightMap],
    weightValue: number,
    reuse: EnumResourceReuseMap[keyof EnumResourceReuseMap],
  }

  export enum ResourceUnionCase {
    RESOURCE_UNION_NOT_SET = 0,
    EXTERNAL_REFERENCE = 1,
    INLINE_WORDSET = 2,
    BUILTIN = 3,
    INLINE_GRAMMAR = 4,
    WAKEUP_WORD = 8,
  }

  export enum WeightUnionCase {
    WEIGHT_UNION_NOT_SET = 0,
    WEIGHT_ENUM = 5,
    WEIGHT_VALUE = 6,
  }
}

export class ResourceReference extends jspb.Message {
  getType(): EnumResourceTypeMap[keyof EnumResourceTypeMap];
  setType(value: EnumResourceTypeMap[keyof EnumResourceTypeMap]): void;

  getUri(): string;
  setUri(value: string): void;

  getMaskLoadFailures(): boolean;
  setMaskLoadFailures(value: boolean): void;

  getRequestTimeoutMs(): number;
  setRequestTimeoutMs(value: number): void;

  getHeadersMap(): jspb.Map<string, string>;
  clearHeadersMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResourceReference.AsObject;
  static toObject(includeInstance: boolean, msg: ResourceReference): ResourceReference.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResourceReference, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResourceReference;
  static deserializeBinaryFromReader(message: ResourceReference, reader: jspb.BinaryReader): ResourceReference;
}

export namespace ResourceReference {
  export type AsObject = {
    type: EnumResourceTypeMap[keyof EnumResourceTypeMap],
    uri: string,
    maskLoadFailures: boolean,
    requestTimeoutMs: number,
    headersMap: Array<[string, string]>,
  }
}

export class WakeupWord extends jspb.Message {
  clearWordsList(): void;
  getWordsList(): Array<string>;
  setWordsList(value: Array<string>): void;
  addWords(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WakeupWord.AsObject;
  static toObject(includeInstance: boolean, msg: WakeupWord): WakeupWord.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WakeupWord, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WakeupWord;
  static deserializeBinaryFromReader(message: WakeupWord, reader: jspb.BinaryReader): WakeupWord;
}

export namespace WakeupWord {
  export type AsObject = {
    wordsList: Array<string>,
  }
}

export interface EnumResourceTypeMap {
  UNDEFINED_RESOURCE_TYPE: 0;
  WORDSET: 1;
  COMPILED_WORDSET: 2;
  DOMAIN_LM: 3;
  SPEAKER_PROFILE: 4;
  GRAMMAR: 5;
  SETTINGS: 6;
}

export const EnumResourceType: EnumResourceTypeMap;

export interface EnumResourceReuseMap {
  UNDEFINED_REUSE: 0;
  LOW_REUSE: 1;
  HIGH_REUSE: 5;
}

export const EnumResourceReuse: EnumResourceReuseMap;

export interface EnumWeightMap {
  DEFAULT_WEIGHT: 0;
  LOWEST: 1;
  LOW: 2;
  MEDIUM: 3;
  HIGH: 4;
  HIGHEST: 5;
}

export const EnumWeight: EnumWeightMap;

