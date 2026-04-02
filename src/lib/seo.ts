import { ENV } from "./env";

 

interface SeoOptions {
    title?: string;
    description?: string;
    ogImage?: string;     // pass the full og image URL
    type?: "website" | "profile" | "article";
}

export function buildSeoMeta(options: SeoOptions) {
    const {
        title = ENV.APP_NAME,
        description = ENV.TAGLINE,
        ogImage = `${ENV.API_URL}/og/default`,
        type = "website",
    } = options;

    return { title, description, ogImage, type };
}

// helpers per entity
export const playerOgImage = (id: string) => `${ENV.API_URL}/og/player/${id}`;
export const matchOgImage = (id: string) => `${ENV.API_URL}/og/match/${id}`;

export const getPlayerShareUrl = (playerId: string) =>
    `${ENV.API_URL}/seo/player/${playerId}`;

export const getMatchShareUrl = (matchId: string) =>
    `${ENV.API_URL}/seo/match/${matchId}`;