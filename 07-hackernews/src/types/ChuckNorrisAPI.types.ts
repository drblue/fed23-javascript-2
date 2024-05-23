/**
 * Chuck Norris API
 *
 * <https://api.chucknorris.io/>
 */

/**
 * <https://api.chucknorris.io/jokes/random>
 *
 * @example {
 *   "icon_url" : "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
 *   "id" : "s91vJ76HRYK7ivH2eSpgzw",
 *   "url" : "",
 *   "value" : "Sheena became a Punk Rocker ever since Chuck Norris broke her heart."
 * }
 */

export interface RandomJokeResponse {
	id: string;
	url: string;
	value: string;
}
