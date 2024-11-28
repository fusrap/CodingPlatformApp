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
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TextElementComponent } from '../elements/text-element/text-element.component';
import { ContentElement, TextElement } from '../../../interfaces/content-element';

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
    { name: 'TextArea', type: 'TextArea', value: TextElementComponent },
  ];
  selectedElementType: any | undefined;

  private isContainerReady = false;

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

  addElement() {
    if (this.selectedElementType && this.isContainerReady) {
      const componentRef = this.container.createComponent(
        this.selectedElementType.value
      );
  
      const instance = componentRef.instance as TextElementComponent;
  
      const newElement: TextElement = {
        id: Date.now(),
        text: '',
      };
  
      instance.id = newElement.id;
      instance.textChange.subscribe((newText: string) => {
        newElement.text = newText; // Update text in the elements array
      });
      instance.onDelete.subscribe(() => {
        this.removeElement(newElement.id); // Handle delete via event emitter
      });
  
      this.elements.push(newElement);
      this.elementsChange.emit(this.elements);
      console.log('Added element:', newElement);
    } else {
      console.error(
        'Cannot add element. Either selectedElementType or container is not ready.'
      );
    }
  }
  
  

  removeElement(id: number) {
    // Find the element index
    const elementIndex = this.elements.findIndex((el) => el.id === id);
    if (elementIndex > -1) {
      // Remove the element from the array
      const [removedElement] = this.elements.splice(elementIndex, 1);
  
      // Destroy the associated component if it exists
      if (removedElement.componentRef) {
        removedElement.componentRef.destroy();
        console.log(`Component with ID ${id} destroyed.`);
      } else {
        console.warn(`No componentRef found for element with ID ${id}.`);
      }
  
      // Emit the updated list of elements
      this.elementsChange.emit([...this.elements]); // Spread operator to ensure Angular detects the change
      console.log('Removed element with ID:', id, 'Updated elements:', this.elements);
    } else {
      console.error(`Element with ID ${id} not found.`);
    }
  }
  

  private rebuildElements() {
    if (!this.isContainerReady || !this.container) {
      console.error('Container is not ready for rebuilding elements.');
      return;
    }
  
    this.container.clear();
  
    for (const element of this.elements) {
      // Ensure the element is of type TextElement
      if ((element as TextElement).text !== undefined) {
        const textElement = element as TextElement;
  
        // Create the TextElementComponent
        const componentRef = this.container.createComponent(TextElementComponent);
        const instance = componentRef.instance as TextElementComponent;
  
        // Restore the properties
        instance.id = textElement.id;
        instance.text = textElement.text;
  
        // Listen to the textChange and onDelete events
        instance.textChange.subscribe((newText: string) => {
          textElement.text = newText; // Update the elements array when text changes
        });
        instance.onDelete.subscribe(() => {
          this.removeElement(textElement.id); // Remove element on delete
        });
  
        console.log('Rebuilt TextElement component:', instance);
      } else {
        console.warn('Unknown element type:', element);
      }
    }
  
    console.log('Rebuilt all elements.');
  }
  
}