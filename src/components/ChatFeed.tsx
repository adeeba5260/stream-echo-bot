import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Reply, Clock, Filter } from "lucide-react";

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  platform: "twitch" | "youtube" | "discord";
  isQuestion: boolean;
  priority: "high" | "medium" | "low";
  answered: boolean;
}

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    username: "GamerPro123",
    message: "What's your favorite streaming setup?",
    timestamp: new Date(Date.now() - 30000),
    platform: "twitch",
    isQuestion: true,
    priority: "high",
    answered: false
  },
  {
    id: "2",
    username: "StreamFan",
    message: "How long have you been streaming?",
    timestamp: new Date(Date.now() - 45000),
    platform: "youtube",
    isQuestion: true,
    priority: "medium",
    answered: false
  },
  {
    id: "3",
    username: "ChatMaster",
    message: "Great stream today! 🔥",
    timestamp: new Date(Date.now() - 10000),
    platform: "twitch",
    isQuestion: false,
    priority: "low",
    answered: false
  },
  {
    id: "4",
    username: "TechNerd",
    message: "What microphone are you using?",
    timestamp: new Date(Date.now() - 60000),
    platform: "discord",
    isQuestion: true,
    priority: "high",
    answered: true
  }
];

export const ChatFeed = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [filter, setFilter] = useState<"all" | "questions" | "unanswered">("questions");

  const filteredMessages = messages.filter(msg => {
    switch (filter) {
      case "questions":
        return msg.isQuestion;
      case "unanswered":
        return msg.isQuestion && !msg.answered;
      default:
        return true;
    }
  });

  const getPlatformColor = (platform: ChatMessage["platform"]) => {
    switch (platform) {
      case "twitch":
        return "bg-purple-500";
      case "youtube":
        return "bg-red-500";
      case "discord":
        return "bg-blue-500";
    }
  };

  const getPriorityColor = (priority: ChatMessage["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-500/5";
      case "medium":
        return "border-l-yellow-500 bg-yellow-500/5";
      case "low":
        return "border-l-green-500 bg-green-500/5";
    }
  };

  const handleAnswer = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, answered: true } : msg
      )
    );
  };

  // Simulate new messages
  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        username: `User${Math.floor(Math.random() * 1000)}`,
        message: [
          "What's your streaming schedule?",
          "Love the content!",
          "Can you play this song?",
          "How do you stay motivated?",
          "Amazing gameplay!"
        ][Math.floor(Math.random() * 5)],
        timestamp: new Date(),
        platform: ["twitch", "youtube", "discord"][Math.floor(Math.random() * 3)] as any,
        isQuestion: Math.random() > 0.4,
        priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as any,
        answered: false
      };
      
      setMessages(prev => [newMessage, ...prev.slice(0, 19)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <div className="flex gap-1">
          {[
            { key: "all", label: "All Messages" },
            { key: "questions", label: "Questions Only" },
            { key: "unanswered", label: "Unanswered" }
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(key as typeof filter)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="h-[500px]">
        <div className="space-y-3">
          {filteredMessages.map((message) => (
            <Card
              key={message.id}
              className={`p-4 border-l-4 smooth-transition hover:bg-muted/20 ${
                getPriorityColor(message.priority)
              } ${message.answered ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">
                    {message.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{message.username}</span>
                    <div className={`w-2 h-2 rounded-full ${getPlatformColor(message.platform)}`} />
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.isQuestion && (
                      <Badge variant="secondary" className="text-xs">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Question
                      </Badge>
                    )}
                    {message.answered && (
                      <Badge variant="outline" className="text-xs text-green-500">
                        Answered
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm">{message.message}</p>
                  
                  {message.isQuestion && !message.answered && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAnswer(message.id)}
                        className="text-xs gap-1"
                      >
                        <Reply className="w-3 h-3" />
                        Mark as Answered
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};