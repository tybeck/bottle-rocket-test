"use strict";

export function loadScript (uri: string) {
	return new Promise((resolve, reject) => {
		const script: HTMLScriptElement = (document.createElement("script") as HTMLScriptElement);
		script.onload = resolve;
		script.onerror = reject;
		script.src = uri;
		document.body.appendChild(script);
	});
}