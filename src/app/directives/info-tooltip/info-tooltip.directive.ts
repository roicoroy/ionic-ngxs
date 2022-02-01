import { Directive, ElementRef, HostListener, Input, OnInit, ComponentFactoryResolver, ViewContainerRef, Renderer2, Inject, OnChanges, OnDestroy, HostBinding, TemplateRef, Injector, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { InfoTooltipIconComponent } from './info-tooltip-icon/info-tooltip-icon.component';

@Directive({
    selector: '[infoMessage]'
})
export class InfoTooltipDirective implements OnChanges, OnDestroy {
    @Input()
    infoMessage: string;
    
    @HostBinding('style.position') position = 'relative';
  
    private componentRef;
  
    constructor(
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef,
      private componentFactoryResolver: ComponentFactoryResolver,
      private injector: Injector,
    ) { }
  
    ngOnChanges(changes: SimpleChanges) {
      if (!this.componentRef && this.infoMessage) {
        this.viewContainer.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(InfoTooltipIconComponent);
        this.componentRef = this.viewContainer.createComponent(componentFactory);
  
        this.componentRef.instance.templateRef = this.templateRef;
        this.componentRef.instance.hint = this.infoMessage;
      } else if (this.componentRef && this.infoMessage) {
        this.componentRef.instance.hint = this.infoMessage;
      } else {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }
  
    ngOnDestroy() {
      if (this.componentRef) {
        this.componentRef.destroy();
      }
    }
  }