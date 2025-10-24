import type { Request, Response } from "express";

export type MemeRequest = Request;
export type MemeResponse = Response;




interface Meme {
  id: number;
  title: string;
  url: string;
  userId: number;
}
