export enum VideoFilter {
  None = 'none',
  Grayscale = 'grayscale(100%)',
  Sepia = 'sepia(100%)',
  Invert = 'invert(100%)',
  Blur = 'blur(5px)',
  Contrast = 'contrast(200%)'
}

export interface SyncMessage {
  type: 'FILTER_CHANGE';
  payload: VideoFilter;
}