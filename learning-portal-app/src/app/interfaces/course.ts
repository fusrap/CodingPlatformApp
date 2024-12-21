import { ContentElement } from "./content-element";
import { ExtendedContentElement } from "./extended-content-element";


export interface CoursePostData {
    courseTitle: string;
    courseDescription: string;
    elements: ContentElement[];
}

export interface Course extends CoursePostData {
    id: number;
}


export interface ExtendedCourse {
    courseTitle: string;
    courseDescription: string;
    elements: ExtendedContentElement[];
    id: number;
  }
  