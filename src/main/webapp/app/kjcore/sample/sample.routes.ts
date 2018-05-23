import { Routes, RouterModule } from '@angular/router';

import { SampleCmp } from './sample.cmp';

//module needs to be added to list of lazy loaded modules in "app.routes.ts" in order for routes to work, like this:

/*
    In the main router, app.router.ts, it is required when adding new route to include AuthGuard for canLoad property.

    Also, navigation html should be updated for you to see the link button. 
    Method for checking if route can be viewed is display for the rest of the menu items

    Additionally you need to add route in DB for the user you are using for development so that you can see it in navigation and access it.
    
*/

/*
{
    path: 'sample',
    loadChildren: 'app/sample/sample.module#SampleModule'
}
*/

const routes: Routes = [
    {
        path: '',
        component: SampleCmp,
    }
];

export const ROUTING = RouterModule.forChild(routes);