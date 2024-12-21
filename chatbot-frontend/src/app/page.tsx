"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Chatbox from "../components/Chatbox";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import { Conversation, Message } from "../types/conversation";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import api from "../utils/api";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [conversationToDelete, setConversationToDelete] = useState<number | null>(
    null
  );
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);

 
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await api.get<Conversation[]>("/conversations");
        setConversations(response.data);
        console.log(response.data);
        if (response.data.length > 0) setSelectedConvId(response.data[0].id);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  // Fetch messages for a conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConvId !== null) {
        try {
          const response = await api.get<Message[]>(
            `/conversations/${selectedConvId}/messages`
          );
          setConversations((prev) =>
            prev.map((conv) =>
              conv.id === selectedConvId ? { ...conv, messages: response.data } : conv
            )
          );
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [selectedConvId]);

  // Add a new conversation
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

  // Confirm deletion
  const confirmDelete = (id: number) => {
    setConversationToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Delete a conversation
  const deleteConversation = async () => {
    if (conversationToDelete !== null) {
      try {
        await api.delete(`/conversations/${conversationToDelete}`);
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

  // Send a message
  const sendMessage = async (text: string) => {
    if (selectedConvId !== null) {
      try {
        const response = await api.post<Message>("/conversations/message", {
          text,
          sender: "user",
          conversationId: selectedConvId,
        });

        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === selectedConvId
              ? { ...conv, messages: [...conv.messages, response.data] }
              : conv
          )
        );

        // Show typing indicator
        setIsBotTyping(true);

        // Simulate bot response
        setTimeout(async () => {
          const botResponse = await api.post<Message>("/conversations/message", {
            text: "This is an AI generated response.",
            sender: "bot",
            conversationId: selectedConvId,
          });

          setConversations((prev) =>
            prev.map((conv) =>
              conv.id === selectedConvId
                ? { ...conv, messages: [...conv.messages, botResponse.data] }
                : conv
            )
          );

          setIsBotTyping(false); // Hide typing indicator
        }, 2000);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Get the currently selected conversation
  const currentConversation =
    conversations.find((conv) => conv.id === selectedConvId) || null;

  return (
    <div className="flex h-screen bg-[#FEF7FF]">
      {/* Sidebar */}
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
      />

      {/* Chatbox */}
      <div className="flex-1">
        <Chatbox
          messages={currentConversation?.messages || []}
          onSend={sendMessage}
          isBotTyping={isBotTyping}
          onMenuClick={() => setDrawerOpen(true)} // Open drawer for small screens
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={deleteConversation}
        conversationName={
          conversations.find((conv) => conv.id === conversationToDelete)?.name || ""
        }
      />
    </div>
  );
}
