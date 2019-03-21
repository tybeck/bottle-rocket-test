"use strict";

import { Component, forwardRef, Inject, Input } from "@angular/core";

import { Restaurant } from "../../models/models.interface";

import { ListComponent } from "../list/list.component";

@Component({
	selector: "br-list-item",
	templateUrl: "./list-item.component.html",
	styleUrls: ["./list-item.component.sass"]
})
export class ListItemComponent {
	@Input() restaurant: Restaurant;

	constructor (@Inject(forwardRef(() => ListComponent)) private list: ListComponent) {}

	restaurantClicked () {
		return this.list.openDetail(this.restaurant);
	}
}
