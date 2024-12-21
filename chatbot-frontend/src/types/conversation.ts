export type Message = {
    id: number;
    sender: "user" | "bot";
    text: string;
};

export type Conversation = {
    id: number;
    name: string;
    messages: Message[];
};
