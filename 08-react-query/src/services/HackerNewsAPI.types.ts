export interface HN_SearchHit {
	author: string;
	created_at_i: number;
	created_at: string;
	objectID: string;
	points: number;
	story_text?: string;
	title: string;
	updated_at: string;
	url: string;
}

export interface HN_SearchResponse {
	hits: HN_SearchHit[];
	hitsPerPage: number;
	nbHits: number;
	nbPages: number;
	page: number;
}
