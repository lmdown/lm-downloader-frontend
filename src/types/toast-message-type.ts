export type ToastType = 'success' | 'error' | 'warning' | 'error' | string

export type ShowToastMessage = (message: string,
  type: ToastType) => void;
