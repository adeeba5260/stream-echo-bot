import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mic, Volume2, Settings, Headphones, Zap } from "lucide-react";

interface VoiceControlsProps {
  isActive: boolean;
}

export const VoiceControls = ({ isActive }: VoiceControlsProps) => {
  const [listeningLevel, setListeningLevel] = useState(67);
  const [outputVolume, setOutputVolume] = useState(85);
  const [responseSpeed, setResponseSpeed] = useState(3);

  return (
    <div className="space-y-4">
      {/* Voice Status */}
      <Card className="glass-panel p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-full ${isActive ? 'bg-primary/20 text-primary' : 'bg-muted'}`}>
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold">Voice Integration</h3>
            <p className="text-sm text-muted-foreground">
              {isActive ? "Listening for responses..." : "Voice detection off"}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Listening Level</span>
            <span className="font-medium">{listeningLevel}%</span>
          </div>
          <Progress value={listeningLevel} className="h-2" />
          
          {isActive && (
            <div className="flex items-center gap-2 text-xs text-green-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Actively monitoring speech
            </div>
          )}
        </div>
      </Card>

      {/* Quick Settings */}
      <Card className="glass-panel p-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-4 h-4 text-primary" />
          <h3 className="font-semibold">Quick Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Volume2 className="w-3 h-3" />
                <span>Output Volume</span>
              </div>
              <span className="font-medium">{outputVolume}%</span>
            </div>
            <Progress value={outputVolume} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3" />
                <span>Response Speed</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {responseSpeed}s delay
              </Badge>
            </div>
            <Progress value={responseSpeed * 20} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="glass-panel p-4">
        <div className="flex items-center gap-2 mb-4">
          <Headphones className="w-4 h-4 text-primary" />
          <h3 className="font-semibold">Recent Activity</h3>
        </div>
        
        <div className="space-y-3">
          {[
            { time: "2 min ago", action: "Detected answer about streaming setup" },
            { time: "5 min ago", action: "Auto-replied to microphone question" },
            { time: "8 min ago", action: "Voice pattern learned and stored" }
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="text-muted-foreground">{activity.action}</p>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Voice Training */}
      <Card className="glass-panel p-4">
        <h3 className="font-semibold mb-3">Voice Training</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Help the AI learn your speaking patterns for better response matching.
        </p>
        <Button variant="outline" size="sm" className="w-full gap-2">
          <Mic className="w-4 h-4" />
          Start Training Session
        </Button>
      </Card>
    </div>
  );
};