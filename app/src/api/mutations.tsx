import { AudioFeatureRanges } from "./types";
import { BACKEND_BASE_URL } from "../env";
import { getIdToken } from "../firebase";
import { z } from "zod";

export async function exportPlaylist(variables: {
  sourcePlaylistId: string;
  playlistName: string;
  audioFeatureRanges: AudioFeatureRanges;
}): Promise<string> {
  const idToken = await getIdToken();
  const response = await fetch(
    `${BACKEND_BASE_URL}/api/playlists/${variables.sourcePlaylistId}/export`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playlistName: variables.playlistName,
        audioFeatureRanges: variables.audioFeatureRanges,
      }),
    }
  );

  const parsed = z
    .object({
      playlistId: z.string(),
    })
    .parse(await response.json());

  return parsed.playlistId;
}