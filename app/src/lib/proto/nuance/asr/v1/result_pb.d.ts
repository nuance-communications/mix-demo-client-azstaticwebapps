// package: nuance.asr.v1
// file: nuance/asr/v1/result.proto

import * as jspb from "google-protobuf";
import * as nuance_rpc_error_details_pb from "../../../nuance/rpc/error_details_pb";

export class Result extends jspb.Message {
  getResultType(): EnumResultTypeMap[keyof EnumResultTypeMap];
  setResultType(value: EnumResultTypeMap[keyof EnumResultTypeMap]): void;

  getAbsStartMs(): number;
  setAbsStartMs(value: number): void;

  getAbsEndMs(): number;
  setAbsEndMs(value: number): void;

  hasUtteranceInfo(): boolean;
  clearUtteranceInfo(): void;
  getUtteranceInfo(): UtteranceInfo | undefined;
  setUtteranceInfo(value?: UtteranceInfo): void;

  clearHypothesesList(): void;
  getHypothesesList(): Array<Hypothesis>;
  setHypothesesList(value: Array<Hypothesis>): void;
  addHypotheses(value?: Hypothesis, index?: number): Hypothesis;

  hasDataPack(): boolean;
  clearDataPack(): void;
  getDataPack(): DataPack | undefined;
  setDataPack(value?: DataPack): void;

  clearNotificationsList(): void;
  getNotificationsList(): Array<Notification>;
  setNotificationsList(value: Array<Notification>): void;
  addNotifications(value?: Notification, index?: number): Notification;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Result.AsObject;
  static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Result, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Result;
  static deserializeBinaryFromReader(message: Result, reader: jspb.BinaryReader): Result;
}

export namespace Result {
  export type AsObject = {
    resultType: EnumResultTypeMap[keyof EnumResultTypeMap],
    absStartMs: number,
    absEndMs: number,
    utteranceInfo?: UtteranceInfo.AsObject,
    hypothesesList: Array<Hypothesis.AsObject>,
    dataPack?: DataPack.AsObject,
    notificationsList: Array<Notification.AsObject>,
  }
}

export class UtteranceInfo extends jspb.Message {
  getDurationMs(): number;
  setDurationMs(value: number): void;

  getClippingDurationMs(): number;
  setClippingDurationMs(value: number): void;

  getDroppedSpeechPackets(): number;
  setDroppedSpeechPackets(value: number): void;

  getDroppedNonspeechPackets(): number;
  setDroppedNonspeechPackets(value: number): void;

  hasDsp(): boolean;
  clearDsp(): void;
  getDsp(): Dsp | undefined;
  setDsp(value?: Dsp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UtteranceInfo.AsObject;
  static toObject(includeInstance: boolean, msg: UtteranceInfo): UtteranceInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UtteranceInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UtteranceInfo;
  static deserializeBinaryFromReader(message: UtteranceInfo, reader: jspb.BinaryReader): UtteranceInfo;
}

export namespace UtteranceInfo {
  export type AsObject = {
    durationMs: number,
    clippingDurationMs: number,
    droppedSpeechPackets: number,
    droppedNonspeechPackets: number,
    dsp?: Dsp.AsObject,
  }
}

export class Dsp extends jspb.Message {
  getSnrEstimateDb(): number;
  setSnrEstimateDb(value: number): void;

  getLevel(): number;
  setLevel(value: number): void;

  getNumChannels(): number;
  setNumChannels(value: number): void;

  getInitialSilenceMs(): number;
  setInitialSilenceMs(value: number): void;

  getInitialEnergy(): number;
  setInitialEnergy(value: number): void;

  getFinalEnergy(): number;
  setFinalEnergy(value: number): void;

  getMeanEnergy(): number;
  setMeanEnergy(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Dsp.AsObject;
  static toObject(includeInstance: boolean, msg: Dsp): Dsp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Dsp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Dsp;
  static deserializeBinaryFromReader(message: Dsp, reader: jspb.BinaryReader): Dsp;
}

export namespace Dsp {
  export type AsObject = {
    snrEstimateDb: number,
    level: number,
    numChannels: number,
    initialSilenceMs: number,
    initialEnergy: number,
    finalEnergy: number,
    meanEnergy: number,
  }
}

export class Hypothesis extends jspb.Message {
  hasConfidence(): boolean;
  clearConfidence(): void;
  getConfidence(): number;
  setConfidence(value: number): void;

  hasAverageConfidence(): boolean;
  clearAverageConfidence(): void;
  getAverageConfidence(): number;
  setAverageConfidence(value: number): void;

  getRejected(): boolean;
  setRejected(value: boolean): void;

  getFormattedText(): string;
  setFormattedText(value: string): void;

  getMinimallyFormattedText(): string;
  setMinimallyFormattedText(value: string): void;

  clearWordsList(): void;
  getWordsList(): Array<Word>;
  setWordsList(value: Array<Word>): void;
  addWords(value?: Word, index?: number): Word;

  getEncryptedTokenization(): string;
  setEncryptedTokenization(value: string): void;

  hasGrammarId(): boolean;
  clearGrammarId(): void;
  getGrammarId(): string;
  setGrammarId(value: string): void;

  hasDetectedWakeupWord(): boolean;
  clearDetectedWakeupWord(): void;
  getDetectedWakeupWord(): string;
  setDetectedWakeupWord(value: string): void;

  getOptionalHypothesisConfidenceCase(): Hypothesis.OptionalHypothesisConfidenceCase;
  getOptionalHypothesisAverageConfidenceCase(): Hypothesis.OptionalHypothesisAverageConfidenceCase;
  getOptionalHypothesisGrammarIdCase(): Hypothesis.OptionalHypothesisGrammarIdCase;
  getOptionalDetectedWuwCase(): Hypothesis.OptionalDetectedWuwCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Hypothesis.AsObject;
  static toObject(includeInstance: boolean, msg: Hypothesis): Hypothesis.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Hypothesis, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Hypothesis;
  static deserializeBinaryFromReader(message: Hypothesis, reader: jspb.BinaryReader): Hypothesis;
}

export namespace Hypothesis {
  export type AsObject = {
    confidence: number,
    averageConfidence: number,
    rejected: boolean,
    formattedText: string,
    minimallyFormattedText: string,
    wordsList: Array<Word.AsObject>,
    encryptedTokenization: string,
    grammarId: string,
    detectedWakeupWord: string,
  }

  export enum OptionalHypothesisConfidenceCase {
    OPTIONAL_HYPOTHESIS_CONFIDENCE_NOT_SET = 0,
    CONFIDENCE = 1,
  }

  export enum OptionalHypothesisAverageConfidenceCase {
    OPTIONAL_HYPOTHESIS_AVERAGE_CONFIDENCE_NOT_SET = 0,
    AVERAGE_CONFIDENCE = 2,
  }

  export enum OptionalHypothesisGrammarIdCase {
    OPTIONAL_HYPOTHESIS_GRAMMAR_ID_NOT_SET = 0,
    GRAMMAR_ID = 9,
  }

  export enum OptionalDetectedWuwCase {
    OPTIONAL_DETECTED_WUW_NOT_SET = 0,
    DETECTED_WAKEUP_WORD = 10,
  }
}

export class Word extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  hasConfidence(): boolean;
  clearConfidence(): void;
  getConfidence(): number;
  setConfidence(value: number): void;

  getStartMs(): number;
  setStartMs(value: number): void;

  getEndMs(): number;
  setEndMs(value: number): void;

  getSilenceAfterWordMs(): number;
  setSilenceAfterWordMs(value: number): void;

  hasGrammarRule(): boolean;
  clearGrammarRule(): void;
  getGrammarRule(): string;
  setGrammarRule(value: string): void;

  getOptionalWordConfidenceCase(): Word.OptionalWordConfidenceCase;
  getOptionalWordGrammarRuleCase(): Word.OptionalWordGrammarRuleCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Word.AsObject;
  static toObject(includeInstance: boolean, msg: Word): Word.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Word, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Word;
  static deserializeBinaryFromReader(message: Word, reader: jspb.BinaryReader): Word;
}

export namespace Word {
  export type AsObject = {
    text: string,
    confidence: number,
    startMs: number,
    endMs: number,
    silenceAfterWordMs: number,
    grammarRule: string,
  }

  export enum OptionalWordConfidenceCase {
    OPTIONAL_WORD_CONFIDENCE_NOT_SET = 0,
    CONFIDENCE = 2,
  }

  export enum OptionalWordGrammarRuleCase {
    OPTIONAL_WORD_GRAMMAR_RULE_NOT_SET = 0,
    GRAMMAR_RULE = 6,
  }
}

export class DataPack extends jspb.Message {
  getLanguage(): string;
  setLanguage(value: string): void;

  getTopic(): string;
  setTopic(value: string): void;

  getVersion(): string;
  setVersion(value: string): void;

  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DataPack.AsObject;
  static toObject(includeInstance: boolean, msg: DataPack): DataPack.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DataPack, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DataPack;
  static deserializeBinaryFromReader(message: DataPack, reader: jspb.BinaryReader): DataPack;
}

export namespace DataPack {
  export type AsObject = {
    language: string,
    topic: string,
    version: string,
    id: string,
  }
}

export class Notification extends jspb.Message {
  getCode(): number;
  setCode(value: number): void;

  getSeverity(): EnumSeverityTypeMap[keyof EnumSeverityTypeMap];
  setSeverity(value: EnumSeverityTypeMap[keyof EnumSeverityTypeMap]): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): nuance_rpc_error_details_pb.LocalizedMessage | undefined;
  setMessage(value?: nuance_rpc_error_details_pb.LocalizedMessage): void;

  getDataMap(): jspb.Map<string, string>;
  clearDataMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Notification.AsObject;
  static toObject(includeInstance: boolean, msg: Notification): Notification.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Notification, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Notification;
  static deserializeBinaryFromReader(message: Notification, reader: jspb.BinaryReader): Notification;
}

export namespace Notification {
  export type AsObject = {
    code: number,
    severity: EnumSeverityTypeMap[keyof EnumSeverityTypeMap],
    message?: nuance_rpc_error_details_pb.LocalizedMessage.AsObject,
    dataMap: Array<[string, string]>,
  }
}

export interface EnumResultTypeMap {
  FINAL: 0;
  PARTIAL: 1;
  IMMUTABLE_PARTIAL: 2;
}

export const EnumResultType: EnumResultTypeMap;

export interface EnumSeverityTypeMap {
  SEVERITY_UNKNOWN: 0;
  SEVERITY_ERROR: 10;
  SEVERITY_WARNING: 20;
  SEVERITY_INFO: 30;
}

export const EnumSeverityType: EnumSeverityTypeMap;

