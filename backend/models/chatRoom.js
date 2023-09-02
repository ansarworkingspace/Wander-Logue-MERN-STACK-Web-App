import mongoose from 'mongoose';

const { Schema } = mongoose;

const chatRoomSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs participating in the chat
  messages: [{ type: Schema.Types.ObjectId, ref: 'ChatMessage' }],
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom;
