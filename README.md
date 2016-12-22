# angular-testing-tools

A set of tools for better handling tests in Angular

## Install

        npm install angular-testing-tools --save-dev
        
## Mocking methods

Example usage:

    import { SomeComponent } from './some.component';      
    import { AuthService } from './auth.service';      
    import { mockClass, mockDirective, mockComponent } from 'angular-testing-tools'
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SomeComponent,
                mockDirective('app-main-menu'),
                mockComponent('app-table-row', {methods: ['select'], inputs: ['product'], outputs: ''})
            ],
            providers: [
                {provide: AuthService, useClass: mockClass(['login', 'logout'])}
            ]
        });
    });
        
#### mockClass(methods: string[])

Creates mocked class which can be used as a service.

       mockClass(['login', 'logout'])
                  
#### mockDirective(selector: string, options: MockDirectiveOptions)                  
        
Creates mocked directive.        
        
        mockDirective('app-main-menu')

#### mockComponent(selector: string, options: MockDirectiveOptions)

Creates mocked component.  

        mockComponent('app-table-row', {methods: ['select'], inputs: ['product'], outputs: ''})

## TestPage
        
Import TestPage class and create an instance:
                              
        import { SomeComponent } from './some.component';                              
        import { TestPage } from 'angular-testing-tools';
        
        // ..
        
        let testPage;
        beforeEach(() => {
            let testPage = TestPage.create(SomeComponent);
            testPage.detectChanges();
        });
        
### TestPage properties

        testPage.componentInstance        
        
### TestPage methods
        
Since TestPage class extends TestElement class, you can use all the TestElement methods on the TestPage instance, eg.
`testPage.textContent()`.

#### TestPage.create(component)

Creates a component's fixture and returns TestPage instance.

        TestPage.create(SomeComponent);
         
#### detectChanges

Calls `detectChanges` on created fixture

        testPage.detectChanges();
                
### TestElement properties

        testPage.nativeElement
        testPage.classes   
        
### TestElement methods
        
#### get(cssSelector: string)
        
Returns descendant of current element by css selector as TestElement instance
        
        testPage.get('#some-section')
        
#### textContent()

Returns text of current element.
        
    testPage.get('#some-section').textContent();
    
#### input(value: string)    
                
Inputs value to the current element.
        
    testPage.get('input').input('some value');
    
#### click()
    
Performs native click on current element.
    
    testPage.get('button').click();
    
#### trigger(eventName: string, eventObject: any)

Triggers Angular event on current element.

    testPage.get('button').trigger('dbclick');
    
#### attr(name: string)
    
Returns given attribute's value of native element.
    
    testPage.get('input').attr('value');
