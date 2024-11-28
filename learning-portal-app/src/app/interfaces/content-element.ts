import { ComponentRef } from '@angular/core';

export interface ContentElement {
  id: number;
  componentRef?: ComponentRef<any>; 
}

export interface TextElement extends ContentElement {
    text: string; 
  }
  