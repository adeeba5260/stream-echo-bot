import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChatFeed } from "./ChatFeed";
import { MemoryBank } from "./MemoryBank";
import { VoiceControls } from "./VoiceControls";
import { PriorityQueue } from "./PriorityQueue";
import { StatsOverview } from "./StatsOverview";
import { Mic, MicOff, Settings, Brain, MessageSquare, Clock } from "lucide-react";
import heroImage from "@/assets/streaming-ai-hero.jpg";
import logoImage from "@/assets/streamai-logo.png";

export const Dashboard = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "memory" | "queue">("chat");

  return (
    <div 
      className="min-h-screen bg-background p-4 space-y-6 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 34, 40, 0.95), rgba(34, 34, 40, 0.95)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logoImage} alt="StreamAI Logo" className="w-12 h-12" />
          <div className="space-y-1">
            <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              StreamAI Assistant
            </h1>
            <p className="text-muted-foreground">
              Your intelligent co-host for livestreaming
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Stream Active
          </Badge>
          
          <Button
            variant={isVoiceActive ? "default" : "outline"}
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={isVoiceActive ? "neon-glow" : ""}
          >
            {isVoiceActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            Voice {isVoiceActive ? "On" : "Off"}
          </Button>
          
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="glass-panel p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Live Chat Feed</h2>
              </div>
              
              <div className="flex gap-2">
                {[
                  { id: "chat", label: "Active Chat", icon: MessageSquare },
                  { id: "memory", label: "Memory Bank", icon: Brain },
                  { id: "queue", label: "Priority Queue", icon: Clock }
                ].map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    variant={activeTab === id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab(id as typeof activeTab)}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>
            
            {activeTab === "chat" && <ChatFeed />}
            {activeTab === "memory" && <MemoryBank />}
            {activeTab === "queue" && <PriorityQueue />}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <VoiceControls isActive={isVoiceActive} />
        </div>
      </div>
    </div>
  );
};