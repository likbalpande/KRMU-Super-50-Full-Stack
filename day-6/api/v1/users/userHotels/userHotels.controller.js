const { Hotel } = require("../../../../models/hotelSchema");
const { askAiForHotelSuggestions } = require("../../../../services/ai/ai.service");

const searchHotelInPlainTextController = async (req, res) => {
    try {
        const { q } = req.query;

        const hotels = await Hotel.find().lean();

        const result = await askAiForHotelSuggestions(hotels, q);
        console.log("🟡 : result:", result);

        res.status(200).json({
            success: true,
            data: {
                text: result,
            },
        });
    } catch (err) {
        console.log("Error in searchHotelInPlainTextController", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { searchHotelInPlainTextController };
