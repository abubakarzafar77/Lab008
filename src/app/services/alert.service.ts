import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
//----------------Service------------------------------
//-------------Routing---------------------------------
import { Router, NavigationStart } from '@angular/router';
//-------------Model-----------------------------------
//-------------Module----------------------------------
//------------Component--------------------------------


@Injectable()
export class AlertService {
    
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }
    
    public success(message: string, keepAfterNavigationChange = false): any {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }
    
    public error(message: string, keepAfterNavigationChange = false): any {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    }
    
    public getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

}