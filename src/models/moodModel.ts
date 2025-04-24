import { Schema, model, Document, Types } from 'mongoose';

// Definindo a interface para o tipo IMoodLog
export interface IMoodLog extends Document {
  userId: Types.ObjectId; // Alterado para Types.ObjectId
  mood: string;
  createdAt: Date;
}

const MoodLogSchema = new Schema<IMoodLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Ref para o modelo 'User'
      required: true,
    },
    mood: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // A opção 'updatedAt' está desativada
  }
);

// Criando o modelo MoodLog a partir do schema
const MoodLog = model<IMoodLog>('MoodLog', MoodLogSchema);

export default MoodLog;
