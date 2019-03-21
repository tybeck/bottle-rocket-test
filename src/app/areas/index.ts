import { Routes } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { ListItemComponent } from "./list-item/list-item.component";
import { DetailComponent } from "./detail/detail.component";
import { HeaderComponent } from "./header/header.component";

import { ListRestaurantsResolve } from "../services/resolves/list-restaurants.resolve";

export const ComponentRoutes: Routes = [
	{
		path: "",
		component: ListComponent,
		pathMatch: "full",
		resolve: {
			restaurants: ListRestaurantsResolve
		}
	}
];

export const Components = [ListComponent, ListItemComponent, DetailComponent, HeaderComponent];
