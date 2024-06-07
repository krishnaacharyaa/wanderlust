export type ApiErrorType = {
  status: number;
  data: string;
  success: boolean;
  errors: {
    message: string;
  }[];
};
