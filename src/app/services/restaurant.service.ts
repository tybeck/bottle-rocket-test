import { Injectable } from "@angular/core";

import { environment } from "../../environments/environment";

import { HttpClient } from "@angular/common/http";

import { Restaurant, RestaurantResponse } from "../models/models.interface";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class RestaurantService {
	private _restaurantSelected: BehaviorSubject<Restaurant|null> = new BehaviorSubject<Restaurant|null>(null);

	constructor (private http: HttpClient) {}

	/**
	 * @method getRestaurantedSelected
	 */
	getRestaurantedSelected (): BehaviorSubject<Restaurant|null> {
		return this._restaurantSelected;
	}

	/**
	 * @method setRestaurant
	 * @param restaurant
	 */
	setRestaurant (restaurant: Restaurant|null) {
		this._restaurantSelected.next(restaurant);
	}

	/**
	 * @method getRestaurants
	 */
	getRestaurants (): Promise<Restaurant[]> {
		return this
			.http
			.get(environment.restaurantApiEndpoint)
			.toPromise()
			.then(data => ((data as RestaurantResponse).restaurants) || []);
	}
}