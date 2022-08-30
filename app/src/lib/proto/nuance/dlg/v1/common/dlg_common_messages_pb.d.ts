// package: nuance.dlg.v1.common
// file: nuance/dlg/v1/common/dlg_common_messages.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as nuance_nlu_v1_result_pb from "../../../../nuance/nlu/v1/result_pb";

export class StartRequestPayload extends jspb.Message {
  hasModelRef(): boolean;
  clearModelRef(): void;
  getModelRef(): ResourceReference | undefined;
  setModelRef(value?: ResourceReference): void;

  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_struct_pb.Struct | undefined;
  setData(value?: google_protobuf_struct_pb.Struct): void;

  getSuppressLogUserData(): boolean;
  setSuppressLogUserData(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartRequestPayload.AsObject;
  static toObject(includeInstance: boolean, msg: StartRequestPayload): StartRequestPayload.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartRequestPayload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartRequestPayload;
  static deserializeBinaryFromReader(message: StartRequestPayload, reader: jspb.BinaryReader): StartRequestPayload;
}

export namespace StartRequestPayload {
  export type AsObject = {
    modelRef?: ResourceReference.AsObject,
    data?: google_protobuf_struct_pb.Struct.AsObject,
    suppressLogUserData: boolean,
  }
}

export class ResourceReference extends jspb.Message {
  getUri(): string;
  setUri(value: string): void;

  getType(): ResourceReference.EnumResourceTypeMap[keyof ResourceReference.EnumResourceTypeMap];
  setType(value: ResourceReference.EnumResourceTypeMap[keyof ResourceReference.EnumResourceTypeMap]): void;

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
    uri: string,
    type: ResourceReference.EnumResourceTypeMap[keyof ResourceReference.EnumResourceTypeMap],
  }

  export interface EnumResourceTypeMap {
    APPLICATION_MODEL: 0;
  }

  export const EnumResourceType: EnumResourceTypeMap;
}

export class StartResponsePayload extends jspb.Message {
  getSessionId(): string;
  setSessionId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartResponsePayload.AsObject;
  static toObject(includeInstance: boolean, msg: StartResponsePayload): StartResponsePayload.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartResponsePayload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartResponsePayload;
  static deserializeBinaryFromReader(message: StartResponsePayload, reader: jspb.BinaryReader): StartResponsePayload;
}

export namespace StartResponsePayload {
  export type AsObject = {
    sessionId: string,
  }
}

export class UpdateRequestPayload extends jspb.Message {
  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_struct_pb.Struct | undefined;
  setData(value?: google_protobuf_struct_pb.Struct): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRequestPayload.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRequestPayload): UpdateRequestPayload.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateRequestPayload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRequestPayload;
  static deserializeBinaryFromReader(message: UpdateRequestPayload, reader: jspb.BinaryReader): UpdateRequestPayload;
}

export namespace UpdateRequestPayload {
  export type AsObject = {
    data?: google_protobuf_struct_pb.Struct.AsObject,
  }
}

export class ExecuteRequestPayload extends jspb.Message {
  hasUserInput(): boolean;
  clearUserInput(): void;
  getUserInput(): UserInput | undefined;
  setUserInput(value?: UserInput): void;

  hasDialogEvent(): boolean;
  clearDialogEvent(): void;
  getDialogEvent(): DialogEvent | undefined;
  setDialogEvent(value?: DialogEvent): void;

  hasRequestedData(): boolean;
  clearRequestedData(): void;
  getRequestedData(): RequestData | undefined;
  setRequestedData(value?: RequestData): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteRequestPayload.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteRequestPayload): ExecuteRequestPayload.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExecuteRequestPayload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteRequestPayload;
  static deserializeBinaryFromReader(message: ExecuteRequestPayload, reader: jspb.BinaryReader): ExecuteRequestPayload;
}

export namespace ExecuteRequestPayload {
  export type AsObject = {
    userInput?: UserInput.AsObject,
    dialogEvent?: DialogEvent.AsObject,
    requestedData?: RequestData.AsObject,
  }
}

export class UserInput extends jspb.Message {
  hasUserText(): boolean;
  clearUserText(): void;
  getUserText(): string;
  setUserText(value: string): void;

  hasInterpretation(): boolean;
  clearInterpretation(): void;
  getInterpretation(): UserInput.Interpretation | undefined;
  setInterpretation(value?: UserInput.Interpretation): void;

  hasSelectedItem(): boolean;
  clearSelectedItem(): void;
  getSelectedItem(): Selectable.SelectableItem.SelectedValue | undefined;
  setSelectedItem(value?: Selectable.SelectableItem.SelectedValue): void;

  hasNluaasInterpretation(): boolean;
  clearNluaasInterpretation(): void;
  getNluaasInterpretation(): nuance_nlu_v1_result_pb.InterpretResult | undefined;
  setNluaasInterpretation(value?: nuance_nlu_v1_result_pb.InterpretResult): void;

  getInputMode(): string;
  setInputMode(value: string): void;

  getInputCase(): UserInput.InputCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserInput.AsObject;
  static toObject(includeInstance: boolean, msg: UserInput): UserInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserInput;
  static deserializeBinaryFromReader(message: UserInput, reader: jspb.BinaryReader): UserInput;
}

export namespace UserInput {
  export type AsObject = {
    userText: string,
    interpretation?: UserInput.Interpretation.AsObject,
    selectedItem?: Selectable.SelectableItem.SelectedValue.AsObject,
    nluaasInterpretation?: nuance_nlu_v1_result_pb.InterpretResult.AsObject,
    inputMode: string,
  }

  export class Interpretation extends jspb.Message {
    getConfidence(): number;
    setConfidence(value: number): void;

    getInputMode(): string;
    setInputMode(value: string): void;

    getUtterance(): string;
    setUtterance(value: string): void;

    getDataMap(): jspb.Map<string, string>;
    clearDataMap(): void;
    getSlotLiteralsMap(): jspb.Map<string, string>;
    clearSlotLiteralsMap(): void;
    getSlotFormattedLiteralsMap(): jspb.Map<string, string>;
    clearSlotFormattedLiteralsMap(): void;
    clearAlternativeInterpretationsList(): void;
    getAlternativeInterpretationsList(): Array<UserInput.Interpretation>;
    setAlternativeInterpretationsList(value: Array<UserInput.Interpretation>): void;
    addAlternativeInterpretations(value?: UserInput.Interpretation, index?: number): UserInput.Interpretation;

    getSlotConfidencesMap(): jspb.Map<string, number>;
    clearSlotConfidencesMap(): void;
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
      confidence: number,
      inputMode: string,
      utterance: string,
      dataMap: Array<[string, string]>,
      slotLiteralsMap: Array<[string, string]>,
      slotFormattedLiteralsMap: Array<[string, string]>,
      alternativeInterpretationsList: Array<UserInput.Interpretation.AsObject>,
      slotConfidencesMap: Array<[string, number]>,
    }
  }

  export enum InputCase {
    INPUT_NOT_SET = 0,
    USER_TEXT = 1,
    INTERPRETATION = 2,
    SELECTED_ITEM = 3,
    NLUAAS_INTERPRETATION = 4,
  }
}

export class RequestData extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_struct_pb.Struct | undefined;
  setData(value?: google_protobuf_struct_pb.Struct): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestData.AsObject;
  static toObject(includeInstance: boolean, msg: RequestData): RequestData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RequestData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestData;
  static deserializeBinaryFromReader(message: RequestData, reader: jspb.BinaryReader): RequestData;
}

export namespace RequestData {
  export type AsObject = {
    id: string,
    data?: google_protobuf_struct_pb.Struct.AsObject,
  }
}

export class ExecuteResponsePayload extends jspb.Message {
  clearMessagesList(): void;
  getMessagesList(): Array<Message>;
  setMessagesList(value: Array<Message>): void;
  addMessages(value?: Message, index?: number): Message;

  hasQaAction(): boolean;
  clearQaAction(): void;
  getQaAction(): QAAction | undefined;
  setQaAction(value?: QAAction): void;

  hasDaAction(): boolean;
  clearDaAction(): void;
  getDaAction(): DAAction | undefined;
  setDaAction(value?: DAAction): void;

  hasEscalationAction(): boolean;
  clearEscalationAction(): void;
  getEscalationAction(): EscalationAction | undefined;
  setEscalationAction(value?: EscalationAction): void;

  hasEndAction(): boolean;
  clearEndAction(): void;
  getEndAction(): EndAction | undefined;
  setEndAction(value?: EndAction): void;

  hasContinueAction(): boolean;
  clearContinueAction(): void;
  getContinueAction(): ContinueAction | undefined;
  setContinueAction(value?: ContinueAction): void;

  getActionCase(): ExecuteResponsePayload.ActionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteResponsePayload.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteResponsePayload): ExecuteResponsePayload.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExecuteResponsePayload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteResponsePayload;
  static deserializeBinaryFromReader(message: ExecuteResponsePayload, reader: jspb.BinaryReader): ExecuteResponsePayload;
}

export namespace ExecuteResponsePayload {
  export type AsObject = {
    messagesList: Array<Message.AsObject>,
    qaAction?: QAAction.AsObject,
    daAction?: DAAction.AsObject,
    escalationAction?: EscalationAction.AsObject,
    endAction?: EndAction.AsObject,
    continueAction?: ContinueAction.AsObject,
  }

  export enum ActionCase {
    ACTION_NOT_SET = 0,
    QA_ACTION = 2,
    DA_ACTION = 3,
    ESCALATION_ACTION = 4,
    END_ACTION = 5,
    CONTINUE_ACTION = 6,
  }
}

export class Message extends jspb.Message {
  clearNlgList(): void;
  getNlgList(): Array<Message.Nlg>;
  setNlgList(value: Array<Message.Nlg>): void;
  addNlg(value?: Message.Nlg, index?: number): Message.Nlg;

  clearVisualList(): void;
  getVisualList(): Array<Message.Visual>;
  setVisualList(value: Array<Message.Visual>): void;
  addVisual(value?: Message.Visual, index?: number): Message.Visual;

  clearAudioList(): void;
  getAudioList(): Array<Message.Audio>;
  setAudioList(value: Array<Message.Audio>): void;
  addAudio(value?: Message.Audio, index?: number): Message.Audio;

  hasView(): boolean;
  clearView(): void;
  getView(): View | undefined;
  setView(value?: View): void;

  getLanguage(): string;
  setLanguage(value: string): void;

  hasTtsParameters(): boolean;
  clearTtsParameters(): void;
  getTtsParameters(): Message.TTSParameters | undefined;
  setTtsParameters(value?: Message.TTSParameters): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    nlgList: Array<Message.Nlg.AsObject>,
    visualList: Array<Message.Visual.AsObject>,
    audioList: Array<Message.Audio.AsObject>,
    view?: View.AsObject,
    language: string,
    ttsParameters?: Message.TTSParameters.AsObject,
  }

  export class Nlg extends jspb.Message {
    getText(): string;
    setText(value: string): void;

    getMask(): boolean;
    setMask(value: boolean): void;

    getBargeInDisabled(): boolean;
    setBargeInDisabled(value: boolean): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Nlg.AsObject;
    static toObject(includeInstance: boolean, msg: Nlg): Nlg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Nlg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Nlg;
    static deserializeBinaryFromReader(message: Nlg, reader: jspb.BinaryReader): Nlg;
  }

  export namespace Nlg {
    export type AsObject = {
      text: string,
      mask: boolean,
      bargeInDisabled: boolean,
    }
  }

  export class Visual extends jspb.Message {
    getText(): string;
    setText(value: string): void;

    getMask(): boolean;
    setMask(value: boolean): void;

    getBargeInDisabled(): boolean;
    setBargeInDisabled(value: boolean): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Visual.AsObject;
    static toObject(includeInstance: boolean, msg: Visual): Visual.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Visual, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Visual;
    static deserializeBinaryFromReader(message: Visual, reader: jspb.BinaryReader): Visual;
  }

  export namespace Visual {
    export type AsObject = {
      text: string,
      mask: boolean,
      bargeInDisabled: boolean,
    }
  }

  export class Audio extends jspb.Message {
    getText(): string;
    setText(value: string): void;

    hasUri(): boolean;
    clearUri(): void;
    getUri(): string;
    setUri(value: string): void;

    getMask(): boolean;
    setMask(value: boolean): void;

    getBargeInDisabled(): boolean;
    setBargeInDisabled(value: boolean): void;

    getAudiosrcCase(): Audio.AudiosrcCase;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Audio.AsObject;
    static toObject(includeInstance: boolean, msg: Audio): Audio.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Audio, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Audio;
    static deserializeBinaryFromReader(message: Audio, reader: jspb.BinaryReader): Audio;
  }

  export namespace Audio {
    export type AsObject = {
      text: string,
      uri: string,
      mask: boolean,
      bargeInDisabled: boolean,
    }

    export enum AudiosrcCase {
      AUDIOSRC_NOT_SET = 0,
      URI = 2,
    }
  }

  export class TTSParameters extends jspb.Message {
    hasVoice(): boolean;
    clearVoice(): void;
    getVoice(): Message.TTSParameters.Voice | undefined;
    setVoice(value?: Message.TTSParameters.Voice): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TTSParameters.AsObject;
    static toObject(includeInstance: boolean, msg: TTSParameters): TTSParameters.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TTSParameters, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TTSParameters;
    static deserializeBinaryFromReader(message: TTSParameters, reader: jspb.BinaryReader): TTSParameters;
  }

  export namespace TTSParameters {
    export type AsObject = {
      voice?: Message.TTSParameters.Voice.AsObject,
    }

    export class Voice extends jspb.Message {
      getName(): string;
      setName(value: string): void;

      getModel(): string;
      setModel(value: string): void;

      getGender(): Message.TTSParameters.Voice.EnumGenderMap[keyof Message.TTSParameters.Voice.EnumGenderMap];
      setGender(value: Message.TTSParameters.Voice.EnumGenderMap[keyof Message.TTSParameters.Voice.EnumGenderMap]): void;

      getLanguage(): string;
      setLanguage(value: string): void;

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
        gender: Message.TTSParameters.Voice.EnumGenderMap[keyof Message.TTSParameters.Voice.EnumGenderMap],
        language: string,
      }

      export interface EnumGenderMap {
        ANY: 0;
        MALE: 1;
        FEMALE: 2;
        NEUTRAL: 3;
      }

      export const EnumGender: EnumGenderMap;
    }
  }
}

export class View extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): View.AsObject;
  static toObject(includeInstance: boolean, msg: View): View.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: View, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): View;
  static deserializeBinaryFromReader(message: View, reader: jspb.BinaryReader): View;
}

export namespace View {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class Selectable extends jspb.Message {
  clearSelectableItemsList(): void;
  getSelectableItemsList(): Array<Selectable.SelectableItem>;
  setSelectableItemsList(value: Array<Selectable.SelectableItem>): void;
  addSelectableItems(value?: Selectable.SelectableItem, index?: number): Selectable.SelectableItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Selectable.AsObject;
  static toObject(includeInstance: boolean, msg: Selectable): Selectable.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Selectable, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Selectable;
  static deserializeBinaryFromReader(message: Selectable, reader: jspb.BinaryReader): Selectable;
}

export namespace Selectable {
  export type AsObject = {
    selectableItemsList: Array<Selectable.SelectableItem.AsObject>,
  }

  export class SelectableItem extends jspb.Message {
    hasValue(): boolean;
    clearValue(): void;
    getValue(): Selectable.SelectableItem.SelectedValue | undefined;
    setValue(value?: Selectable.SelectableItem.SelectedValue): void;

    getDescription(): string;
    setDescription(value: string): void;

    getDisplayText(): string;
    setDisplayText(value: string): void;

    getDisplayImageUri(): string;
    setDisplayImageUri(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SelectableItem.AsObject;
    static toObject(includeInstance: boolean, msg: SelectableItem): SelectableItem.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SelectableItem, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SelectableItem;
    static deserializeBinaryFromReader(message: SelectableItem, reader: jspb.BinaryReader): SelectableItem;
  }

  export namespace SelectableItem {
    export type AsObject = {
      value?: Selectable.SelectableItem.SelectedValue.AsObject,
      description: string,
      displayText: string,
      displayImageUri: string,
    }

    export class SelectedValue extends jspb.Message {
      getId(): string;
      setId(value: string): void;

      getValue(): string;
      setValue(value: string): void;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): SelectedValue.AsObject;
      static toObject(includeInstance: boolean, msg: SelectedValue): SelectedValue.AsObject;
      static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
      static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
      static serializeBinaryToWriter(message: SelectedValue, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): SelectedValue;
      static deserializeBinaryFromReader(message: SelectedValue, reader: jspb.BinaryReader): SelectedValue;
    }

    export namespace SelectedValue {
      export type AsObject = {
        id: string,
        value: string,
      }
    }
  }
}

export class RecognitionSettings extends jspb.Message {
  clearDtmfMappingsList(): void;
  getDtmfMappingsList(): Array<RecognitionSettings.DtmfMapping>;
  setDtmfMappingsList(value: Array<RecognitionSettings.DtmfMapping>): void;
  addDtmfMappings(value?: RecognitionSettings.DtmfMapping, index?: number): RecognitionSettings.DtmfMapping;

  hasCollectionSettings(): boolean;
  clearCollectionSettings(): void;
  getCollectionSettings(): RecognitionSettings.CollectionSettings | undefined;
  setCollectionSettings(value?: RecognitionSettings.CollectionSettings): void;

  hasSpeechSettings(): boolean;
  clearSpeechSettings(): void;
  getSpeechSettings(): RecognitionSettings.SpeechSettings | undefined;
  setSpeechSettings(value?: RecognitionSettings.SpeechSettings): void;

  hasDtmfSettings(): boolean;
  clearDtmfSettings(): void;
  getDtmfSettings(): RecognitionSettings.DtmfSettings | undefined;
  setDtmfSettings(value?: RecognitionSettings.DtmfSettings): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecognitionSettings.AsObject;
  static toObject(includeInstance: boolean, msg: RecognitionSettings): RecognitionSettings.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RecognitionSettings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecognitionSettings;
  static deserializeBinaryFromReader(message: RecognitionSettings, reader: jspb.BinaryReader): RecognitionSettings;
}

export namespace RecognitionSettings {
  export type AsObject = {
    dtmfMappingsList: Array<RecognitionSettings.DtmfMapping.AsObject>,
    collectionSettings?: RecognitionSettings.CollectionSettings.AsObject,
    speechSettings?: RecognitionSettings.SpeechSettings.AsObject,
    dtmfSettings?: RecognitionSettings.DtmfSettings.AsObject,
  }

  export class DtmfMapping extends jspb.Message {
    getId(): string;
    setId(value: string): void;

    getValue(): string;
    setValue(value: string): void;

    getDtmfKey(): string;
    setDtmfKey(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DtmfMapping.AsObject;
    static toObject(includeInstance: boolean, msg: DtmfMapping): DtmfMapping.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DtmfMapping, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DtmfMapping;
    static deserializeBinaryFromReader(message: DtmfMapping, reader: jspb.BinaryReader): DtmfMapping;
  }

  export namespace DtmfMapping {
    export type AsObject = {
      id: string,
      value: string,
      dtmfKey: string,
    }
  }

  export class CollectionSettings extends jspb.Message {
    getTimeout(): string;
    setTimeout(value: string): void;

    getCompleteTimeout(): string;
    setCompleteTimeout(value: string): void;

    getIncompleteTimeout(): string;
    setIncompleteTimeout(value: string): void;

    getMaxSpeechTimeout(): string;
    setMaxSpeechTimeout(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CollectionSettings.AsObject;
    static toObject(includeInstance: boolean, msg: CollectionSettings): CollectionSettings.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CollectionSettings, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CollectionSettings;
    static deserializeBinaryFromReader(message: CollectionSettings, reader: jspb.BinaryReader): CollectionSettings;
  }

  export namespace CollectionSettings {
    export type AsObject = {
      timeout: string,
      completeTimeout: string,
      incompleteTimeout: string,
      maxSpeechTimeout: string,
    }
  }

  export class SpeechSettings extends jspb.Message {
    getSensitivity(): string;
    setSensitivity(value: string): void;

    getBargeInType(): string;
    setBargeInType(value: string): void;

    getSpeedVsAccuracy(): string;
    setSpeedVsAccuracy(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SpeechSettings.AsObject;
    static toObject(includeInstance: boolean, msg: SpeechSettings): SpeechSettings.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SpeechSettings, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SpeechSettings;
    static deserializeBinaryFromReader(message: SpeechSettings, reader: jspb.BinaryReader): SpeechSettings;
  }

  export namespace SpeechSettings {
    export type AsObject = {
      sensitivity: string,
      bargeInType: string,
      speedVsAccuracy: string,
    }
  }

  export class DtmfSettings extends jspb.Message {
    getInterDigitTimeout(): string;
    setInterDigitTimeout(value: string): void;

    getTermTimeout(): string;
    setTermTimeout(value: string): void;

    getTermChar(): string;
    setTermChar(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DtmfSettings.AsObject;
    static toObject(includeInstance: boolean, msg: DtmfSettings): DtmfSettings.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DtmfSettings, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DtmfSettings;
    static deserializeBinaryFromReader(message: DtmfSettings, reader: jspb.BinaryReader): DtmfSettings;
  }

  export namespace DtmfSettings {
    export type AsObject = {
      interDigitTimeout: string,
      termTimeout: string,
      termChar: string,
    }
  }
}

export class MessageSettings extends jspb.Message {
  getDelay(): string;
  setDelay(value: string): void;

  getMinimum(): string;
  setMinimum(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageSettings.AsObject;
  static toObject(includeInstance: boolean, msg: MessageSettings): MessageSettings.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageSettings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageSettings;
  static deserializeBinaryFromReader(message: MessageSettings, reader: jspb.BinaryReader): MessageSettings;
}

export namespace MessageSettings {
  export type AsObject = {
    delay: string,
    minimum: string,
  }
}

export class QAAction extends jspb.Message {
  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Message | undefined;
  setMessage(value?: Message): void;

  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_struct_pb.Struct | undefined;
  setData(value?: google_protobuf_struct_pb.Struct): void;

  hasView(): boolean;
  clearView(): void;
  getView(): View | undefined;
  setView(value?: View): void;

  hasSelectable(): boolean;
  clearSelectable(): void;
  getSelectable(): Selectable | undefined;
  setSelectable(value?: Selectable): void;

  hasRecognitionSettings(): boolean;
  clearRecognitionSettings(): void;
  getRecognitionSettings(): RecognitionSettings | undefined;
  setRecognitionSettings(value?: RecognitionSettings): void;

  getMask(): boolean;
  setMask(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QAAction.AsObject;
  static toObject(includeInstance: boolean, msg: QAAction): QAAction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QAAction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QAAction;
  static deserializeBinaryFromReader(message: QAAction, reader: jspb.BinaryReader): QAAction;
}

export namespace QAAction {
  export type AsObject = {
    message?: Message.AsObject,
    data?: google_protobuf_struct_pb.Struct.AsObject,
    view?: View.AsObject,
    selectable?: Selectable.AsObject,
    recognitionSettings?: RecognitionSettings.AsObject,
    mask: boolean,
  }
}

export class BackendConnectionSettings extends jspb.Message {
  getFetchTimeout(): string;
  setFetchTimeout(value: string): void;

  getConnectTimeout(): string;
  setConnectTimeout(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BackendConnectionSettings.AsObject;
  static toObject(includeInstance: boolean, msg: BackendConnectionSettings): BackendConnectionSettings.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BackendConnectionSettings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BackendConnectionSettings;
  static deserializeBinaryFromReader(message: BackendConnectionSettings, reader: jspb.BinaryReader): BackendConnectionSettings;
}

export namespace BackendConnectionSettings {
  export type AsObject = {
    fetchTimeout: string,
    connectTimeout: string,
  }
}

export class DAAction extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Message | undefined;
  setMessage(value?: Message): void;

  hasView(): boolean;
  clearView(): void;
  getView(): View | undefined;
  setView(value?: View): void;

  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_struct_pb.Struct | undefined;
  setData(value?: google_protobuf_struct_pb.Struct): void;

  hasMessageSettings(): boolean;
  clearMessageSettings(): void;
  getMessageSettings(): MessageSettings | undefined;
  setMessageSettings(value?: MessageSettings): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DAAction.AsObject;
  static toObject(includeInstance: boolean, msg: DAAction): DAAction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DAAction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DAAction;
  static deserializeBinaryFromReader(message: DAAction, reader: jspb.BinaryReader): DAAction;
}

export namespace DAAction {
  export type AsObject = {
    id: string,
    message?: Message.AsObject,
    view?: View.AsObject,
    data?: google_protobuf_struct_pb.Struct.AsObject,
    messageSettings?: MessageSettings.AsObject,
  }
}

export class EscalationAction extends jspb.Message {
  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Message | undefined;
  setMessage(value?: Message): void;

  hasView(): boolean;
  clearView(): void;
  getView(): View | undefined;
  setView(value?: View): void;

  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_struct_pb.Struct | undefined;
  setData(value?: google_protobuf_struct_pb.Struct): void;

  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EscalationAction.AsObject;
  static toObject(includeInstance: boolean, msg: EscalationAction): EscalationAction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EscalationAction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EscalationAction;
  static deserializeBinaryFromReader(message: EscalationAction, reader: jspb.BinaryReader): EscalationAction;
}

export namespace EscalationAction {
  export type AsObject = {
    message?: Message.AsObject,
    view?: View.AsObject,
    data?: google_protobuf_struct_pb.Struct.AsObject,
    id: string,
  }
}

export class EndAction extends jspb.Message {
  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_struct_pb.Struct | undefined;
  setData(value?: google_protobuf_struct_pb.Struct): void;

  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EndAction.AsObject;
  static toObject(includeInstance: boolean, msg: EndAction): EndAction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EndAction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EndAction;
  static deserializeBinaryFromReader(message: EndAction, reader: jspb.BinaryReader): EndAction;
}

export namespace EndAction {
  export type AsObject = {
    data?: google_protobuf_struct_pb.Struct.AsObject,
    id: string,
  }
}

export class ContinueAction extends jspb.Message {
  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Message | undefined;
  setMessage(value?: Message): void;

  hasView(): boolean;
  clearView(): void;
  getView(): View | undefined;
  setView(value?: View): void;

  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_struct_pb.Struct | undefined;
  setData(value?: google_protobuf_struct_pb.Struct): void;

  getId(): string;
  setId(value: string): void;

  hasMessageSettings(): boolean;
  clearMessageSettings(): void;
  getMessageSettings(): MessageSettings | undefined;
  setMessageSettings(value?: MessageSettings): void;

  hasBackendConnectionSettings(): boolean;
  clearBackendConnectionSettings(): void;
  getBackendConnectionSettings(): BackendConnectionSettings | undefined;
  setBackendConnectionSettings(value?: BackendConnectionSettings): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContinueAction.AsObject;
  static toObject(includeInstance: boolean, msg: ContinueAction): ContinueAction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContinueAction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContinueAction;
  static deserializeBinaryFromReader(message: ContinueAction, reader: jspb.BinaryReader): ContinueAction;
}

export namespace ContinueAction {
  export type AsObject = {
    message?: Message.AsObject,
    view?: View.AsObject,
    data?: google_protobuf_struct_pb.Struct.AsObject,
    id: string,
    messageSettings?: MessageSettings.AsObject,
    backendConnectionSettings?: BackendConnectionSettings.AsObject,
  }
}

export class VxmlConfiguration extends jspb.Message {
  clearResourcesList(): void;
  getResourcesList(): Array<VxmlResourceReference>;
  setResourcesList(value: Array<VxmlResourceReference>): void;
  addResources(value?: VxmlResourceReference, index?: number): VxmlResourceReference;

  getPropertiesMap(): jspb.Map<string, string>;
  clearPropertiesMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VxmlConfiguration.AsObject;
  static toObject(includeInstance: boolean, msg: VxmlConfiguration): VxmlConfiguration.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VxmlConfiguration, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VxmlConfiguration;
  static deserializeBinaryFromReader(message: VxmlConfiguration, reader: jspb.BinaryReader): VxmlConfiguration;
}

export namespace VxmlConfiguration {
  export type AsObject = {
    resourcesList: Array<VxmlResourceReference.AsObject>,
    propertiesMap: Array<[string, string]>,
  }
}

export class VxmlResourceReference extends jspb.Message {
  hasGrammarReference(): boolean;
  clearGrammarReference(): void;
  getGrammarReference(): VxmlResourceReference.GrammarResourceReference | undefined;
  setGrammarReference(value?: VxmlResourceReference.GrammarResourceReference): void;

  hasWordsetJson(): boolean;
  clearWordsetJson(): void;
  getWordsetJson(): string;
  setWordsetJson(value: string): void;

  getResourceUnionCase(): VxmlResourceReference.ResourceUnionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VxmlResourceReference.AsObject;
  static toObject(includeInstance: boolean, msg: VxmlResourceReference): VxmlResourceReference.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VxmlResourceReference, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VxmlResourceReference;
  static deserializeBinaryFromReader(message: VxmlResourceReference, reader: jspb.BinaryReader): VxmlResourceReference;
}

export namespace VxmlResourceReference {
  export type AsObject = {
    grammarReference?: VxmlResourceReference.GrammarResourceReference.AsObject,
    wordsetJson: string,
  }

  export class GrammarResourceReference extends jspb.Message {
    getUri(): string;
    setUri(value: string): void;

    getType(): VxmlResourceReference.GrammarResourceReference.EnumResourceTypeMap[keyof VxmlResourceReference.GrammarResourceReference.EnumResourceTypeMap];
    setType(value: VxmlResourceReference.GrammarResourceReference.EnumResourceTypeMap[keyof VxmlResourceReference.GrammarResourceReference.EnumResourceTypeMap]): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GrammarResourceReference.AsObject;
    static toObject(includeInstance: boolean, msg: GrammarResourceReference): GrammarResourceReference.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GrammarResourceReference, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GrammarResourceReference;
    static deserializeBinaryFromReader(message: GrammarResourceReference, reader: jspb.BinaryReader): GrammarResourceReference;
  }

  export namespace GrammarResourceReference {
    export type AsObject = {
      uri: string,
      type: VxmlResourceReference.GrammarResourceReference.EnumResourceTypeMap[keyof VxmlResourceReference.GrammarResourceReference.EnumResourceTypeMap],
    }

    export interface EnumResourceTypeMap {
      SEMANTIC_MODEL: 0;
      SPEECH_GRAMMAR: 1;
      DTMF_GRAMMAR: 2;
      ASR_DLM: 3;
    }

    export const EnumResourceType: EnumResourceTypeMap;
  }

  export enum ResourceUnionCase {
    RESOURCE_UNION_NOT_SET = 0,
    GRAMMAR_REFERENCE = 1,
    WORDSET_JSON = 2,
  }
}

export class DialogEvent extends jspb.Message {
  getType(): DialogEvent.EventTypeMap[keyof DialogEvent.EventTypeMap];
  setType(value: DialogEvent.EventTypeMap[keyof DialogEvent.EventTypeMap]): void;

  getMessage(): string;
  setMessage(value: string): void;

  getEventName(): string;
  setEventName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DialogEvent.AsObject;
  static toObject(includeInstance: boolean, msg: DialogEvent): DialogEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DialogEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DialogEvent;
  static deserializeBinaryFromReader(message: DialogEvent, reader: jspb.BinaryReader): DialogEvent;
}

export namespace DialogEvent {
  export type AsObject = {
    type: DialogEvent.EventTypeMap[keyof DialogEvent.EventTypeMap],
    message: string,
    eventName: string,
  }

  export interface EventTypeMap {
    SUCCESS: 0;
    ERROR: 1;
    NO_INPUT: 2;
    NO_MATCH: 3;
    HANGUP: 4;
    CUSTOM: 5;
  }

  export const EventType: EventTypeMap;
}

export class Selector extends jspb.Message {
  getChannel(): string;
  setChannel(value: string): void;

  getLanguage(): string;
  setLanguage(value: string): void;

  getLibrary(): string;
  setLibrary(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Selector.AsObject;
  static toObject(includeInstance: boolean, msg: Selector): Selector.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Selector, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Selector;
  static deserializeBinaryFromReader(message: Selector, reader: jspb.BinaryReader): Selector;
}

export namespace Selector {
  export type AsObject = {
    channel: string,
    language: string,
    library: string,
  }
}

