import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';

export class TestElement {
  constructor(private debugElement: DebugElement) {}

  /** Returns descendant of current element by css selector. */
  get(cssPath): TestElement {
    const debugElement: DebugElement = this.debugElement.query(By.css(cssPath));
    return debugElement ? new TestElement(debugElement) : null;
  }

  /** Returns array of descendants of current element by css selector. */
  getAll(cssPath): Array<TestElement> {
    const debugElements: Array<DebugElement> = this.debugElement.queryAll(By.css(cssPath));
    return debugElements.map((debugElement) => new TestElement(debugElement));
  }

  /** Returns text of current element. */
  textContent(): string {
    return this.nativeElement.textContent;
  }

  /** Inputs value to the current element */
  input(value: string): void {
    this.nativeElement.value = value;
    this.nativeElement.dispatchEvent(new Event('input'));
  }

  /** Perform native click on current element. */
  click(): void {
    this.nativeElement.click();
  }

  /** Triggers Angular event on current element */
  trigger(eventName: string, eventObj: any = null): void {
    this.debugElement.triggerEventHandler(eventName, eventObj);
  }

  /** Returns given attribute's value of native element */
  attr(name): string {
    return this.nativeElement[name];
  }

  /** Returns element classes in object */
  get classes() {
    return this.debugElement.classes;
  }

  /** Returns native element */
  get nativeElement() {
    return this.debugElement.nativeElement;
  }
}

export class TestPage extends TestElement {
  componentInstance;

  static create(component) {
    const fixture = TestBed.createComponent(component);
    return new TestPage(fixture);
  }

  constructor(private fixture: ComponentFixture<any>) {
    super(fixture.debugElement);
    this.componentInstance = fixture.componentInstance;
  }

  detectChanges(): void {
    this.fixture.detectChanges();
  }
}
