/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { conn } from '../../../utils/database'

export default async(req: NextApiRequest, res: NextApiResponse) => {
   
    const { method, body } = req;

    switch (method) {
        case "GET":
            return res.status(200).json('getting tasks');
        case "POST":
            
            const { title, description } = body;

            const query = "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *";

            const values = [title, description];

            const response = await conn.query(query, values);

            console.log(response);

            return res.status(201).json('creating tasks');
        default:
            return res.status(400).json("Invalid method");
    }
}