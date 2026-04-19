import songText from '@/assets/services/song-text.jpg';
import musicArrangement from '@/assets/services/music-arrangement.jpg';
import jingle from '@/assets/services/jingle.jpg';
import aiSongFull from '@/assets/services/ai-song-full.jpg';
import artistConcept from '@/assets/services/artist-concept.jpg';

/** Обложки для услуг на странице Services и в карточке товара (импорт из assets). */
export const SERVICE_COVER_BY_ID: Record<string, string> = {
  'song-text': songText,
  'music-arrangement': musicArrangement,
  jingle,
  'ai-song-full': aiSongFull,
  'artist-concept': artistConcept,
};

/** Резерв, если для id нет файла или не сработала загрузка */
export const SERVICE_COVER_FALLBACK = songText;

export function resolveProductCoverSrc(productId: string, legacyCover?: string): string {
  return SERVICE_COVER_BY_ID[productId] ?? legacyCover ?? SERVICE_COVER_FALLBACK;
}
