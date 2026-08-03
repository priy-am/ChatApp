import ChatForm from "@/components/ChatForm";
import { currentUser } from '@clerk/nextjs/server';
import { RedirectToSignIn } from "@clerk/nextjs";

export default async function Page({ params }) {
  const user = await currentUser();
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="glass-panel p-12 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-slate-400 mb-6">Please sign in to join the #{slug} developer discussion forum.</p>
        </div>
      </div>
    );
  }

  const userName = user.firstName || user.username || user.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "User";

  return (
    <ChatForm
      slug={slug}
      clerkUser={{
        id: user.id,
        name: userName,
        token: user.publicMetadata?.token || "",
      }}
    />
  );
}

