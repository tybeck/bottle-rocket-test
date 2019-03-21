"use strict";

import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";

import { RestaurantService } from "../restaurant.service";

import { Restaurant } from "../../models/models.interface";

@Injectable()
export class ListRestaurantsResolve implements Resolve<any> {
	constructor (private restaurant: RestaurantService) {}

	async resolve (): Promise<Restaurant[]> {
		return await this.restaurant.getRestaurants();
	}
}