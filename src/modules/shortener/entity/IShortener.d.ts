export interface IShortener {
  id: string;
  userId: string | null;
  originUrl: string;
  shortUrl: string;
  visits: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
