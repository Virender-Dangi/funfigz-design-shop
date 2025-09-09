import { useState } from "react";
import { Palette, Shapes, Save, Download, Upload, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const Designer = () => {
  const [selectedTool, setSelectedTool] = useState<"select" | "blocks" | "color">("blocks");
  const [selectedColor, setSelectedColor] = useState("#8B5CF6"); // Purple
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const colors = [
    { name: "Purple", value: "#8B5CF6" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#10B981" },
    { name: "Orange", value: "#F59E0B" },
    { name: "Red", value: "#EF4444" },
    { name: "Pink", value: "#EC4899" },
    { name: "Yellow", value: "#EAB308" },
    { name: "Cyan", value: "#06B6D4" }
  ];

  const blockShapes = [
    { name: "1x1 Block", size: "1x1", icon: "⬛" },
    { name: "2x1 Block", size: "2x1", icon: "▬" },
    { name: "2x2 Block", size: "2x2", icon: "⬜" },
    { name: "4x2 Block", size: "4x2", icon: "▭" },
    { name: "Corner Block", size: "L", icon: "⌊" },
    { name: "T Block", size: "T", icon: "⫤" }
  ];

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Design Saved!",
        description: "Your block design has been saved to your projects.",
      });
    }, 1000);
  };

  const handleExport = () => {
    toast({
      title: "Design Exported!",
      description: "Your design has been exported as an image.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Block Designer Studio</h1>
              <p className="text-muted-foreground">Create amazing block designs with our intuitive tools</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="w-4 h-4" />
                {isLoading ? "Saving..." : "Save Design"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Tools Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Tools</h3>
              
              {/* Tool Selection */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <Button
                  variant={selectedTool === "select" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool("select")}
                  className="aspect-square"
                >
                  ↖️
                </Button>
                <Button
                  variant={selectedTool === "blocks" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool("blocks")}
                  className="aspect-square"
                >
                  <Shapes className="w-4 h-4" />
                </Button>
                <Button
                  variant={selectedTool === "color" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool("color")}
                  className="aspect-square"
                >
                  <Palette className="w-4 h-4" />
                </Button>
              </div>

              {/* Block Shapes */}
              {selectedTool === "blocks" && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Block Shapes</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {blockShapes.map((block) => (
                      <Button
                        key={block.name}
                        variant="outline"
                        className="h-auto p-3 flex flex-col items-center hover-bounce"
                      >
                        <span className="text-2xl mb-1">{block.icon}</span>
                        <span className="text-xs">{block.size}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Palette */}
              {selectedTool === "color" && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Colors</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.value)}
                        className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                          selectedColor === color.value ? "border-foreground" : "border-border"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <div className="mt-3">
                    <Badge variant="secondary" className="text-xs">
                      Selected: {colors.find(c => c.value === selectedColor)?.name}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <Button variant="outline" className="w-full" size="sm">
                  <RotateCcw className="w-4 h-4" />
                  Clear Canvas
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Upload className="w-4 h-4" />
                  Load Template
                </Button>
              </div>
            </Card>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              <div className="aspect-square max-w-2xl mx-auto bg-muted/30 rounded-2xl border-2 border-dashed border-border flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shapes className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Start Creating</h3>
                  <p className="text-muted-foreground mb-4">
                    Select blocks from the toolbar and drag them to the canvas
                  </p>
                  <div className="flex justify-center gap-2">
                    <Badge variant="secondary">Drag & Drop</Badge>
                    <Badge variant="secondary">Color Customize</Badge>
                    <Badge variant="secondary">Save & Share</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Properties Panel */}
            <Card className="mt-6 p-6">
              <h3 className="text-lg font-semibold mb-4">Properties</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Width</label>
                  <p className="text-lg font-semibold">20 units</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Height</label>
                  <p className="text-lg font-semibold">15 units</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Blocks Used</label>
                  <p className="text-lg font-semibold">0</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Estimated Cost</label>
                  <p className="text-lg font-semibold text-green">₹0</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};