"use strict";

import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ComponentRoutes } from "./areas";

@NgModule({
	imports: [RouterModule.forRoot(ComponentRoutes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
