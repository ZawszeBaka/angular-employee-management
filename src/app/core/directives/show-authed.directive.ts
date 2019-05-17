import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

import { UserService } from '../services/user.service';

@Directive({
    selector: '[appShowAuthed]'
})
export class ShowAuthedDirective implements OnInit{
    constructor(
        private templateRef: TemplateRef<any>,
        private userService: UserService,
        private viewContainer: ViewContainerRef
    ){}

    condition : boolean;

    ngOnInit(){
        this.userService.isLoggedIn().subscribe(
            data=>{
                if(this.condition){
                    console.log('[DEBUG] Directive: Turn on ');
                    this.viewContainer.createEmbeddedView(this.templateRef);
                }else{
                    console.log('[DEBUG] Directive: Turn off ');
                    this.viewContainer.clear();    
                }
            },
            err=>{
                this.viewContainer.clear();
            }
        );
    }

    @Input() set appShowAuthed(condition: boolean){
        console.log('[DEBUG] Directive: Set condition ? ', condition);
        this.condition = condition;
    }

}