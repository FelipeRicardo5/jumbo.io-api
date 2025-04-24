import { Schema, model } from 'mongoose';
const MoodLogSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Ref para o modelo 'User'
        required: true,
    },
    mood: {
        type: String,
        required: true,
    },
}, {
    timestamps: { createdAt: true, updatedAt: false }, // A opção 'updatedAt' está desativada
});
// Criando o modelo MoodLog a partir do schema
const MoodLog = model('MoodLog', MoodLogSchema);
export default MoodLog;
