const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_UPLOAD = 'https://www.googleapis.com/upload/youtube/v3/videos';

type YouTubeError = { error?: { message?: string; errors?: { message?: string }[] } };

function errorMessage(json: YouTubeError, status: number, fallback: string): string {
  return json.error?.message || json.error?.errors?.[0]?.message || `${fallback} (${status})`;
}

function enc(value: string) {
  return encodeURIComponent(value);
}

export type YouTubeIdentity = { id: string; title: string };

/** Looks up the authenticated user's default YouTube channel. */
export async function fetchYouTubeIdentity(accessToken: string): Promise<YouTubeIdentity | null> {
  const response = await fetch(`${YOUTUBE_API}/channels?part=snippet&mine=true`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  if (!response.ok) return null;

  const json = (await response.json().catch(() => null)) as {
    items?: { id?: string; snippet?: { title?: string } }[];
  } | null;
  const channel = json?.items?.[0];
  if (!channel?.id) return null;

  return { id: channel.id, title: channel.snippet?.title || 'YouTube channel' };
}

export type YouTubePostResult = { id: string; url: string };

function titleFromText(text: string) {
  const firstLine = text.split('\n').map((line) => line.trim()).find(Boolean) || 'Showcase video';
  return firstLine.length > 100 ? `${firstLine.slice(0, 97)}...` : firstLine;
}

/**
 * Publishes a public video to YouTube using the resumable upload API.
 * `videoUrl` must be a fetchable video file URL (for Showcase this is the
 * public Supabase Storage URL attached to the post).
 */
export async function postToYouTube(accessToken: string, text: string, videoUrl: string): Promise<YouTubePostResult> {
  const mediaResponse = await fetch(videoUrl, { cache: 'no-store' });
  if (!mediaResponse.ok) {
    throw new Error(`Could not fetch attached video (${mediaResponse.status})`);
  }

  const contentType = mediaResponse.headers.get('content-type') || 'video/mp4';
  const contentLength = mediaResponse.headers.get('content-length');
  const videoBytes = await mediaResponse.arrayBuffer();

  const metadata = {
    snippet: {
      title: titleFromText(text),
      description: text,
    },
    status: {
      privacyStatus: 'public',
      selfDeclaredMadeForKids: false,
    },
  };

  const initResponse = await fetch(`${YOUTUBE_UPLOAD}?uploadType=resumable&part=${enc('snippet,status')}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Upload-Content-Type': contentType,
      ...(contentLength ? { 'X-Upload-Content-Length': contentLength } : {}),
    },
    body: JSON.stringify(metadata),
    cache: 'no-store',
  });

  const initJson = (await initResponse.json().catch(() => ({}))) as YouTubeError;
  const uploadUrl = initResponse.headers.get('location');

  if (initResponse.status === 401) {
    const err = new Error('YouTube access token is invalid or expired.');
    (err as Error & { code?: string }).code = 'unauthorized';
    throw err;
  }

  if (!initResponse.ok || !uploadUrl) {
    throw new Error(errorMessage(initJson, initResponse.status, 'YouTube upload initialization failed'));
  }

  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      'Content-Length': String(videoBytes.byteLength),
    },
    body: videoBytes,
    cache: 'no-store',
  });

  const uploadJson = (await uploadResponse.json().catch(() => ({}))) as YouTubeError & { id?: string };

  if (!uploadResponse.ok || !uploadJson.id) {
    throw new Error(errorMessage(uploadJson, uploadResponse.status, 'YouTube upload failed'));
  }

  return { id: uploadJson.id, url: `https://www.youtube.com/watch?v=${uploadJson.id}` };
}
