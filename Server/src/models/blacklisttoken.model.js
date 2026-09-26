import mongoose from "mongoose";


const BlacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required to be added in the blacklist"]
    }
}, {timestamps: true})

const TokenBlackList = mongoose.model("blacklistTokens", BlacklistTokenSchema);

export default TokenBlackList;