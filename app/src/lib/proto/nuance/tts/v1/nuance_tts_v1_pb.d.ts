// package: nuance.tts.v1
// file: nuance/tts/v1/nuance_tts_v1.proto

import * as jspb from "google-protobuf";

export class GetVoicesRequest extends jspb.Message {
  hasVoice(): boolean;
  clearVoice(): void;
  getVoice(): Voice | undefined;
  setVoice(value?: Voice): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVoicesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetVoicesRequest): GetVoicesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetVoicesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVoicesRequest;
  static deserializeBinaryFromReader(message: GetVoicesRequest, reader: jspb.BinaryReader): GetVoicesRequest;
}

export namespace GetVoicesRequest {
  export type AsObject = {
    voice?: Voice.AsObject,
  }
}

export class GetVoicesResponse extends jspb.Message {
  clearVoicesList(): void;
  getVoicesList(): Array<Voice>;
  setVoicesList(value: Array<Voice>): void;
  addVoices(value?: Voice, index?: number): Voice;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVoicesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetVoicesResponse): GetVoicesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetVoicesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVoicesResponse;
  static deserializeBinaryFromReader(message: GetVoicesResponse, reader: jspb.BinaryReader): GetVoicesResponse;
}

export namespace GetVoicesResponse {
  export type AsObject = {
    voicesList: Array<Voice.AsObject>,
  }
}

export class SynthesisRequest extends jspb.Message {
  hasVoice(): boolean;
  clearVoice(): void;
  getVoice(): Voice | undefined;
  setVoice(value?: Voice): void;

  hasAudioParams(): boolean;
  clearAudioParams(): void;
  getAudioParams(): AudioParameters | undefined;
  setAudioParams(value?: AudioParameters): void;

  hasInput(): boolean;
  clearInput(): void;
  getInput(): Input | undefined;
  setInput(value?: Input): void;

  hasEventParams(): boolean;
  clearEventParams(): void;
  getEventParams(): EventParameters | undefined;
  setEventParams(value?: EventParameters): void;

  getClientDataMap(): jspb.Map<string, string>;
  clearClientDataMap(): void;
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SynthesisRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SynthesisRequest): SynthesisRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SynthesisRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SynthesisRequest;
  static deserializeBinaryFromReader(message: SynthesisRequest, reader: jspb.BinaryReader): SynthesisRequest;
}

export namespace SynthesisRequest {
  export type AsObject = {
    voice?: Voice.AsObject,
    audioParams?: AudioParameters.AsObject,
    input?: Input.AsObject,
    eventParams?: EventParameters.AsObject,
    clientDataMap: Array<[string, string]>,
    userId: string,
  }
}

export class Voice extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getModel(): string;
  setModel(value: string): void;

  getLanguage(): string;
  setLanguage(value: string): void;

  getAgeGroup(): EnumAgeGroupMap[keyof EnumAgeGroupMap];
  setAgeGroup(value: EnumAgeGroupMap[keyof EnumAgeGroupMap]): void;

  getGender(): EnumGenderMap[keyof EnumGenderMap];
  setGender(value: EnumGenderMap[keyof EnumGenderMap]): void;

  getSampleRateHz(): number;
  setSampleRateHz(value: number): void;

  getLanguageTlw(): string;
  setLanguageTlw(value: string): void;

  getRestricted(): boolean;
  setRestricted(value: boolean): void;

  getVersion(): string;
  setVersion(value: string): void;

  clearForeignLanguagesList(): void;
  getForeignLanguagesList(): Array<string>;
  setForeignLanguagesList(value: Array<string>): void;
  addForeignLanguages(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Voice.AsObject;
  static toObject(includeInstance: boolean, msg: Voice): Voice.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Voice, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Voice;
  static deserializeBinaryFromReader(message: Voice, reader: jspb.BinaryReader): Voice;
}

export namespace Voice {
  export type AsObject = {
    name: string,
    model: string,
    language: string,
    ageGroup: EnumAgeGroupMap[keyof EnumAgeGroupMap],
    gender: EnumGenderMap[keyof EnumGenderMap],
    sampleRateHz: number,
    languageTlw: string,
    restricted: boolean,
    version: string,
    foreignLanguagesList: Array<string>,
  }
}

export class AudioParameters extends jspb.Message {
  hasAudioFormat(): boolean;
  clearAudioFormat(): void;
  getAudioFormat(): AudioFormat | undefined;
  setAudioFormat(value?: AudioFormat): void;

  getVolumePercentage(): number;
  setVolumePercentage(value: number): void;

  getSpeakingRateFactor(): number;
  setSpeakingRateFactor(value: number): void;

  getAudioChunkDurationMs(): number;
  setAudioChunkDurationMs(value: number): void;

  getTargetAudioLengthMs(): number;
  setTargetAudioLengthMs(value: number): void;

  getDisableEarlyEmission(): boolean;
  setDisableEarlyEmission(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AudioParameters.AsObject;
  static toObject(includeInstance: boolean, msg: AudioParameters): AudioParameters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AudioParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AudioParameters;
  static deserializeBinaryFromReader(message: AudioParameters, reader: jspb.BinaryReader): AudioParameters;
}

export namespace AudioParameters {
  export type AsObject = {
    audioFormat?: AudioFormat.AsObject,
    volumePercentage: number,
    speakingRateFactor: number,
    audioChunkDurationMs: number,
    targetAudioLengthMs: number,
    disableEarlyEmission: boolean,
  }
}

export class AudioFormat extends jspb.Message {
  hasPcm(): boolean;
  clearPcm(): void;
  getPcm(): PCM | undefined;
  setPcm(value?: PCM): void;

  hasAlaw(): boolean;
  clearAlaw(): void;
  getAlaw(): ALaw | undefined;
  setAlaw(value?: ALaw): void;

  hasUlaw(): boolean;
  clearUlaw(): void;
  getUlaw(): ULaw | undefined;
  setUlaw(value?: ULaw): void;

  hasOggOpus(): boolean;
  clearOggOpus(): void;
  getOggOpus(): OggOpus | undefined;
  setOggOpus(value?: OggOpus): void;

  hasOpus(): boolean;
  clearOpus(): void;
  getOpus(): Opus | undefined;
  setOpus(value?: Opus): void;

  getAudioFormatCase(): AudioFormat.AudioFormatCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AudioFormat.AsObject;
  static toObject(includeInstance: boolean, msg: AudioFormat): AudioFormat.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AudioFormat, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AudioFormat;
  static deserializeBinaryFromReader(message: AudioFormat, reader: jspb.BinaryReader): AudioFormat;
}

export namespace AudioFormat {
  export type AsObject = {
    pcm?: PCM.AsObject,
    alaw?: ALaw.AsObject,
    ulaw?: ULaw.AsObject,
    oggOpus?: OggOpus.AsObject,
    opus?: Opus.AsObject,
  }

  export enum AudioFormatCase {
    AUDIO_FORMAT_NOT_SET = 0,
    PCM = 1,
    ALAW = 2,
    ULAW = 3,
    OGG_OPUS = 4,
    OPUS = 5,
  }
}

export class PCM extends jspb.Message {
  getSampleRateHz(): number;
  setSampleRateHz(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PCM.AsObject;
  static toObject(includeInstance: boolean, msg: PCM): PCM.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PCM, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PCM;
  static deserializeBinaryFromReader(message: PCM, reader: jspb.BinaryReader): PCM;
}

export namespace PCM {
  export type AsObject = {
    sampleRateHz: number,
  }
}

export class ALaw extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ALaw.AsObject;
  static toObject(includeInstance: boolean, msg: ALaw): ALaw.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ALaw, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ALaw;
  static deserializeBinaryFromReader(message: ALaw, reader: jspb.BinaryReader): ALaw;
}

export namespace ALaw {
  export type AsObject = {
  }
}

export class ULaw extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ULaw.AsObject;
  static toObject(includeInstance: boolean, msg: ULaw): ULaw.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ULaw, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ULaw;
  static deserializeBinaryFromReader(message: ULaw, reader: jspb.BinaryReader): ULaw;
}

export namespace ULaw {
  export type AsObject = {
  }
}

export class Opus extends jspb.Message {
  getSampleRateHz(): number;
  setSampleRateHz(value: number): void;

  getBitRateBps(): number;
  setBitRateBps(value: number): void;

  getMaxFrameDurationMs(): number;
  setMaxFrameDurationMs(value: number): void;

  getComplexity(): number;
  setComplexity(value: number): void;

  getVbr(): EnumVariableBitrateMap[keyof EnumVariableBitrateMap];
  setVbr(value: EnumVariableBitrateMap[keyof EnumVariableBitrateMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Opus.AsObject;
  static toObject(includeInstance: boolean, msg: Opus): Opus.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Opus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Opus;
  static deserializeBinaryFromReader(message: Opus, reader: jspb.BinaryReader): Opus;
}

export namespace Opus {
  export type AsObject = {
    sampleRateHz: number,
    bitRateBps: number,
    maxFrameDurationMs: number,
    complexity: number,
    vbr: EnumVariableBitrateMap[keyof EnumVariableBitrateMap],
  }
}

export class OggOpus extends jspb.Message {
  getSampleRateHz(): number;
  setSampleRateHz(value: number): void;

  getBitRateBps(): number;
  setBitRateBps(value: number): void;

  getMaxFrameDurationMs(): number;
  setMaxFrameDurationMs(value: number): void;

  getComplexity(): number;
  setComplexity(value: number): void;

  getVbr(): EnumVariableBitrateMap[keyof EnumVariableBitrateMap];
  setVbr(value: EnumVariableBitrateMap[keyof EnumVariableBitrateMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OggOpus.AsObject;
  static toObject(includeInstance: boolean, msg: OggOpus): OggOpus.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OggOpus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OggOpus;
  static deserializeBinaryFromReader(message: OggOpus, reader: jspb.BinaryReader): OggOpus;
}

export namespace OggOpus {
  export type AsObject = {
    sampleRateHz: number,
    bitRateBps: number,
    maxFrameDurationMs: number,
    complexity: number,
    vbr: EnumVariableBitrateMap[keyof EnumVariableBitrateMap],
  }
}

export class Input extends jspb.Message {
  hasText(): boolean;
  clearText(): void;
  getText(): Text | undefined;
  setText(value?: Text): void;

  hasSsml(): boolean;
  clearSsml(): void;
  getSsml(): SSML | undefined;
  setSsml(value?: SSML): void;

  hasTokenizedSequence(): boolean;
  clearTokenizedSequence(): void;
  getTokenizedSequence(): TokenizedSequence | undefined;
  setTokenizedSequence(value?: TokenizedSequence): void;

  clearResourcesList(): void;
  getResourcesList(): Array<SynthesisResource>;
  setResourcesList(value: Array<SynthesisResource>): void;
  addResources(value?: SynthesisResource, index?: number): SynthesisResource;

  hasLidParams(): boolean;
  clearLidParams(): void;
  getLidParams(): LanguageIdentificationParameters | undefined;
  setLidParams(value?: LanguageIdentificationParameters): void;

  hasDownloadParams(): boolean;
  clearDownloadParams(): void;
  getDownloadParams(): DownloadParameters | undefined;
  setDownloadParams(value?: DownloadParameters): void;

  getInputDataCase(): Input.InputDataCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Input.AsObject;
  static toObject(includeInstance: boolean, msg: Input): Input.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Input, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Input;
  static deserializeBinaryFromReader(message: Input, reader: jspb.BinaryReader): Input;
}

export namespace Input {
  export type AsObject = {
    text?: Text.AsObject,
    ssml?: SSML.AsObject,
    tokenizedSequence?: TokenizedSequence.AsObject,
    resourcesList: Array<SynthesisResource.AsObject>,
    lidParams?: LanguageIdentificationParameters.AsObject,
    downloadParams?: DownloadParameters.AsObject,
  }

  export enum InputDataCase {
    INPUT_DATA_NOT_SET = 0,
    TEXT = 1,
    SSML = 2,
    TOKENIZED_SEQUENCE = 3,
  }
}

export class Text extends jspb.Message {
  hasText(): boolean;
  clearText(): void;
  getText(): string;
  setText(value: string): void;

  hasUri(): boolean;
  clearUri(): void;
  getUri(): string;
  setUri(value: string): void;

  getTextDataCase(): Text.TextDataCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Text.AsObject;
  static toObject(includeInstance: boolean, msg: Text): Text.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Text, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Text;
  static deserializeBinaryFromReader(message: Text, reader: jspb.BinaryReader): Text;
}

export namespace Text {
  export type AsObject = {
    text: string,
    uri: string,
  }

  export enum TextDataCase {
    TEXT_DATA_NOT_SET = 0,
    TEXT = 1,
    URI = 2,
  }
}

export class SSML extends jspb.Message {
  hasText(): boolean;
  clearText(): void;
  getText(): string;
  setText(value: string): void;

  hasUri(): boolean;
  clearUri(): void;
  getUri(): string;
  setUri(value: string): void;

  getSsmlValidationMode(): EnumSSMLValidationModeMap[keyof EnumSSMLValidationModeMap];
  setSsmlValidationMode(value: EnumSSMLValidationModeMap[keyof EnumSSMLValidationModeMap]): void;

  getSsmlDataCase(): SSML.SsmlDataCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SSML.AsObject;
  static toObject(includeInstance: boolean, msg: SSML): SSML.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SSML, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SSML;
  static deserializeBinaryFromReader(message: SSML, reader: jspb.BinaryReader): SSML;
}

export namespace SSML {
  export type AsObject = {
    text: string,
    uri: string,
    ssmlValidationMode: EnumSSMLValidationModeMap[keyof EnumSSMLValidationModeMap],
  }

  export enum SsmlDataCase {
    SSML_DATA_NOT_SET = 0,
    TEXT = 1,
    URI = 2,
  }
}

export class TokenizedSequence extends jspb.Message {
  clearTokensList(): void;
  getTokensList(): Array<Token>;
  setTokensList(value: Array<Token>): void;
  addTokens(value?: Token, index?: number): Token;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TokenizedSequence.AsObject;
  static toObject(includeInstance: boolean, msg: TokenizedSequence): TokenizedSequence.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TokenizedSequence, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TokenizedSequence;
  static deserializeBinaryFromReader(message: TokenizedSequence, reader: jspb.BinaryReader): TokenizedSequence;
}

export namespace TokenizedSequence {
  export type AsObject = {
    tokensList: Array<Token.AsObject>,
  }
}

export class Token extends jspb.Message {
  hasText(): boolean;
  clearText(): void;
  getText(): string;
  setText(value: string): void;

  hasControlCode(): boolean;
  clearControlCode(): void;
  getControlCode(): ControlCode | undefined;
  setControlCode(value?: ControlCode): void;

  getTokenDataCase(): Token.TokenDataCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Token.AsObject;
  static toObject(includeInstance: boolean, msg: Token): Token.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Token, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Token;
  static deserializeBinaryFromReader(message: Token, reader: jspb.BinaryReader): Token;
}

export namespace Token {
  export type AsObject = {
    text: string,
    controlCode?: ControlCode.AsObject,
  }

  export enum TokenDataCase {
    TOKEN_DATA_NOT_SET = 0,
    TEXT = 1,
    CONTROL_CODE = 2,
  }
}

export class ControlCode extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ControlCode.AsObject;
  static toObject(includeInstance: boolean, msg: ControlCode): ControlCode.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ControlCode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ControlCode;
  static deserializeBinaryFromReader(message: ControlCode, reader: jspb.BinaryReader): ControlCode;
}

export namespace ControlCode {
  export type AsObject = {
    key: string,
    value: string,
  }
}

export class SynthesisResource extends jspb.Message {
  getType(): EnumResourceTypeMap[keyof EnumResourceTypeMap];
  setType(value: EnumResourceTypeMap[keyof EnumResourceTypeMap]): void;

  hasUri(): boolean;
  clearUri(): void;
  getUri(): string;
  setUri(value: string): void;

  hasBody(): boolean;
  clearBody(): void;
  getBody(): Uint8Array | string;
  getBody_asU8(): Uint8Array;
  getBody_asB64(): string;
  setBody(value: Uint8Array | string): void;

  getResourceDataCase(): SynthesisResource.ResourceDataCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SynthesisResource.AsObject;
  static toObject(includeInstance: boolean, msg: SynthesisResource): SynthesisResource.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SynthesisResource, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SynthesisResource;
  static deserializeBinaryFromReader(message: SynthesisResource, reader: jspb.BinaryReader): SynthesisResource;
}

export namespace SynthesisResource {
  export type AsObject = {
    type: EnumResourceTypeMap[keyof EnumResourceTypeMap],
    uri: string,
    body: Uint8Array | string,
  }

  export enum ResourceDataCase {
    RESOURCE_DATA_NOT_SET = 0,
    URI = 2,
    BODY = 3,
  }
}

export class LanguageIdentificationParameters extends jspb.Message {
  getDisable(): boolean;
  setDisable(value: boolean): void;

  clearLanguagesList(): void;
  getLanguagesList(): Array<string>;
  setLanguagesList(value: Array<string>): void;
  addLanguages(value: string, index?: number): string;

  getAlwaysUseHighestConfidence(): boolean;
  setAlwaysUseHighestConfidence(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LanguageIdentificationParameters.AsObject;
  static toObject(includeInstance: boolean, msg: LanguageIdentificationParameters): LanguageIdentificationParameters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LanguageIdentificationParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LanguageIdentificationParameters;
  static deserializeBinaryFromReader(message: LanguageIdentificationParameters, reader: jspb.BinaryReader): LanguageIdentificationParameters;
}

export namespace LanguageIdentificationParameters {
  export type AsObject = {
    disable: boolean,
    languagesList: Array<string>,
    alwaysUseHighestConfidence: boolean,
  }
}

export class DownloadParameters extends jspb.Message {
  getHeadersMap(): jspb.Map<string, string>;
  clearHeadersMap(): void;
  getRefuseCookies(): boolean;
  setRefuseCookies(value: boolean): void;

  hasRequestTimeoutMs(): boolean;
  clearRequestTimeoutMs(): void;
  getRequestTimeoutMs(): number;
  setRequestTimeoutMs(value: number): void;

  getOptionalDownloadParameterRequestTimeoutMsCase(): DownloadParameters.OptionalDownloadParameterRequestTimeoutMsCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadParameters.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadParameters): DownloadParameters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DownloadParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadParameters;
  static deserializeBinaryFromReader(message: DownloadParameters, reader: jspb.BinaryReader): DownloadParameters;
}

export namespace DownloadParameters {
  export type AsObject = {
    headersMap: Array<[string, string]>,
    refuseCookies: boolean,
    requestTimeoutMs: number,
  }

  export enum OptionalDownloadParameterRequestTimeoutMsCase {
    OPTIONAL_DOWNLOAD_PARAMETER_REQUEST_TIMEOUT_MS_NOT_SET = 0,
    REQUEST_TIMEOUT_MS = 3,
  }
}

export class EventParameters extends jspb.Message {
  getSendSentenceMarkerEvents(): boolean;
  setSendSentenceMarkerEvents(value: boolean): void;

  getSendWordMarkerEvents(): boolean;
  setSendWordMarkerEvents(value: boolean): void;

  getSendPhonemeMarkerEvents(): boolean;
  setSendPhonemeMarkerEvents(value: boolean): void;

  getSendBookmarkMarkerEvents(): boolean;
  setSendBookmarkMarkerEvents(value: boolean): void;

  getSendParagraphMarkerEvents(): boolean;
  setSendParagraphMarkerEvents(value: boolean): void;

  getSendVisemes(): boolean;
  setSendVisemes(value: boolean): void;

  getSendLogEvents(): boolean;
  setSendLogEvents(value: boolean): void;

  getSuppressInput(): boolean;
  setSuppressInput(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventParameters.AsObject;
  static toObject(includeInstance: boolean, msg: EventParameters): EventParameters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventParameters;
  static deserializeBinaryFromReader(message: EventParameters, reader: jspb.BinaryReader): EventParameters;
}

export namespace EventParameters {
  export type AsObject = {
    sendSentenceMarkerEvents: boolean,
    sendWordMarkerEvents: boolean,
    sendPhonemeMarkerEvents: boolean,
    sendBookmarkMarkerEvents: boolean,
    sendParagraphMarkerEvents: boolean,
    sendVisemes: boolean,
    sendLogEvents: boolean,
    suppressInput: boolean,
  }
}

export class SynthesisResponse extends jspb.Message {
  hasStatus(): boolean;
  clearStatus(): void;
  getStatus(): Status | undefined;
  setStatus(value?: Status): void;

  hasEvents(): boolean;
  clearEvents(): void;
  getEvents(): Events | undefined;
  setEvents(value?: Events): void;

  hasAudio(): boolean;
  clearAudio(): void;
  getAudio(): Uint8Array | string;
  getAudio_asU8(): Uint8Array;
  getAudio_asB64(): string;
  setAudio(value: Uint8Array | string): void;

  getResponseCase(): SynthesisResponse.ResponseCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SynthesisResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SynthesisResponse): SynthesisResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SynthesisResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SynthesisResponse;
  static deserializeBinaryFromReader(message: SynthesisResponse, reader: jspb.BinaryReader): SynthesisResponse;
}

export namespace SynthesisResponse {
  export type AsObject = {
    status?: Status.AsObject,
    events?: Events.AsObject,
    audio: Uint8Array | string,
  }

  export enum ResponseCase {
    RESPONSE_NOT_SET = 0,
    STATUS = 1,
    EVENTS = 2,
    AUDIO = 3,
  }
}

export class UnarySynthesisResponse extends jspb.Message {
  hasStatus(): boolean;
  clearStatus(): void;
  getStatus(): Status | undefined;
  setStatus(value?: Status): void;

  hasEvents(): boolean;
  clearEvents(): void;
  getEvents(): Events | undefined;
  setEvents(value?: Events): void;

  getAudio(): Uint8Array | string;
  getAudio_asU8(): Uint8Array;
  getAudio_asB64(): string;
  setAudio(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnarySynthesisResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UnarySynthesisResponse): UnarySynthesisResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnarySynthesisResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnarySynthesisResponse;
  static deserializeBinaryFromReader(message: UnarySynthesisResponse, reader: jspb.BinaryReader): UnarySynthesisResponse;
}

export namespace UnarySynthesisResponse {
  export type AsObject = {
    status?: Status.AsObject,
    events?: Events.AsObject,
    audio: Uint8Array | string,
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

export class Events extends jspb.Message {
  clearEventsList(): void;
  getEventsList(): Array<Event>;
  setEventsList(value: Array<Event>): void;
  addEvents(value?: Event, index?: number): Event;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Events.AsObject;
  static toObject(includeInstance: boolean, msg: Events): Events.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Events, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Events;
  static deserializeBinaryFromReader(message: Events, reader: jspb.BinaryReader): Events;
}

export namespace Events {
  export type AsObject = {
    eventsList: Array<Event.AsObject>,
  }
}

export class Event extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getValuesMap(): jspb.Map<string, string>;
  clearValuesMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Event.AsObject;
  static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Event;
  static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
  export type AsObject = {
    name: string,
    valuesMap: Array<[string, string]>,
  }
}

export interface EnumAgeGroupMap {
  ADULT: 0;
  CHILD: 1;
}

export const EnumAgeGroup: EnumAgeGroupMap;

export interface EnumGenderMap {
  ANY: 0;
  MALE: 1;
  FEMALE: 2;
  NEUTRAL: 3;
}

export const EnumGender: EnumGenderMap;

export interface EnumVariableBitrateMap {
  VARIABLE_BITRATE_ON: 0;
  VARIABLE_BITRATE_OFF: 1;
  VARIABLE_BITRATE_CONSTRAINED: 2;
}

export const EnumVariableBitrate: EnumVariableBitrateMap;

export interface EnumResourceTypeMap {
  USER_DICTIONARY: 0;
  TEXT_USER_RULESET: 1;
  BINARY_USER_RULESET: 2;
  ACTIVEPROMPT_DB: 3;
  ACTIVEPROMPT_DB_AUTO: 4;
  SYSTEM_DICTIONARY: 5;
}

export const EnumResourceType: EnumResourceTypeMap;

export interface EnumSSMLValidationModeMap {
  STRICT: 0;
  WARN: 1;
  NONE: 2;
}

export const EnumSSMLValidationMode: EnumSSMLValidationModeMap;

