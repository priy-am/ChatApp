# Chat App (Practice Project)

This is a **real-time chat application** built using **Next.js**, **Clerk for authentication**, and **GetStream for messaging**. The app allows users to search for other users, start a chat, and view their recent conversations.

## 🚀 Features

✅ **User Authentication** – Managed with Clerk.  
✅ **Real-time Messaging** – Powered by GetStream.  
✅ **Search Users** – Find users to start a conversation.  
✅ **Recent Chats** – Automatically displays users you've chatted with.  
✅ **Profile Display** – Shows usernames, profile pictures, and last messages.  

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **Clerk** (User Authentication)
- **Stream Chat** (Real-time messaging)
- **ShadCN UI** (UI components)
- **Tailwind CSS** (Styling)

## 🔧 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file and add:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_API_KEY=your_stream_api_key
   STREAM_SECRET=your_stream_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

1. **Sign in** using Clerk authentication.
2. **Search for users** or view recent conversations.
3. **Start chatting** in real-time using GetStream.
4. **Click a user** from the recent chat list to continue the conversation.


## 💡 Credits

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.dev/)
- [GetStream](https://getstream.io/)
- [Tailwind CSS](https://tailwindcss.com/)

---

🚀 **Built for practice by Priyam**

