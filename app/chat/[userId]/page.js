import ChatWith from '@/components/ChatWith';
import { currentUser } from '@clerk/nextjs/server';

export default async function Page({ params }) {
  const user = await currentUser();
  const resolvedParams = await params;
  const talkwith = resolvedParams.userId;

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="glass-panel p-12 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-slate-400 mb-6">Please sign in to access direct chat messaging.</p>
        </div>
      </div>
    );
  }

  const userName = user.firstName || user.username || user.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "User";

  return (
    <ChatWith
      talkwith={talkwith}
      clerkUser={{
        id: user.id,
        name: userName,
        token: user.publicMetadata?.token || "",
      }}
    />
  );
}

