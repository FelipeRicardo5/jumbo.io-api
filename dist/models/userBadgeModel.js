import { Schema, model } from 'mongoose';
const UserBadgeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Ref para o modelo 'User'
        required: true,
    },
    badgeId: {
        type: Schema.Types.ObjectId,
        ref: 'Badge', // Ref para o modelo 'Badge'
        required: true,
    },
    awardedAt: {
        type: Date,
        default: Date.now, // Definindo valor default para awardedAt
    },
});
// Criando o modelo UserBadge a partir do schema
const UserBadge = model('UserBadge', UserBadgeSchema);
export default UserBadge;
