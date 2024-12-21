"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Chatbox from "../components/Chatbox";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import { Conversation, Message } from "../types/conversation";
import api from "../utils/api";
import Header from "@/components/Header";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [conversationToDelete, setConversationToDelete] = useState<
    number | null
  >(null);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [loadingConversations, setLoadingConversations] =
    useState<boolean>(true);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);

  const messageCache = useRef<{ [key: number]: Message[] }>({});

  useEffect(() => {
    const fetchConversations = async () => {
      setLoadingConversations(true);
      try {
        const response = await api.get<Conversation[]>("/conversations");
        setConversations(response.data);
        if (response.data.length > 0) setSelectedConvId(response.data[0].id);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoadingConversations(false);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConvId !== null) {
        if (messageCache.current[selectedConvId]) {
          const cachedMessages = messageCache.current[selectedConvId];
          setConversations((prev) =>
            prev.map((conv) =>
              conv.id === selectedConvId
                ? { ...conv, messages: cachedMessages }
                : conv
            )
          );
        } else {
          setLoadingMessages(true);
          try {
            const response = await api.get<Message[]>(
              `/conversations/${selectedConvId}/messages`
            );

            messageCache.current[selectedConvId] = response.data;

            setConversations((prev) =>
              prev.map((conv) =>
                conv.id === selectedConvId
                  ? { ...conv, messages: response.data }
                  : conv
              )
            );
          } catch (error) {
            console.error("Error fetching messages:", error);
          } finally {
            setLoadingMessages(false);
          }
        }
      }
    };

    fetchMessages();
  }, [selectedConvId]);

  const addConversation = async () => {
    try {
      const response = await api.post<Conversation>("/conversations", {
        name: `Conversation ${conversations.length + 1}`,
      });
      setConversations([response.data, ...conversations]);

      setSelectedConvId(response.data.id);
    } catch (error) {
      console.error("Error adding conversation:", error);
    }
  };

  const confirmDelete = (id: number) => {
    setConversationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const deleteConversation = async () => {
    if (conversationToDelete !== null) {
      try {
        await api.delete(`/conversations/${conversationToDelete}`);

       
        delete messageCache.current[conversationToDelete];

        setConversations((prev) =>
          prev.filter((conv) => conv.id !== conversationToDelete)
        );
        setSelectedConvId(conversations[0]?.id || null);
      } catch (error) {
        console.error("Error deleting conversation:", error);
      }
      setDeleteDialogOpen(false);
      setConversationToDelete(null);
    }
  };

  const sendMessage = async (text: string) => {
    if (selectedConvId !== null) {
      try {
        const response = await api.post<Message>("/conversations/message", {
          text,
          sender: "user",
          conversationId: selectedConvId,
        });

        
        const updatedMessages = [
          ...(messageCache.current[selectedConvId] || []),
          response.data,
        ];
        messageCache.current[selectedConvId] = updatedMessages;

        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === selectedConvId
              ? { ...conv, messages: updatedMessages }
              : conv
          )
        );

        setIsBotTyping(true);

        setTimeout(async () => {
          const botResponse = await api.post<Message>(
            "/conversations/message",
            {
              text: "This is an AI generated response.",
              sender: "bot",
              conversationId: selectedConvId,
            }
          );

          const updatedBotMessages = [...updatedMessages, botResponse.data];
          messageCache.current[selectedConvId] = updatedBotMessages;

          setConversations((prev) =>
            prev.map((conv) =>
              conv.id === selectedConvId
                ? { ...conv, messages: updatedBotMessages }
                : conv
            )
          );

          setIsBotTyping(false);
        }, 2000);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const currentConversation =
    conversations.find((conv) => conv.id === selectedConvId) || null;

  return (
    <div className="flex flex-col h-screen bg-[#FEF7FF]">
      <Header />

      <div className="flex flex-1 ">
        <Sidebar
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          conversations={conversations}
          onSelect={(id) => {
            setSelectedConvId(id);
            setDrawerOpen(false);
          }}
          onDelete={confirmDelete}
          onAdd={addConversation}
          selectedConversationId={selectedConvId || 1}
          loading={loadingConversations}
        />

        <div className="flex-1">
          <Chatbox
            messages={currentConversation?.messages || []}
            onSend={sendMessage}
            isBotTyping={isBotTyping}
            onMenuClick={() => setDrawerOpen(true)}
            loading={loadingMessages && loadingConversations}
          />
        </div>
      </div>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={deleteConversation}
        conversationName={
          conversations.find((conv) => conv.id === conversationToDelete)
            ?.name || ""
        }
      />
    </div>
  );
}
