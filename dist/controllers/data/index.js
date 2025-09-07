"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const db_1 = require("../../db/db");
const getData = async (req, res) => {
    try {
        const { type } = req.query;
        let data;
        try {
            data = await (0, db_1.getDb)().collection('datas').findOne({ type });
        }
        catch (dbError) {
            console.error('❌ Database error fetching data:', dbError.message);
            res.status(500).json({
                error: 'Database connection error. Please try again later.',
                details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
            });
            return;
        }
        res.json(data);
    }
    catch (error) {
        console.error('❌ Error in getData:', error.message);
        res.status(500).json({
            error: 'Internal server error. Please try again later.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.getData = getData;
