const askAiForHotelSuggestions = async (hotelsList, userSearchQuery) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `
                                    This is the list of hotels:
                                    """
                                    ${JSON.stringify(hotelsList)}
                                    """

                                    Kindly answer this query with reference to the above hotel list (if it is required to answer the query).
                                    Otherwise answer normally. Don't respond with any extra things.

                                    User Query: ${userSearchQuery}
                                    `,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        const data = await res.json();

        console.log(data);

        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated";
    } catch (err) {
        console.log("Error in getting AI Suggestions", err);
        return null;
    }
};

module.exports = { askAiForHotelSuggestions };
