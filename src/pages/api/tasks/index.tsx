/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { conn } from "src/utils/database"

export default async(req: NextApiRequest, res: NextApiResponse) => {
   
    const { method, body } = req;

    switch (method) {
        case "GET":
            try {                
                const query = "SELECT * FROM tasks ORDER BY id ASC";
                const response = await conn.query(query);

                return res.status(200).json(response.rows);
            } catch (error: any) {
                return res.status(400).json({error: error.message});                
            }            
        case "POST":
            try {            
                const { title, description } = body;    
                const query = "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *";    
                const values = [title, description];    
                const response = await conn.query(query, values);

                console.log(response);   

                return res.status(201).json('creating tasks');                
            } catch (error: any) {
                return res.status(400).json({error: error.message});                
            }
        default:
            return res.status(400).json("Invalid method");
    }
}