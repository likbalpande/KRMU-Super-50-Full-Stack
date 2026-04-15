const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// userSchema.pre("save", function () {
//     // do stuff
// });

const User = model("user", userSchema);

module.exports = { User };
