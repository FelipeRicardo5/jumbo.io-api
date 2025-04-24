import { Schema, model } from 'mongoose';
const ScoreSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Ref para o modelo 'User'
        required: true,
    },
    challenge: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
        default: 1, // Valor padrão de 1 ponto
    },
}, {
    timestamps: true, // O Mongoose irá adicionar 'createdAt' e 'updatedAt' automaticamente
});
const Score = model('Score', ScoreSchema);
export default Score;
