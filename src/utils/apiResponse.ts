export const apiResponse = (success: boolean, message: string, data: any = null) => ({
  success,
  message,
  data,
});
