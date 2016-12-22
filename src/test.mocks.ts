import { Component, Directive, EventEmitter } from '@angular/core';

export interface MockDirectiveOptions {
    inputs: string[];
    outputs: string[];
    methods: string[];
}

export function mockClass(methods = []) {
    class MockedClass {}
    for (let method of methods) { MockedClass.prototype[method] = (() => undefined); }
    return <any>MockedClass;
}

export function mockComponent(selector, options = {}) {
    let mockOptions = options as MockDirectiveOptions;
    @Component({
        selector: selector,
        template: `mocked-${selector}`,
        inputs: mockOptions.inputs || [],
        outputs: mockOptions.outputs || [],
    })
    class MockedComponent {}
    for (let method of mockOptions.methods || []) { MockedComponent.prototype[method] = (() => undefined); }
    for (let output of mockOptions.outputs || []) { MockedComponent.prototype[output] = new EventEmitter(); }
    return <any>MockedComponent;
}

export function mockDirective(selector, options = {}) {
    let mockOptions = options as MockDirectiveOptions;
    @Directive({
        selector: selector,
        inputs: mockOptions.inputs || [],
        outputs: mockOptions.outputs || [],
    })
    class MockedDirective {}
    for (let method of mockOptions.methods || []) { MockedDirective.prototype[method] = (() => undefined); }
    for (let output of mockOptions.outputs || []) { MockedDirective.prototype[output] = new EventEmitter(); }
    return <any>MockedDirective;
}
