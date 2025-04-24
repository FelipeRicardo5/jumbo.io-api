import { Schema, model, Document } from 'mongoose';

export interface IBadge extends Document {
  name: string;
  description: string;
  iconUrl?: string;
}

const BadgeSchema = new Schema<IBadge>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  iconUrl: { type: String },
});

const Badge = model<IBadge>('Badge', BadgeSchema);

export default Badge;
