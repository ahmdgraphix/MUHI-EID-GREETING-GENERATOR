"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Sparkles, Download, Share2, Wand2, Loader2, Dices } from "lucide-react";
import templatesData from "@/data/templates.json";
import { TemplateRenderer } from "./template-renderer";

const PREMIUM_MESSAGES = [
  "May your sacrifice bring endless blessings.",
  "Wishing you peace, happiness and prosperity this Eid.",
  "May Allah accept your good deeds and forgive your sins.",
  "Sending you warm wishes on this blessed day of Eid-ul-Adha.",
  "May the divine blessings of Allah bring you hope and faith.",
  "Eid Mubarak! May your life be filled with joy and success.",
  "Wishing you a joyous and blessed Eid surrounded by loved ones.",
  "May this special day bring peace, happiness, and prosperity to everyone.",
  "May Allah shower His countless blessings upon you and your family.",
  "Eid-ul-Adha Mubarak! May your heart be filled with love and your plate with feast."
];

export function Generator() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("english");
  const [theme, setTheme] = useState(templatesData[0]?.id || "");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    const node = document.getElementById("greeting-card-template");
    if (!node) return;
    
    setIsDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(node, { 
        cacheBust: true, 
        pixelRatio: 1.5,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: '1080px',
          height: '1350px'
        }
      });
      const link = document.createElement("a");
      link.download = `muhi-eid-mubarak-${name.replace(/\\s+/g, '-').toLowerCase() || 'card'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error downloading image:", err);
    } finally {
      setIsDownloading(false);
    }
  }, [name, theme]);

  const handleRandomize = () => {
    const allThemes = templatesData.map((t: any) => t.id);
    const availableThemes = allThemes.filter(t => t !== theme);
    const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
    setTheme(randomTheme);
  };

  const handleAutoGenerateMessage = () => {
    const availableMessages = PREMIUM_MESSAGES.filter(m => m !== message);
    const randomMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];
    setMessage(randomMessage);
  };

  return (
    <section id="generator" className="w-full flex justify-center px-0 md:px-8 pb-16 md:pb-24 z-10">
      <div className="w-full max-w-[1400px] apple-card min-h-[500px] lg:min-h-[700px] flex flex-col lg:flex-row overflow-hidden relative rounded-none md:rounded-[48px] shadow-none md:shadow-2xl bg-white md:bg-transparent border-t md:border-t-0 border-black/[0.04]">
        
        {/* Left Sidebar - Controls */}
        <div className="w-full lg:w-[420px] xl:w-[480px] bg-[#FBFBFD] md:bg-[#FBFBFD] border-b lg:border-b-0 lg:border-r border-black/[0.04] p-5 md:p-8 lg:p-10 flex flex-col gap-6 md:gap-8 z-10 shrink-0">
          <div>
            <h2 className="text-[24px] md:text-[28px] font-extrabold text-[#111111] flex items-center gap-2 tracking-tight">
              <Wand2 className="w-6 h-6 text-muhi-blue" />
              Customize
            </h2>
            <p className="text-sm text-[#666666] mt-2 font-medium">Design your perfect Eid greeting</p>
          </div>

          <div className="flex flex-col gap-5 md:gap-6">
            <div className="space-y-3">
              <Label className="text-[#111111] font-semibold text-[13px] uppercase tracking-wider">Design Theme</Label>
              <Select value={theme} onValueChange={(val) => { if (val) setTheme(val); }}>
                <SelectTrigger className="bg-white border-black/[0.06] text-[#111111] focus:ring-4 focus:ring-muhi-blue/10 focus:border-muhi-blue/30 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-[14px] h-14 md:h-12 px-4 transition-all text-[16px] md:text-[14px]">
                  <SelectValue placeholder="Select Design" />
                </SelectTrigger>
                <SelectContent className="bg-white border-black/[0.06] text-[#111111] rounded-[14px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] max-h-[300px]">
                  {templatesData.map((t: any) => (
                    <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="name" className="text-[#111111] font-semibold text-[13px] uppercase tracking-wider">Your Name</Label>
              <Input 
                id="name" 
                placeholder="E.g. Ahmed Ali" 
                className="bg-white border-black/[0.06] text-[#111111] placeholder:text-[#999999] focus-visible:ring-4 focus-visible:ring-muhi-blue/10 focus-visible:border-muhi-blue/30 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-[14px] h-14 md:h-12 px-4 transition-all text-[16px] md:text-[14px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[#111111] font-semibold text-[13px] uppercase tracking-wider">Language</Label>
              <Select value={language} onValueChange={(val) => { if (val) setLanguage(val); }}>
                <SelectTrigger className="bg-white border-black/[0.06] text-[#111111] focus:ring-4 focus:ring-muhi-blue/10 focus:border-muhi-blue/30 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-[14px] h-14 md:h-12 px-4 transition-all text-[16px] md:text-[14px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent className="bg-white border-black/[0.06] text-[#111111] rounded-[14px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="arabic">Arabic (عربي)</SelectItem>
                  <SelectItem value="urdu">Urdu (اردو)</SelectItem>
                  <SelectItem value="hindi">Hindi (हिंदी)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="message" className="text-[#111111] font-semibold text-[13px] uppercase tracking-wider">Custom Message</Label>
                <button 
                  onClick={handleAutoGenerateMessage}
                  className="text-[13px] text-muhi-blue hover:text-muhi-blue/80 flex items-center gap-1 transition-colors font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Auto-Generate
                </button>
              </div>
              <textarea 
                id="message" 
                placeholder="Write your heartfelt Eid wishes..." 
                className="w-full min-h-[140px] md:min-h-[120px] rounded-[14px] border border-black/[0.06] bg-white px-4 py-4 md:py-3 text-[#111111] placeholder:text-[#999999] focus-visible:outline-none focus-visible:border-muhi-blue/30 focus-visible:ring-4 focus-visible:ring-muhi-blue/10 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all resize-none text-[16px] md:text-[14px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-auto pt-6 md:pt-8 flex flex-col gap-3">
            <Button 
              onClick={handleRandomize}
              className="w-full bg-[#FAFAFA] md:bg-[#FAFAFA] bg-black/[0.02] border border-black/[0.06] hover:bg-[#F5F5F7] text-[#111111] font-medium rounded-[14px] h-[56px] md:h-[52px] shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] text-[16px] md:text-[15px]"
            >
              <Dices className="w-5 h-5 mr-2 text-muhi-green" />
              Randomize Design
            </Button>
          </div>
        </div>

        {/* Right Area - Live Preview */}
        <div className="flex-1 p-4 md:p-12 flex flex-col items-center justify-center relative bg-[#F5F5F7]">
          
          <div className="w-full flex flex-col items-center h-full max-w-[800px] justify-center">
              
            {/* Premium Glow Behind Card */}
            <div className="relative w-full max-w-[800px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-muhi-blue/20 to-muhi-green/20 blur-[80px] rounded-full scale-[1.2] opacity-70 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={theme}
                  initial={{ opacity: 0, rotateY: 90, scale: 0.9 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: -90, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className={`relative w-full aspect-[4/5] rounded-[24px] md:rounded-[36px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.02)] border border-black/[0.03] overflow-hidden`}
                >
                  
                  <TemplateRenderer templateId={theme} name={name} message={message} />

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Bar */}
            <div className="mt-8 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full">
              <Button onClick={handleDownload} disabled={isDownloading} className="bg-muhi-blue hover:bg-muhi-blue/90 text-white rounded-full font-medium shadow-[0_8px_20px_rgba(18,103,179,0.24)] transition-all px-8 h-12 md:h-14 text-[14px] md:text-[15px] w-full max-w-[320px]">
                {isDownloading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Download className="w-5 h-5 mr-2" />}
                {isDownloading ? "Generating..." : "Download HD"}
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
