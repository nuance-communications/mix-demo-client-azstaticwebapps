// package: nuance.rpc
// file: nuance/rpc/error_details.proto

import * as jspb from "google-protobuf";

export class RetryInfo extends jspb.Message {
  getRetryDelayMs(): number;
  setRetryDelayMs(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RetryInfo.AsObject;
  static toObject(includeInstance: boolean, msg: RetryInfo): RetryInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RetryInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RetryInfo;
  static deserializeBinaryFromReader(message: RetryInfo, reader: jspb.BinaryReader): RetryInfo;
}

export namespace RetryInfo {
  export type AsObject = {
    retryDelayMs: number,
  }
}

export class RequestInfo extends jspb.Message {
  getRequestId(): string;
  setRequestId(value: string): void;

  getRequestData(): string;
  setRequestData(value: string): void;

  getAdditionalRequestDataMap(): jspb.Map<string, string>;
  clearAdditionalRequestDataMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestInfo.AsObject;
  static toObject(includeInstance: boolean, msg: RequestInfo): RequestInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RequestInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestInfo;
  static deserializeBinaryFromReader(message: RequestInfo, reader: jspb.BinaryReader): RequestInfo;
}

export namespace RequestInfo {
  export type AsObject = {
    requestId: string,
    requestData: string,
    additionalRequestDataMap: Array<[string, string]>,
  }
}

export class HelpInfo extends jspb.Message {
  clearLinksList(): void;
  getLinksList(): Array<HelpInfo.Hyperlink>;
  setLinksList(value: Array<HelpInfo.Hyperlink>): void;
  addLinks(value?: HelpInfo.Hyperlink, index?: number): HelpInfo.Hyperlink;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelpInfo.AsObject;
  static toObject(includeInstance: boolean, msg: HelpInfo): HelpInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HelpInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelpInfo;
  static deserializeBinaryFromReader(message: HelpInfo, reader: jspb.BinaryReader): HelpInfo;
}

export namespace HelpInfo {
  export type AsObject = {
    linksList: Array<HelpInfo.Hyperlink.AsObject>,
  }

  export class Hyperlink extends jspb.Message {
    hasDescription(): boolean;
    clearDescription(): void;
    getDescription(): LocalizedMessage | undefined;
    setDescription(value?: LocalizedMessage): void;

    getUrl(): string;
    setUrl(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Hyperlink.AsObject;
    static toObject(includeInstance: boolean, msg: Hyperlink): Hyperlink.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Hyperlink, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Hyperlink;
    static deserializeBinaryFromReader(message: Hyperlink, reader: jspb.BinaryReader): Hyperlink;
  }

  export namespace Hyperlink {
    export type AsObject = {
      description?: LocalizedMessage.AsObject,
      url: string,
    }
  }
}

export class LocalizedMessage extends jspb.Message {
  getLocale(): string;
  setLocale(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getMessageResourceId(): string;
  setMessageResourceId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LocalizedMessage.AsObject;
  static toObject(includeInstance: boolean, msg: LocalizedMessage): LocalizedMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LocalizedMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LocalizedMessage;
  static deserializeBinaryFromReader(message: LocalizedMessage, reader: jspb.BinaryReader): LocalizedMessage;
}

export namespace LocalizedMessage {
  export type AsObject = {
    locale: string,
    message: string,
    messageResourceId: string,
  }
}

export class FieldViolation extends jspb.Message {
  getField(): string;
  setField(value: string): void;

  clearRelFieldList(): void;
  getRelFieldList(): Array<string>;
  setRelFieldList(value: Array<string>): void;
  addRelField(value: string, index?: number): string;

  hasUserMessage(): boolean;
  clearUserMessage(): void;
  getUserMessage(): LocalizedMessage | undefined;
  setUserMessage(value?: LocalizedMessage): void;

  getMessage(): string;
  setMessage(value: string): void;

  getInvalidValue(): string;
  setInvalidValue(value: string): void;

  getViolation(): FieldViolation.ViolationTypeMap[keyof FieldViolation.ViolationTypeMap];
  setViolation(value: FieldViolation.ViolationTypeMap[keyof FieldViolation.ViolationTypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FieldViolation.AsObject;
  static toObject(includeInstance: boolean, msg: FieldViolation): FieldViolation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FieldViolation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FieldViolation;
  static deserializeBinaryFromReader(message: FieldViolation, reader: jspb.BinaryReader): FieldViolation;
}

export namespace FieldViolation {
  export type AsObject = {
    field: string,
    relFieldList: Array<string>,
    userMessage?: LocalizedMessage.AsObject,
    message: string,
    invalidValue: string,
    violation: FieldViolation.ViolationTypeMap[keyof FieldViolation.ViolationTypeMap],
  }

  export interface ViolationTypeMap {
    MANDATORY_FIELD_MISSING: 0;
    FIELD_CONFLICT: 1;
    OUT_OF_RANGE: 2;
    INVALID_FORMAT: 3;
    TOO_SHORT: 4;
    TOO_LONG: 5;
    OTHER: 64;
    UNSPECIFIED: 99;
  }

  export const ViolationType: ViolationTypeMap;
}

export class StatusDetail extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  hasUserMessage(): boolean;
  clearUserMessage(): void;
  getUserMessage(): LocalizedMessage | undefined;
  setUserMessage(value?: LocalizedMessage): void;

  getExtrasMap(): jspb.Map<string, string>;
  clearExtrasMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusDetail.AsObject;
  static toObject(includeInstance: boolean, msg: StatusDetail): StatusDetail.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StatusDetail, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusDetail;
  static deserializeBinaryFromReader(message: StatusDetail, reader: jspb.BinaryReader): StatusDetail;
}

export namespace StatusDetail {
  export type AsObject = {
    message: string,
    userMessage?: LocalizedMessage.AsObject,
    extrasMap: Array<[string, string]>,
  }
}

