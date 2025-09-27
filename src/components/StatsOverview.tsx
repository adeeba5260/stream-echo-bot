import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare, 
  Brain, 
  Clock, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Zap,
  Target
} from "lucide-react";

export const StatsOverview = () => {
  const stats = [
    {
      title: "Active Chats",
      value: "247",
      change: "+12%",
      icon: MessageSquare,
      color: "text-blue-500"
    },
    {
      title: "Questions Filtered",
      value: "89",
      change: "+23%",
      icon: Target,
      color: "text-purple-500"
    },
    {
      title: "Auto-Responses",
      value: "156",
      change: "+45%",
      icon: Brain,
      color: "text-green-500"
    },
    {
      title: "Avg Response Time",
      value: "2.3s",
      change: "-18%",
      icon: Zap,
      color: "text-yellow-500"
    }
  ];

  const efficiency = {
    questionsAnswered: 78,
    totalQuestions: 89,
    responseAccuracy: 94,
    memoryMatches: 67
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Stats Cards */}
      {stats.map((stat, index) => (
        <Card key={index} className="glass-panel p-4 hover:bg-muted/20 smooth-transition">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className={`p-2 rounded-full bg-muted/20 ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <span className="text-xs text-green-500 font-medium">{stat.change}</span>
            <span className="text-xs text-muted-foreground">vs last hour</span>
          </div>
        </Card>
      ))}

      {/* Efficiency Overview */}
      <Card className="glass-panel p-4 md:col-span-2 lg:col-span-4">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">AI Assistant Efficiency</h3>
          <Badge variant="secondary" className="ml-auto">
            Real-time metrics
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Questions Answered</span>
              <span className="font-medium">
                {efficiency.questionsAnswered}/{efficiency.totalQuestions}
              </span>
            </div>
            <Progress 
              value={(efficiency.questionsAnswered / efficiency.totalQuestions) * 100} 
              className="h-2"
            />
            <p className="text-xs text-muted-foreground">
              {Math.round((efficiency.questionsAnswered / efficiency.totalQuestions) * 100)}% completion rate
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Response Accuracy</span>
              <span className="font-medium">{efficiency.responseAccuracy}%</span>
            </div>
            <Progress value={efficiency.responseAccuracy} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Based on creator feedback
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Memory Matches</span>
              <span className="font-medium">{efficiency.memoryMatches}%</span>
            </div>
            <Progress value={efficiency.memoryMatches} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Similar questions auto-answered
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-muted-foreground">System Status:</span>
            <span className="text-green-500 font-medium">Optimal</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Active Platforms:</span>
            <span className="font-medium">3 connected</span>
          </div>
        </div>
      </Card>
    </div>
  );
};