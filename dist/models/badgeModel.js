import { Schema, model } from 'mongoose';
const BadgeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    iconUrl: { type: String },
});
const Badge = model('Badge', BadgeSchema);
export default Badge;
