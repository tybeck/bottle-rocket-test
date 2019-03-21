"use strict";

import {library, dom} from "@fortawesome/fontawesome-svg-core";

import {fas} from "@fortawesome/free-solid-svg-icons";

export function watch () {
	library.add(fas.faAngleLeft);
	dom.watch();
}