import ChatWith from '@/components/ChatWith';
import { currentUser } from '@clerk/nextjs/server'

export default async function Page({ params }) {
    const user = await currentUser()
    const slug = (await params).userId;
    console.log("chat with id is :- ", slug)
  
    return <ChatWith talkwith={slug} clerkUser={{id:user.id, name: user.firstName, token:user.publicMetadata.token}} />;

}
