export enum ResponseStatus {
  success = "success",
  fail = "fail",
  error = "error",
  pending = "pending",
}

export const initialActionState = {
  status: ResponseStatus.pending,
  message: "",
  data: undefined,
};
