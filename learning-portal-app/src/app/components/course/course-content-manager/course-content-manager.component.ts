import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  SimpleChanges,
  ChangeDetectorRef,
  Type,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TextElementComponent } from '../elements/text-element/text-element.component';
import { ContentElement, ContentType, InputElement, TextElement } from '../../../interfaces/content-element';
import { InputElementComponent } from '../elements/input-element/input-element.component';

@Component({
  selector: 'app-course-content-manager',
  standalone: true,
  imports: [FormsModule, DropdownModule, ButtonModule, ButtonGroupModule],
  templateUrl: './course-content-manager.component.html',
  styleUrls: ['./course-content-manager.component.css'],
})
export class CourseContentManagerComponent implements OnInit, AfterViewInit {
  @Input() elements: ContentElement[] = [];
  @Output() elementsChange = new EventEmitter<ContentElement[]>();
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: false })
  container!: ViewContainerRef;

  elementTypes = [
    { name: 'TextArea', type: ContentType.Text, value: TextElementComponent },
    { name: 'Input', type: ContentType.Input, value: InputElementComponent },
  ];

  selectedElementType: any | undefined;
  private isContainerReady = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('Initialized CourseContentManagerComponent');
  }

  ngAfterViewInit() {
    this.isContainerReady = true;
    if (this.elements.length > 0) {
      this.rebuildElements();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isContainerReady && changes['elements'] && this.elements) {
      this.rebuildElements();
    }
  }

  /**
   * Adds a new element to the dynamic container
   */
  addElement() {
    if (this.selectedElementType && this.isContainerReady) {
      const componentType = this.selectedElementType.value as Type<TextElementComponent | InputElementComponent>;
      const componentRef = this.container.createComponent(componentType);
      const instance = componentRef.instance as any;

      const newElement = this.createElement(this.selectedElementType.type);
      newElement.componentRef = componentRef;

      // Assign properties to the instance and bind events
      instance.id = newElement.id;
      instance.isEditing = newElement.isEditing;

      if (this.selectedElementType.type === ContentType.Text) {
        instance.text = (newElement as TextElement).text;
        instance.textChange.subscribe((newText: string) => {
          (newElement as TextElement).text = newText;
        });
      } else if (this.selectedElementType.type === ContentType.Input) {
        instance.label = (newElement as InputElement).label;
        instance.answer = (newElement as InputElement).answer;
        instance.labelChange.subscribe((newLabel: string) => {
          (newElement as InputElement).label = newLabel;
        });
        instance.answerChange.subscribe((newAnswer: string) => {
          (newElement as InputElement).answer = newAnswer;
        });
      }

      instance.editModeChange.subscribe((isEditing: boolean) => {
        newElement.isEditing = isEditing;
      });

      instance.onDelete.subscribe(() => {
        this.removeElement(newElement.id);
      });

      this.elements.push(newElement);
      this.elementsChange.emit([...this.elements]);
      this.cdr.detectChanges(); // Trigger change detection to ensure UI reflects updates

      console.log('Added element:', newElement);
    } else {
      console.error('Cannot add element. Either selectedElementType or container is not ready.');
    }
  }

  /**
   * Removes an element by ID
   */
  removeElement(id: number) {
    const elementIndex = this.elements.findIndex((el) => el.id === id);

    if (elementIndex > -1) {
      const [removedElement] = this.elements.splice(elementIndex, 1);

      if (removedElement.componentRef) {
        removedElement.componentRef.destroy();
        console.log(`Component with ID ${id} destroyed.`);
      } else {
        console.warn(`No componentRef found for element with ID ${id}.`);
      }

      this.elementsChange.emit([...this.elements]);
      this.cdr.detectChanges(); // Trigger change detection
      console.log('Removed element with ID:', id, 'Updated elements:', this.elements);
    } else {
      console.error(`Element with ID ${id} not found.`);
    }
  }

  /**
   * Rebuilds the elements from the current elements list
   */
  private rebuildElements() {
    if (!this.isContainerReady || !this.container) {
      console.error('Container is not ready for rebuilding elements.');
      return;
    }

    this.container.clear();

    for (const element of this.elements) {
      let componentType: Type<any>;

      if (this.isTextElement(element)) {
        componentType = TextElementComponent;
      } else if (this.isInputElement(element)) {
        componentType = InputElementComponent;
      } else {
        console.error('Unknown element type:', element.type);
        continue;
      }

      const componentRef = this.container.createComponent(componentType);
      const instance = componentRef.instance as any;

      element.componentRef = componentRef;

      instance.id = element.id;
      instance.isEditing = element.isEditing; // Ensure editing state persists

      if (this.isTextElement(element)) {
        const textElement = element as TextElement;
        instance.text = textElement.text;
        instance.textChange.subscribe((newText: string) => {
          textElement.text = newText;
        });
      } else if (this.isInputElement(element)) {
        const inputElement = element as InputElement;
        instance.label = inputElement.label;
        instance.answer = inputElement.answer;
        instance.labelChange.subscribe((newLabel: string) => {
          inputElement.label = newLabel;
        });
        instance.answerChange.subscribe((newAnswer: string) => {
          inputElement.answer = newAnswer;
        });
      }

      instance.editModeChange.subscribe((isEditing: boolean) => {
        element.isEditing = isEditing;
      });

      instance.onDelete.subscribe(() => {
        this.removeElement(element.id);
      });
    }

    console.log('Rebuilt all elements.');
  }

  /**
   * Creates a new element object
   */
  private createElement(type: ContentType): ContentElement {
    const baseElement: ContentElement = {
      id: Date.now(),
      isEditing: true, // Default to editable when first created
      type, // Using ContentType enum
    };

    if (type === ContentType.Text) {
      return { ...baseElement, text: '' } as TextElement;
    } else if (type === ContentType.Input) {
      return { ...baseElement, label: '', answer: '' } as InputElement;
    }

    throw new Error(`Unknown element type: ${type}`);
  }

  private isTextElement(element: ContentElement): element is TextElement {
    return element.type === ContentType.Text;
  }

  private isInputElement(element: ContentElement): element is InputElement {
    return element.type === ContentType.Input;
  }
}
