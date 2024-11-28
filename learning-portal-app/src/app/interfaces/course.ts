import { ContentElement } from "./content-element";


export interface CoursePostData {
    courseTitle: string;
    courseDescription: string;
    elements: ContentElement[]; // Add elements here
}

export interface Course extends CoursePostData {
    id: string;
}
