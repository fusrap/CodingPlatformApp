import { ContentElement, TextElement, InputElement } from "./content-element";

export interface ExtendedContentElement extends ContentElement {
    userAnswer?: string;
    isCorrect?: boolean | null; 
  }
  
  export interface ExtendedTextElement extends TextElement {}
  
  export interface ExtendedInputElement extends InputElement, ExtendedContentElement {}