import mongoose from "mongoose";

const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
    reminderDate: { type: String }, // Stores date as DD/MM/YYYY format

    reminderTime: { type: String }, // Stores time as HH:mm format
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);


const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;