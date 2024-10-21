// pages/index.tsx
import Head from 'next/head';
import Chat from '../components/chat';

const HomeChat: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Chat App</title>
                <meta name="description" content="Chat application using Next.js" />
            </Head>
            <main className="container mx-auto">
                <Chat />
            </main>
        </div>
    );
};

export default HomeChat;
