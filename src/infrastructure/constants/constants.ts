const mode = import.meta.env.VITE_MODE
export const MILLISECONDS_IN_HOUR = 3600000
export const DELAY_IN_HOURS_REFRESH_ALL_PODCASTS = 24
export const DELAY_IN_HOURS_REFRESH_PODCAST_DETAILS = 24
export const URL_GET_PODCASTS =
  mode === 'PRODUCTION'
    ? 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
    : 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json?mode=DEVELOPMENT'
export const URL_GET_PODCAST_DETAILS =
  mode === 'PRODUCTION'
    ? '`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast &entity=podcastEpisode`'
    : '`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast &entity=podcastEpisode`'
