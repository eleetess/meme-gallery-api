export interface Meme {
  id?: number;
  title: string;
  url: string;
  userId?: number;
}

declare global {
    namespace Express{
        interface Request{
            user?:{
                userId: string;
            };
        }
    }
} 