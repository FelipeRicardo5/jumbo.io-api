import { Schema, model, Document, Types } from 'mongoose';

export interface IUserBadge extends Document {
  userId: Types.ObjectId;  // Alterado para Types.ObjectId
  badgeId: Types.ObjectId; // Alterado para Types.ObjectId
  awardedAt: Date;
}

const UserBadgeSchema = new Schema<IUserBadge>({
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
const UserBadge = model<IUserBadge>('UserBadge', UserBadgeSchema);

export default UserBadge;
