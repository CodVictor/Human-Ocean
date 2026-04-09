import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { ScrollArea } from './ui/scroll-area';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

interface FAQPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FAQPopup({ open, onOpenChange }: FAQPopupProps) {
  const { language } = useApp();
  const t = translations[language].faq;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-6 backdrop-blur-xl bg-white/90 dark:bg-[#1e3a5f]/90 border-white/20 shadow-2xl overflow-hidden rounded-3xl [&>button]:size-10 [&>button_svg]:size-6 [&>button]:bg-black/5 dark:[&>button]:bg-white/10 [&>button]:rounded-full [&>button]:hover:bg-black/10 dark:[&>button]:hover:bg-white/20 [&>button]:flex [&>button]:items-center [&>button]:justify-center transition-all">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[var(--ocean-blue-accent)]/10">
              <HelpCircle className="w-6 h-6 text-[var(--ocean-blue-accent)]" />
            </div>
            {t.title}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          <Accordion type="single" collapsible className="w-full">
            {t.questions.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-black/5 dark:border-white/10 last:border-0">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline hover:text-[var(--ocean-blue-accent)] transition-colors py-4 px-1">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4 px-1">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
