declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"pages": {
"clients.md": {
	id: "clients.md";
  slug: "clients";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
"index.md": {
	id: "index.md";
  slug: "index";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
};
"works": {
"221a.md": {
	id: "221a.md";
  slug: "221a";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"a-more-beautiful-journey.md": {
	id: "a-more-beautiful-journey.md";
  slug: "a-more-beautiful-journey";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"a-site.md": {
	id: "a-site.md";
  slug: "a-site";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"advisory-committees.md": {
	id: "advisory-committees.md";
  slug: "advisory-committees";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"airsa-services-for-newcomer-artists.md": {
	id: "airsa-services-for-newcomer-artists.md";
  slug: "airsa-services-for-newcomer-artists";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"alter-places.md": {
	id: "alter-places.md";
  slug: "alter-places";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"artist-coaching-consulting.md": {
	id: "artist-coaching-consulting.md";
  slug: "artist-coaching-consulting";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"artist-mini-documentaries-a-more-beautiful-journey.md": {
	id: "artist-mini-documentaries-a-more-beautiful-journey.md";
  slug: "artist-mini-documentaries-a-more-beautiful-journey";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"barking-sphinx.md": {
	id: "barking-sphinx.md";
  slug: "barking-sphinx";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"canadian-golha-orchestra.md": {
	id: "canadian-golha-orchestra.md";
  slug: "canadian-golha-orchestra";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"changeup-hackathon-exhibition.md": {
	id: "changeup-hackathon-exhibition.md";
  slug: "changeup-hackathon-exhibition";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"charity.md": {
	id: "charity.md";
  slug: "charity";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"community-hub-in-downsview-airport-development.md": {
	id: "community-hub-in-downsview-airport-development.md";
  slug: "community-hub-in-downsview-airport-development";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"daily-bread.md": {
	id: "daily-bread.md";
  slug: "daily-bread";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"dancing-with-parkinsons.md": {
	id: "dancing-with-parkinsons.md";
  slug: "dancing-with-parkinsons";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"diy-space-project.md": {
	id: "diy-space-project.md";
  slug: "diy-space-project";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"documentary-story-development.md": {
	id: "documentary-story-development.md";
  slug: "documentary-story-development";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"facilitation.md": {
	id: "facilitation.md";
  slug: "facilitation";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"greenpac.md": {
	id: "greenpac.md";
  slug: "greenpac";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"halocline-trance.md": {
	id: "halocline-trance.md";
  slug: "halocline-trance";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"heritage-toronto.md": {
	id: "heritage-toronto.md";
  slug: "heritage-toronto";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"its-not-u-its-me.md": {
	id: "its-not-u-its-me.md";
  slug: "its-not-u-its-me";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"keychange.md": {
	id: "keychange.md";
  slug: "keychange";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"level-justice.md": {
	id: "level-justice.md";
  slug: "level-justice";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"lil-sis.md": {
	id: "lil-sis.md";
  slug: "lil-sis";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"long-winter-music-and-arts-festival.md": {
	id: "long-winter-music-and-arts-festival.md";
  slug: "long-winter-music-and-arts-festival";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"long-winter-paris.md": {
	id: "long-winter-paris.md";
  slug: "long-winter-paris";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"make-em-laugh-the-funny-business-of-america.md": {
	id: "make-em-laugh-the-funny-business-of-america.md";
  slug: "make-em-laugh-the-funny-business-of-america";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"mini-documentaries-a-more-beautiful-journey.md": {
	id: "mini-documentaries-a-more-beautiful-journey.md";
  slug: "mini-documentaries-a-more-beautiful-journey";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"music-in-the-barns-at-the-great-hall.md": {
	id: "music-in-the-barns-at-the-great-hall.md";
  slug: "music-in-the-barns-at-the-great-hall";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"my-friend-harry.md": {
	id: "my-friend-harry.md";
  slug: "my-friend-harry";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"mythic-productions.md": {
	id: "mythic-productions.md";
  slug: "mythic-productions";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"never-grow-up-ne-grandis-pas.md": {
	id: "never-grow-up-ne-grandis-pas.md";
  slug: "never-grow-up-ne-grandis-pas";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"new-music-concerts.md": {
	id: "new-music-concerts.md";
  slug: "new-music-concerts";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"north-york-cluster-food-security-group.md": {
	id: "north-york-cluster-food-security-group.md";
  slug: "north-york-cluster-food-security-group";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"north-york-harvest-food-bank.md": {
	id: "north-york-harvest-food-bank.md";
  slug: "north-york-harvest-food-bank";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"noyes-fludde-opera.md": {
	id: "noyes-fludde-opera.md";
  slug: "noyes-fludde-opera";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"nuville.md": {
	id: "nuville.md";
  slug: "nuville";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"opera-on-the-avalon.md": {
	id: "opera-on-the-avalon.md";
  slug: "opera-on-the-avalon";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"opus-testing.md": {
	id: "opus-testing.md";
  slug: "opus-testing";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"paradigm-productions.md": {
	id: "paradigm-productions.md";
  slug: "paradigm-productions";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"phoenix-chamber-choir.md": {
	id: "phoenix-chamber-choir.md";
  slug: "phoenix-chamber-choir";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"planet-earth.md": {
	id: "planet-earth.md";
  slug: "planet-earth";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"pride-toronto.md": {
	id: "pride-toronto.md";
  slug: "pride-toronto";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"queer-songbook-orchestra.md": {
	id: "queer-songbook-orchestra.md";
  slug: "queer-songbook-orchestra";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"rciscience.md": {
	id: "rciscience.md";
  slug: "rciscience";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"reissue-interview-audio-piece.md": {
	id: "reissue-interview-audio-piece.md";
  slug: "reissue-interview-audio-piece";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"right-to-food.md": {
	id: "right-to-food.md";
  slug: "right-to-food";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"riot-club.md": {
	id: "riot-club.md";
  slug: "riot-club";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"save-the-cat.md": {
	id: "save-the-cat.md";
  slug: "save-the-cat";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"second-spring.md": {
	id: "second-spring.md";
  slug: "second-spring";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"shared-path-consultation.md": {
	id: "shared-path-consultation.md";
  slug: "shared-path-consultation";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"should-i-be-scared-of-this.md": {
	id: "should-i-be-scared-of-this.md";
  slug: "should-i-be-scared-of-this";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"song-of-extinction.md": {
	id: "song-of-extinction.md";
  slug: "song-of-extinction";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"speaker.md": {
	id: "speaker.md";
  slug: "speaker";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"tapestry-opera.md": {
	id: "tapestry-opera.md";
  slug: "tapestry-opera";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"the-laneway-project.md": {
	id: "the-laneway-project.md";
  slug: "the-laneway-project";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"the-stop-community-food-centre.md": {
	id: "the-stop-community-food-centre.md";
  slug: "the-stop-community-food-centre";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"thin-edge-new-music-collective.md": {
	id: "thin-edge-new-music-collective.md";
  slug: "thin-edge-new-music-collective";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"together-apart.md": {
	id: "together-apart.md";
  slug: "together-apart";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"treasures-of-the-ago-the-hulk.md": {
	id: "treasures-of-the-ago-the-hulk.md";
  slug: "treasures-of-the-ago-the-hulk";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"ukai-projects.md": {
	id: "ukai-projects.md";
  slug: "ukai-projects";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"vibelab-city-of-toronto.md": {
	id: "vibelab-city-of-toronto.md";
  slug: "vibelab-city-of-toronto";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"videography.md": {
	id: "videography.md";
  slug: "videography";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
"viva-singers.md": {
	id: "viva-singers.md";
  slug: "viva-singers";
  body: string;
  collection: "works";
  data: InferEntrySchema<"works">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
