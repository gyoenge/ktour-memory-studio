export type AppStep = 'INTRO' | 'PHOTO_SELECTION' | 'CUSTOMIZATION' | 'LOADING' | 'RESULT';

export interface UserSelections {
  photo: string | null;
  background: string | null;
  elements: string[];
}
