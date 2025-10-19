import { Request, Response } from "express";



export const addMeme = async (request: Request, response: Response) => {

 const { title, url } = request.body;



 const { error } = memeSchema.validate(request.body);

 if (error) {

 throw new Error(error?.details[0]?.message);

 }



 const newMeme = await prisma.meme.create({

 // @ts-ignore

 data: { title, url, userId: parseInt(request.user.userId) } as Meme, // use authenticated userID

 });



 response.status(201).json(newMeme);

};