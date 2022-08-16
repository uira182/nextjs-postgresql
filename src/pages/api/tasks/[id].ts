import { NextApiRequest, NextApiResponse } from 'next'
import { conn } from '../../../utils/database'

export default async function index(req: NextApiRequest, res: NextApiResponse){
   
    const { method, query, body } = req;

    switch (method) {
        case "GET":
            try {
                const result = await conn.query("SELECT * FROM tasks WHERE id = $1 RETURNING *", [query.id])
                console.log(result['rows'])
                if (result['rows'].length > 0){
                    return res.status(200).json(result['rows']);
                }else{
                    return res.status(500).json({message: 'task not found'})
                }
            } catch (error: any) {
                res.status(500).json({message: error.message})
            }
        case "PUT":
            try {
                const {title, description} = body;
                const values = [title, description, query.id]
                const result = await conn.query("UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *", values)
                console.log(result['rows'])
                if (result['rows'].length > 0){
                    return res.status(200).json(result['rows']);
                }else{
                    return res.status(500).json({message: 'task not found'})
                }
            } catch (error: any) {
                res.status(500).json({message: error.message})
            }
        case "DELETE":
            try {
                const result = await conn.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [query.id])

                console.log(result)

                if (result.rowCount > 0){
                    return res.status(200).json({message: 'DELETE SUCCESS'})
                }else{
                    return res.status(500).json({message: 'ERROR, NOT DELETE'})
                }

            } catch (error: any) {
                res.status(500).json({message: error.message})
            }
        default:
            return res.status(400).json({message: "method not allowed"});
    }
}