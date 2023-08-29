import mongoose from 'mongoose';

const { Schema } = mongoose;

const chatMessageSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'ChatRoom' }, // Reference to the chat room
  sender: { type: Schema.Types.ObjectId, ref: 'User' }, // User ID of the sender
  content: String, // Content of the message
  createdAt: { type: Date, default: Date.now }, // Timestamp of the message creation
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;
