// package: nuance.nlu.v1
// file: nuance/nlu/v1/multi-intent-interpretation.proto

import * as jspb from "google-protobuf";
import * as nuance_nlu_v1_interpretation_common_pb from "../../../nuance/nlu/v1/interpretation-common_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class MultiIntentInterpretation extends jspb.Message {
  hasRoot(): boolean;
  clearRoot(): void;
  getRoot(): InterpretationNode | undefined;
  setRoot(value?: InterpretationNode): void;

  getMetadataMap(): jspb.Map<string, google_protobuf_any_pb.Any>;
  clearMetadataMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MultiIntentInterpretation.AsObject;
  static toObject(includeInstance: boolean, msg: MultiIntentInterpretation): MultiIntentInterpretation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MultiIntentInterpretation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MultiIntentInterpretation;
  static deserializeBinaryFromReader(message: MultiIntentInterpretation, reader: jspb.BinaryReader): MultiIntentInterpretation;
}

export namespace MultiIntentInterpretation {
  export type AsObject = {
    root?: InterpretationNode.AsObject,
    metadataMap: Array<[string, google_protobuf_any_pb.Any.AsObject]>,
  }
}

export class InterpretationNode extends jspb.Message {
  hasOperator(): boolean;
  clearOperator(): void;
  getOperator(): OperatorNode | undefined;
  setOperator(value?: OperatorNode): void;

  hasIntent(): boolean;
  clearIntent(): void;
  getIntent(): IntentNode | undefined;
  setIntent(value?: IntentNode): void;

  hasEntity(): boolean;
  clearEntity(): void;
  getEntity(): EntityNode | undefined;
  setEntity(value?: EntityNode): void;

  getInterpretationNodeUnionCase(): InterpretationNode.InterpretationNodeUnionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InterpretationNode.AsObject;
  static toObject(includeInstance: boolean, msg: InterpretationNode): InterpretationNode.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InterpretationNode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InterpretationNode;
  static deserializeBinaryFromReader(message: InterpretationNode, reader: jspb.BinaryReader): InterpretationNode;
}

export namespace InterpretationNode {
  export type AsObject = {
    operator?: OperatorNode.AsObject,
    intent?: IntentNode.AsObject,
    entity?: EntityNode.AsObject,
  }

  export enum InterpretationNodeUnionCase {
    INTERPRETATION_NODE_UNION_NOT_SET = 0,
    OPERATOR = 1,
    INTENT = 2,
    ENTITY = 3,
  }
}

export class OperatorNode extends jspb.Message {
  getOperator(): EnumOperatorMap[keyof EnumOperatorMap];
  setOperator(value: EnumOperatorMap[keyof EnumOperatorMap]): void;

  hasTextRange(): boolean;
  clearTextRange(): void;
  getTextRange(): nuance_nlu_v1_interpretation_common_pb.TextRange | undefined;
  setTextRange(value?: nuance_nlu_v1_interpretation_common_pb.TextRange): void;

  clearChildrenList(): void;
  getChildrenList(): Array<InterpretationNode>;
  setChildrenList(value: Array<InterpretationNode>): void;
  addChildren(value?: InterpretationNode, index?: number): InterpretationNode;

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

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OperatorNode.AsObject;
  static toObject(includeInstance: boolean, msg: OperatorNode): OperatorNode.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OperatorNode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OperatorNode;
  static deserializeBinaryFromReader(message: OperatorNode, reader: jspb.BinaryReader): OperatorNode;
}

export namespace OperatorNode {
  export type AsObject = {
    operator: EnumOperatorMap[keyof EnumOperatorMap],
    textRange?: nuance_nlu_v1_interpretation_common_pb.TextRange.AsObject,
    childrenList: Array<InterpretationNode.AsObject>,
    literal: string,
    sensitive: boolean,
    formattedLiteral: string,
    formattedTextRange?: nuance_nlu_v1_interpretation_common_pb.TextRange.AsObject,
    metadataMap: Array<[string, google_protobuf_any_pb.Any.AsObject]>,
    audioRange?: nuance_nlu_v1_interpretation_common_pb.AudioRange.AsObject,
  }
}

export class IntentNode extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  hasTextRange(): boolean;
  clearTextRange(): void;
  getTextRange(): nuance_nlu_v1_interpretation_common_pb.TextRange | undefined;
  setTextRange(value?: nuance_nlu_v1_interpretation_common_pb.TextRange): void;

  getConfidence(): number;
  setConfidence(value: number): void;

  getOrigin(): nuance_nlu_v1_interpretation_common_pb.EnumOriginMap[keyof nuance_nlu_v1_interpretation_common_pb.EnumOriginMap];
  setOrigin(value: nuance_nlu_v1_interpretation_common_pb.EnumOriginMap[keyof nuance_nlu_v1_interpretation_common_pb.EnumOriginMap]): void;

  clearChildrenList(): void;
  getChildrenList(): Array<InterpretationNode>;
  setChildrenList(value: Array<InterpretationNode>): void;
  addChildren(value?: InterpretationNode, index?: number): InterpretationNode;

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

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IntentNode.AsObject;
  static toObject(includeInstance: boolean, msg: IntentNode): IntentNode.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IntentNode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IntentNode;
  static deserializeBinaryFromReader(message: IntentNode, reader: jspb.BinaryReader): IntentNode;
}

export namespace IntentNode {
  export type AsObject = {
    name: string,
    textRange?: nuance_nlu_v1_interpretation_common_pb.TextRange.AsObject,
    confidence: number,
    origin: nuance_nlu_v1_interpretation_common_pb.EnumOriginMap[keyof nuance_nlu_v1_interpretation_common_pb.EnumOriginMap],
    childrenList: Array<InterpretationNode.AsObject>,
    literal: string,
    sensitive: boolean,
    formattedLiteral: string,
    formattedTextRange?: nuance_nlu_v1_interpretation_common_pb.TextRange.AsObject,
    metadataMap: Array<[string, google_protobuf_any_pb.Any.AsObject]>,
    audioRange?: nuance_nlu_v1_interpretation_common_pb.AudioRange.AsObject,
  }
}

export class EntityNode extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  hasTextRange(): boolean;
  clearTextRange(): void;
  getTextRange(): nuance_nlu_v1_interpretation_common_pb.TextRange | undefined;
  setTextRange(value?: nuance_nlu_v1_interpretation_common_pb.TextRange): void;

  getConfidence(): number;
  setConfidence(value: number): void;

  getOrigin(): nuance_nlu_v1_interpretation_common_pb.EnumOriginMap[keyof nuance_nlu_v1_interpretation_common_pb.EnumOriginMap];
  setOrigin(value: nuance_nlu_v1_interpretation_common_pb.EnumOriginMap[keyof nuance_nlu_v1_interpretation_common_pb.EnumOriginMap]): void;

  clearChildrenList(): void;
  getChildrenList(): Array<InterpretationNode>;
  setChildrenList(value: Array<InterpretationNode>): void;
  addChildren(value?: InterpretationNode, index?: number): InterpretationNode;

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

  getValueUnionCase(): EntityNode.ValueUnionCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntityNode.AsObject;
  static toObject(includeInstance: boolean, msg: EntityNode): EntityNode.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntityNode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntityNode;
  static deserializeBinaryFromReader(message: EntityNode, reader: jspb.BinaryReader): EntityNode;
}

export namespace EntityNode {
  export type AsObject = {
    name: string,
    textRange?: nuance_nlu_v1_interpretation_common_pb.TextRange.AsObject,
    confidence: number,
    origin: nuance_nlu_v1_interpretation_common_pb.EnumOriginMap[keyof nuance_nlu_v1_interpretation_common_pb.EnumOriginMap],
    childrenList: Array<InterpretationNode.AsObject>,
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

export interface EnumOperatorMap {
  AND: 0;
  OR: 1;
  NOT: 2;
}

export const EnumOperator: EnumOperatorMap;

