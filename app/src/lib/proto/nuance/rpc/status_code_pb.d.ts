// package: nuance.rpc
// file: nuance/rpc/status_code.proto

import * as jspb from "google-protobuf";

export interface StatusCodeMap {
  UNSPECIFIED: 0;
  OK: 1;
  BAD_REQUEST: 2;
  INVALID_REQUEST: 3;
  CANCELLED_CLIENT: 4;
  CANCELLED_SERVER: 5;
  DEADLINE_EXCEEDED: 6;
  NOT_AUTHORIZED: 7;
  PERMISSION_DENIED: 8;
  NOT_FOUND: 9;
  ALREADY_EXISTS: 10;
  NOT_IMPLEMENTED: 11;
  UNKNOWN: 15;
  TOO_LARGE: 51;
  BUSY: 52;
  OBSOLETE: 53;
  RATE_EXCEEDED: 54;
  QUOTA_EXCEEDED: 55;
  INTERNAL_ERROR: 56;
}

export const StatusCode: StatusCodeMap;

