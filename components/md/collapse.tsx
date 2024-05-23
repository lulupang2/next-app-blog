import { cn } from '@/libs/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

interface Props {
  children: React.ReactNode;
  summary: string;
  [key: string]: any;
}

export default function Collapse({ children, ...props }: Props) {
  return (
    <Accordion type="single" collapsible className={cn('w-[250px')}>
      <AccordionItem value="item-1">
        <AccordionTrigger>{props.summary}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
