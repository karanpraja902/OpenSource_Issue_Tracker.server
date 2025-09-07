import { Request, Response } from "express";
import { getDb } from "../../db/db";

export const getData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { type } = req.query;
        let data: any;
        
        try {
            data = await getDb().collection('datas').findOne({ type });
        } catch (dbError: any) {
            console.error('❌ Database error fetching data:', dbError.message);
            res.status(500).json({ 
                error: 'Database connection error. Please try again later.',
                details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
            });
            return;
        }
        
        res.json(data);
    } catch (error: any) {
        console.error('❌ Error in getData:', error.message);
        res.status(500).json({ 
            error: 'Internal server error. Please try again later.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};