'use client'

// components/Chat.tsx
import { useState } from 'react';
import Image from 'next/image';
import skynet_image from '../../public/skynet.png';

interface Message {
    text: string;
    sender: 'user' | 'skynet';
}

export const Chat: React.FC = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const newMessage: Message = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, newMessage]);
        setInput('');

        // Simulate AI response (replace this with actual API call)
        const aiResponse = await fetch('http://localhost:4100/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input }),
        });
        const data = await aiResponse.json();
        const aiMessage: Message = { text: data.response, sender: 'skynet' };
        setMessages((prev) => [...prev, aiMessage]);
        console.log(aiMessage.text)
    };

    return (
        <div className="flex flex-col h-screen p-4">
            <div className="flex-1 overflow-y-auto p-2 border rounded-lg">
                {messages.map((msg, index) => (
                        <div key={index} className="flex mb-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            {
                                msg.sender === "user" ? 
                                <div className="relative mr-2 w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                </div> : <Image width={30} height={1} className="mr-2 w-10 h-10 rounded-full" src={skynet_image} alt="skynet" /> 
                            }
                            <div className="flex-1 ">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{msg.sender}</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">{msg.text}</p>
                            </div>
                        </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="flex mt-4">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type your message..." 
                    className="flex-1 p-2 border rounded-l-lg text-black"
                    required 
                />
                <button type="submit" className="bg-gray-800 text-white p-2 rounded-r-lg">Send</button>
            </form>
        </div>
    );
};

export default Chat;
