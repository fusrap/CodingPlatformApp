import { ContentElement } from "./content-element";


export interface CoursePostData {
    courseTitle: string;
    courseDescription: string;
    elements: ContentElement[];
}

export interface Course extends CoursePostData {
    id: number;
}
