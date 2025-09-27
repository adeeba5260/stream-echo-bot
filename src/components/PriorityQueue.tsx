import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, AlertTriangle, MessageSquare, ArrowUp } from "lucide-react";

interface PriorityMessage {
  id: string;
  username: string;
  message: string;
  waitTime: number; // in minutes
  priority: "urgent" | "high" | "medium";
  platform: "twitch" | "youtube" | "discord";
  similarAnswered: number; // number of similar questions already answered
}

const mockPriorityMessages: PriorityMessage[] = [
  {
    id: "1",
    username: "PatientViewer",
    message: "Been waiting 15 minutes - what's your favorite game genre?",
    waitTime: 15,
    priority: "urgent",
    platform: "twitch",
    similarAnswered: 0
  },
  {
    id: "2",
    username: "EagerFan",
    message: "How do you handle stream lag issues?",
    waitTime: 8,
    priority: "high",
    platform: "youtube",
    similarAnswered: 1
  },
  {
    id: "3",
    username: "CuriousGamer",
    message: "What's your streaming schedule this week?",
    waitTime: 12,
    priority: "high",
    platform: "discord",
    similarAnswered: 0
  },
  {
    id: "4",
    username: "RegularChatter",
    message: "Do you ever play with viewers?",
    waitTime: 5,
    priority: "medium",
    platform: "twitch",
    similarAnswered: 2
  }
];

export const PriorityQueue = () => {
  const getPriorityColor = (priority: PriorityMessage["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/10 border-red-500 text-red-500";
      case "high":
        return "bg-yellow-500/10 border-yellow-500 text-yellow-500";
      case "medium":
        return "bg-blue-500/10 border-blue-500 text-blue-500";
    }
  };

  const getPlatformColor = (platform: PriorityMessage["platform"]) => {
    switch (platform) {
      case "twitch":
        return "bg-purple-500";
      case "youtube":
        return "bg-red-500";
      case "discord":
        return "bg-blue-500";
    }
  };

  const formatWaitTime = (minutes: number) => {
    if (minutes < 1) return "< 1min";
    if (minutes < 60) return `${minutes}min`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Priority Queue</h3>
          <Badge variant="secondary">{mockPriorityMessages.length} pending</Badge>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-2">
            <ArrowUp className="w-4 h-4" />
            Sort by Wait Time
          </Button>
        </div>
      </div>

      {/* Priority Messages */}
      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {mockPriorityMessages
            .sort((a, b) => {
              const priorityOrder = { urgent: 3, high: 2, medium: 1 };
              if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
              }
              return b.waitTime - a.waitTime;
            })
            .map((message) => (
              <Card
                key={message.id}
                className={`p-4 border-l-4 smooth-transition hover:bg-muted/20 ${
                  message.priority === "urgent" ? "border-l-red-500 bg-red-500/5" :
                  message.priority === "high" ? "border-l-yellow-500 bg-yellow-500/5" :
                  "border-l-blue-500 bg-blue-500/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {message.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{message.username}</span>
                      <div className={`w-2 h-2 rounded-full ${getPlatformColor(message.platform)}`} />
                      
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPriorityColor(message.priority)}`}
                      >
                        {message.priority.toUpperCase()}
                      </Badge>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatWaitTime(message.waitTime)}
                      </div>
                    </div>
                    
                    <p className="text-sm">{message.message}</p>
                    
                    {message.similarAnswered > 0 && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare className="w-3 h-3" />
                        {message.similarAnswered} similar question(s) already answered
                      </div>
                    )}
                    
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="default" className="text-xs">
                        Answer Now
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Auto-Reply
                      </Button>
                      {message.priority === "urgent" && (
                        <div className="flex items-center gap-1 text-xs text-red-500">
                          <AlertTriangle className="w-3 h-3" />
                          Urgent - Long wait time
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};