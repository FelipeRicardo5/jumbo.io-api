import { Schema, model, Document, Types } from 'mongoose';

export interface IScore extends Document {
  userId: Types.ObjectId;  // Alterado para Types.ObjectId
  challenge: string;
  points: number;
  createdAt: Date;
}

const ScoreSchema = new Schema<IScore>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',  // Ref para o modelo 'User'
      required: true,
    },
    challenge: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
      default: 1,  // Valor padrão de 1 ponto
    },
  },
  {
    timestamps: true,  // O Mongoose irá adicionar 'createdAt' e 'updatedAt' automaticamente
  }
);

const Score = model<IScore>('Score', ScoreSchema);

export default Score;
