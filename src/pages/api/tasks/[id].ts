import { NextApiRequest, NextApiResponse } from 'next'

export default function index(req: NextApiRequest, res: NextApiResponse){
   
    const { method } = req;

    switch (method) {
        case "GET":
            return res.status(200).json('getting unique task');
        case "PUT":
            return res.status(201).json('updating a unique task');
        case "DELETE":
            return res.status(201).json('deleting a unique task');
        default:
            return res.status(400).json("method not allowed");
    }
}