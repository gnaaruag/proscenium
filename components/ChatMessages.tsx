'use client'

import { Message, messagesRef, sortedMessagesRef } from "@/lib/converters/Message";
import { useLanguageStore } from "@/store/store";
import { MessageCircleIcon } from "lucide-react";
import { Session } from "next-auth";
import { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "./LoadingSpinner";
import UserAvataar from "./UserAvataar";

function ChatMessages({
    chatId,
    initialMessages,
    session,
}:{
    chatId: string;
    initialMessages: Message[];
    session: Session | null;
}) {

    const language = useLanguageStore((state) =>state.language);
    const messagesEndRef = createRef<HTMLDivElement>();

    const[messages,loading,error] = useCollectionData<Message>(
      sortedMessagesRef(chatId),
      {
        initialValue: initialMessages,
      }
    );

    useEffect(()=>{
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    },[messages, messagesEndRef]);
  return (
  <div className="p-5">
     
      {!loading && messages?.length ===0 && (
        <div className="flex flex-col justify-center  text-center items-center p-20 rounded-xl space-y-2 bg-blue-500 text-black ">
          <MessageCircleIcon className="h-10 w-10"/>
          <h2> 
            <span className="font-bold">Invite a friend </span>&{" "}
            <span className="font-bold">
              Send your first message in ANY language
            </span>{" "}
            below to get started!
          </h2>
          <p className="font-bold">Proscenium will auto-detect and tranlate it all for you</p>
          </div>
      )}

      { messages?.map((message) => {
        const isSender = message.user.id === session?.user.id;

        return (
          <div key={message.id} className="flex my-2 items-end">
            <div 
              className={`flex flex-col relative space-y-2 p-4 w-fit line-clamp-1 mx-2 rounded-lg ${
                isSender ? "ml-auto bg-blue-500 text-white rounded-br-none" : "bg-gray-100 dark:text-gray-100 dark:bg-slate-700 rounded-bl-none"}`}
            
              >
                <p className={`text-xs italic font-extralight line-clamp-1 ${
                  isSender ? "text-right" : "text-left"
                }`}
                >
                  {message.user.name.split(" ")[0]}
                </p>
                <div className="flex space-x-2">
                  <p>{message.translated?.[language]|| message.input}</p>
                  {!message.translated && <LoadingSpinner />}
                </div>
                </div>

                <UserAvataar
                  name={message.user.name}
                  image={message.user.image}
                  className={`${!isSender && "-order-1"}`}
                  />
                  </div>
        );
      })}


     <div ref={messagesEndRef}></div>
    </div>
  );
  
}

export default ChatMessages