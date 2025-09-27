import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Brain, Search, Edit, Trash2, Plus } from "lucide-react";

interface StoredResponse {
  id: string;
  question: string;
  answer: string;
  category: string;
  confidence: number;
  usageCount: number;
  lastUsed: Date;
  createdAt: Date;
}

const mockResponses: StoredResponse[] = [
  {
    id: "1",
    question: "What's your streaming setup?",
    answer: "I use an Elgato Stream Deck, Blue Yeti microphone, and OBS Studio for streaming. My camera is a Logitech C920.",
    category: "equipment",
    confidence: 95,
    usageCount: 12,
    lastUsed: new Date(Date.now() - 3600000),
    createdAt: new Date(Date.now() - 86400000 * 7)
  },
  {
    id: "2",
    question: "How long have you been streaming?",
    answer: "I've been streaming for about 3 years now, started as a hobby and it grew from there!",
    category: "personal",
    confidence: 98,
    usageCount: 8,
    lastUsed: new Date(Date.now() - 7200000),
    createdAt: new Date(Date.now() - 86400000 * 30)
  },
  {
    id: "3",
    question: "What games do you play?",
    answer: "I mainly focus on indie games and occasional AAA titles. I love discovering hidden gems and sharing them with the community.",
    category: "games",
    confidence: 90,
    usageCount: 15,
    lastUsed: new Date(Date.now() - 1800000),
    createdAt: new Date(Date.now() - 86400000 * 14)
  }
];

export const MemoryBank = () => {
  const [responses, setResponses] = useState<StoredResponse[]>(mockResponses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(responses.map(r => r.category)))];

  const filteredResponses = responses.filter(response => {
    const matchesSearch = response.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         response.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || response.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-500";
    if (confidence >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Memory Bank</h3>
          <Badge variant="secondary">{responses.length} responses stored</Badge>
        </div>
        
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Response
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search responses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-1">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Responses */}
      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {filteredResponses.map((response) => (
            <Card key={response.id} className="p-4 hover:bg-muted/20 smooth-transition">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{response.question}</h4>
                      <Badge variant="outline" className="text-xs">
                        {response.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{response.answer}</p>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className={`font-medium ${getConfidenceColor(response.confidence)}`}>
                      {response.confidence}% confidence
                    </span>
                    <span>Used {response.usageCount} times</span>
                    <span>Last used {formatTimeAgo(response.lastUsed)}</span>
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