// package: nuance.rpc
// file: nuance/rpc/status.proto

import * as jspb from "google-protobuf";
import * as nuance_rpc_status_code_pb from "../../nuance/rpc/status_code_pb";
import * as nuance_rpc_error_details_pb from "../../nuance/rpc/error_details_pb";

export class Status extends jspb.Message {
  getStatusCode(): nuance_rpc_status_code_pb.StatusCodeMap[keyof nuance_rpc_status_code_pb.StatusCodeMap];
  setStatusCode(value: nuance_rpc_status_code_pb.StatusCodeMap[keyof nuance_rpc_status_code_pb.StatusCodeMap]): void;

  getStatusSubCode(): number;
  setStatusSubCode(value: number): void;

  getHttpTransCode(): number;
  setHttpTransCode(value: number): void;

  hasRequestInfo(): boolean;
  clearRequestInfo(): void;
  getRequestInfo(): nuance_rpc_error_details_pb.RequestInfo | undefined;
  setRequestInfo(value?: nuance_rpc_error_details_pb.RequestInfo): void;

  hasStatusMessage(): boolean;
  clearStatusMessage(): void;
  getStatusMessage(): nuance_rpc_error_details_pb.LocalizedMessage | undefined;
  setStatusMessage(value?: nuance_rpc_error_details_pb.LocalizedMessage): void;

  hasHelpInfo(): boolean;
  clearHelpInfo(): void;
  getHelpInfo(): nuance_rpc_error_details_pb.HelpInfo | undefined;
  setHelpInfo(value?: nuance_rpc_error_details_pb.HelpInfo): void;

  clearFieldViolationsList(): void;
  getFieldViolationsList(): Array<nuance_rpc_error_details_pb.FieldViolation>;
  setFieldViolationsList(value: Array<nuance_rpc_error_details_pb.FieldViolation>): void;
  addFieldViolations(value?: nuance_rpc_error_details_pb.FieldViolation, index?: number): nuance_rpc_error_details_pb.FieldViolation;

  hasRetryInfo(): boolean;
  clearRetryInfo(): void;
  getRetryInfo(): nuance_rpc_error_details_pb.RetryInfo | undefined;
  setRetryInfo(value?: nuance_rpc_error_details_pb.RetryInfo): void;

  clearStatusDetailsList(): void;
  getStatusDetailsList(): Array<nuance_rpc_error_details_pb.StatusDetail>;
  setStatusDetailsList(value: Array<nuance_rpc_error_details_pb.StatusDetail>): void;
  addStatusDetails(value?: nuance_rpc_error_details_pb.StatusDetail, index?: number): nuance_rpc_error_details_pb.StatusDetail;

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
    statusCode: nuance_rpc_status_code_pb.StatusCodeMap[keyof nuance_rpc_status_code_pb.StatusCodeMap],
    statusSubCode: number,
    httpTransCode: number,
    requestInfo?: nuance_rpc_error_details_pb.RequestInfo.AsObject,
    statusMessage?: nuance_rpc_error_details_pb.LocalizedMessage.AsObject,
    helpInfo?: nuance_rpc_error_details_pb.HelpInfo.AsObject,
    fieldViolationsList: Array<nuance_rpc_error_details_pb.FieldViolation.AsObject>,
    retryInfo?: nuance_rpc_error_details_pb.RetryInfo.AsObject,
    statusDetailsList: Array<nuance_rpc_error_details_pb.StatusDetail.AsObject>,
  }
}

