// package: nuance.nlu.v1
// file: nuance/nlu/v1/runtime.proto

import * as jspb from "google-protobuf";
import * as nuance_nlu_v1_result_pb from "../../../nuance/nlu/v1/result_pb";
import * as google_api_annotations_pb from "../../../google/api/annotations_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class InterpretRequest extends jspb.Message {
  hasParameters(): boolean;
  clearParameters(): void;
  getParameters(): InterpretationParameters | undefined;
  setParameters(value?: InterpretationParameters): void;

  hasModel(): boolean;
  clearModel(): void;
  getModel(): ResourceReference | undefined;
  setModel(value?: ResourceReference): void;

  clearResourcesList(): void;
  getResourcesList(): Array<InterpretationResource>;
  setResourcesList(value: Array<InterpretationResource>): void;
  addResources(value?: InterpretationResource, index?: number): InterpretationResource;

  getClientDataMap(): jspb.Map<string, string>;
  clearClientDataMap(): void;
  getUserId(): string;
  setUserId(value: string): void;

  hasInput(): boolean;
  clearInput(): void;
  getInput(): InterpretationInput | undefined;
  setInput(value?: InterpretationInput): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InterpretRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InterpretRequest): InterpretRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InterpretRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InterpretRequest;
  static deserializeBinaryFromReader(message: InterpretRequest, reader: jspb.BinaryReader): InterpretRequest;
}

export namespace InterpretRequest {
  export type AsObject = {
    parameters?: InterpretationParameters.AsObject,
    model?: ResourceReference.AsObject,
    resourcesList: Array<InterpretationResource.AsObject>,
    clientDataMap: Array<[string, string]>,
    userId: string,
    input?: InterpretationInput.AsObject,
  }
}

export class InterpretationParameters extends jspb.Message {
  getInterpretationResultType(): EnumInterpretationResultTypeMap[keyof EnumInterpretationResultTypeMap];
  setInterpretationResultType(value: EnumInterpretationResultTypeMap[keyof EnumInterpretationResultTypeMap]): void;

  getInterpretationInputLoggingMode(): EnumInterpretationInputLoggingModeMap[keyof EnumInterpretationInputLoggingModeMap];
  setInterpretationInputLoggingMode(value: EnumInterpretationInputLoggingModeMap[keyof EnumInterpretationInputLoggingModeMap]): void;

  getPostProcessingScriptParametersMap(): jspb.Map<string, string>;
  clearPostProcessingScriptParametersMap(): void;
  getMaxInterpretations(): number;
  setMaxInterpretations(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InterpretationParameters.AsObject;
  static toObject(includeInstance: boolean, msg: InterpretationParameters): InterpretationParameters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InterpretationParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InterpretationParameters;
  static deserializeBinaryFromReader(message: InterpretationParameters, reader: jspb.BinaryReader): InterpretationParameters;
}

export namespace InterpretationParameters {
  export type AsObject = {
    interpretationResultType: EnumInterpretationResultTypeMap[keyof EnumInterpretationResultTypeMap],
    interpretationInputLoggingMode: EnumInterpretationInputLoggingModeMap[keyof EnumInterpretationInputLoggingModeMap],
    postProcessingScriptParametersMap: Array<[string, string]>,
    maxInterpretations: number,
  }
}

export class InterpretationResource extends jspb.Message {
  hasExternalReference(): boolean;
  clearExternalReference(): void;
  getExternalReference(): ResourceReference | undefined;
  setExternalReference(value?: ResourceReference): void;

  hasInlineWordset(): boolean;
  clearInlineWordset(): void;
  getInlineWordset(): string;
  setInlineWordset(value: string): void;

  getResourceUnionCase(): InterpretationResource.ResourceUnionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InterpretationResource.AsObject;
  static toObject(includeInstance: boolean, msg: InterpretationResource): InterpretationResource.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InterpretationResource, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InterpretationResource;
  static deserializeBinaryFromReader(message: InterpretationResource, reader: jspb.BinaryReader): InterpretationResource;
}

export namespace InterpretationResource {
  export type AsObject = {
    externalReference?: ResourceReference.AsObject,
    inlineWordset: string,
  }

  export enum ResourceUnionCase {
    RESOURCE_UNION_NOT_SET = 0,
    EXTERNAL_REFERENCE = 1,
    INLINE_WORDSET = 2,
  }
}

export class ResourceReference extends jspb.Message {
  getType(): EnumResourceTypeMap[keyof EnumResourceTypeMap];
  setType(value: EnumResourceTypeMap[keyof EnumResourceTypeMap]): void;

  getUri(): string;
  setUri(value: string): void;

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
    requestTimeoutMs: number,
    headersMap: Array<[string, string]>,
  }
}

export class InterpretationInput extends jspb.Message {
  hasText(): boolean;
  clearText(): void;
  getText(): string;
  setText(value: string): void;

  hasAsrResult(): boolean;
  clearAsrResult(): void;
  getAsrResult(): google_protobuf_any_pb.Any | undefined;
  setAsrResult(value?: google_protobuf_any_pb.Any): void;

  getInputUnionCase(): InterpretationInput.InputUnionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InterpretationInput.AsObject;
  static toObject(includeInstance: boolean, msg: InterpretationInput): InterpretationInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InterpretationInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InterpretationInput;
  static deserializeBinaryFromReader(message: InterpretationInput, reader: jspb.BinaryReader): InterpretationInput;
}

export namespace InterpretationInput {
  export type AsObject = {
    text: string,
    asrResult?: google_protobuf_any_pb.Any.AsObject,
  }

  export enum InputUnionCase {
    INPUT_UNION_NOT_SET = 0,
    TEXT = 1,
    ASR_RESULT = 2,
  }
}

export class InterpretResponse extends jspb.Message {
  hasStatus(): boolean;
  clearStatus(): void;
  getStatus(): Status | undefined;
  setStatus(value?: Status): void;

  hasResult(): boolean;
  clearResult(): void;
  getResult(): nuance_nlu_v1_result_pb.InterpretResult | undefined;
  setResult(value?: nuance_nlu_v1_result_pb.InterpretResult): void;

  getMetadataMap(): jspb.Map<string, google_protobuf_any_pb.Any>;
  clearMetadataMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InterpretResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InterpretResponse): InterpretResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InterpretResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InterpretResponse;
  static deserializeBinaryFromReader(message: InterpretResponse, reader: jspb.BinaryReader): InterpretResponse;
}

export namespace InterpretResponse {
  export type AsObject = {
    status?: Status.AsObject,
    result?: nuance_nlu_v1_result_pb.InterpretResult.AsObject,
    metadataMap: Array<[string, google_protobuf_any_pb.Any.AsObject]>,
  }
}

export class Status extends jspb.Message {
  getCode(): number;
  setCode(value: number): void;

  getMessage(): string;
  setMessage(value: string): void;

  getDetails(): string;
  setDetails(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Status.AsObject;
  static toObject(includeInstance: boolean, msg: Status): Status.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Status, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Status;
  static deserializeBinaryFromReader(message: Status, reader: jspb.BinaryReader): Status;
}

export namespace Status {
  export type AsObject = {
    code: number,
    message: string,
    details: string,
  }
}

export interface EnumInterpretationResultTypeMap {
  UNDEFINED: 0;
  SINGLE_INTENT: 1;
  MULTI_INTENT: 2;
}

export const EnumInterpretationResultType: EnumInterpretationResultTypeMap;

export interface EnumInterpretationInputLoggingModeMap {
  PLAINTEXT: 0;
  SUPPRESSED: 9;
}

export const EnumInterpretationInputLoggingMode: EnumInterpretationInputLoggingModeMap;

export interface EnumResourceTypeMap {
  UNDEFINED_RESOURCE_TYPE: 0;
  SEMANTIC_MODEL: 1;
  WORDSET: 2;
  COMPILED_WORDSET: 3;
}

export const EnumResourceType: EnumResourceTypeMap;

