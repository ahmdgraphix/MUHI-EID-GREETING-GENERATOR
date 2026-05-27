"use client";

import React, { useMemo, useEffect, useState, useRef } from 'react';
import templatesData from '@/data/templates.json';

interface TemplateRendererProps {
  templateId: string;
  name: string;
  message: string;
}

export function TemplateRenderer({ templateId, name, message }: TemplateRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const template = useMemo(() => templatesData.find((t: any) => t.id === templateId), [templateId]);

  // Calculate scaling factor to fit 1080x1080 into the parent container
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        setScale(width / 1080);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  if (!template) {
    return <div className="p-8 text-center text-red-500">Template not found</div>;
  }

  const finalMessage = message || "May your sacrifice bring endless blessings.";
  const finalName = name || "Your Name";

  let htmlWithVars = template.html;
  // Replace placeholders
  htmlWithVars = htmlWithVars.replace(/\{\{message\}\}/g, finalMessage);
  let nameFooterStyles = "position: absolute; bottom: 40px; left: 0; right: 0; text-align: center; z-index: 50;";
  
  // Custom positioning for specific templates based on their ID
  if (template.id === "template-1") {
    nameFooterStyles = "position: absolute; top: 65%; left: 0; right: 0; transform: translateY(-50%); text-align: center; z-index: 50;";
  } else if (template.id === "template-2") {
    nameFooterStyles = "position: absolute; top: 340px; left: 0; right: 0; text-align: center; z-index: 50;";
  } else if (template.id === "template-4") {
    nameFooterStyles = "position: absolute; bottom: 120px; left: 0; right: 0; text-align: center; z-index: 50;";
  } else if (template.id === "template-6") {
    nameFooterStyles = "position: absolute; bottom: 20px; left: 0; right: 0; text-align: center; z-index: 50;";
  } else if (template.id === "template-7") {
    nameFooterStyles = "position: absolute; bottom: 25px; left: 0; right: 0; text-align: center; z-index: 50;";
  } else if (template.id === "template-8") {
    nameFooterStyles = "position: absolute; bottom: 20px; left: 0; right: 0; text-align: center; z-index: 50;";
  }

  // Inject Name Footer
  const nameFooter = `
    <div style="${nameFooterStyles}">
      <p style="font-family: sans-serif; font-size: 18px; letter-spacing: 6px; text-transform: uppercase; color: #555; margin-bottom: 12px; font-weight: 500;">Warm Wishes From</p>
      <p style="font-family: sans-serif; font-size: 56px; font-weight: bold; color: #111; letter-spacing: -1px;">${finalName}</p>
    </div>
  `;
  
  htmlWithVars += nameFooter;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-[4/5] bg-white overflow-hidden rounded-[36px] ${template.id}`}
      style={{ isolation: 'isolate' }}
    >
      <style dangerouslySetInnerHTML={{ __html: template.css }} />
      
      {/* 
        This wrapper holds the exact 1080x1350 dimension needed for the template styles to lay out perfectly.
        We then scale it down using CSS transforms to fit visually within the preview container.
      */}
      <div 
        id="greeting-card-template"
        className="absolute top-0 left-0 origin-top-left"
        style={{ 
          width: '1080px', 
          height: '1350px',
          transform: `scale(${scale})`,
          backgroundColor: '#fff' // Fallback
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: htmlWithVars }} className="w-full h-full relative" />
      </div>
    </div>
  );
}
