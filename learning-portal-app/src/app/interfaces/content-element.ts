import { ComponentRef } from '@angular/core';

export enum ContentType {
  Text = 'Text',
  Input = 'Input',
}

export interface ContentElement {
  id: number;
  type: ContentType; 
  isEditing: boolean;
  componentRef?: ComponentRef<any>;
}

export interface TextElement extends ContentElement {
  text: string; 
}

export interface InputElement extends ContentElement {
  label: string; 
  answer: string;
}
