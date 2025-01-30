import cx, { Class } from "@/utils/cx"
import { CaretDown } from "@phosphor-icons/react"
import {
  Root,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionHeader,
  AccordionMultipleProps,
  AccordionItemProps,
  AccordionSingleProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from "@radix-ui/react-accordion"
import { ElementRef, PropsWithChildren, ReactNode, forwardRef } from "react"

/* Root */

type AccordionProps = { children: ReactNode[] | ReactNode } & (
  | AccordionSingleProps
  | AccordionMultipleProps
)

export default function Accordion({ children, ...props }: AccordionProps) {
  return (
    <Root className="w-full divide-y border-y" {...props}>
      {children}
    </Root>
  )
}

/* Section */

type SectionSectionProps = { children: ReactNode[] } & AccordionItemProps

const Section = forwardRef<
  ElementRef<typeof AccordionItem>,
  SectionSectionProps
>(({ children, ...props }, ref) => (
  <AccordionItem {...props} ref={ref}>
    {children}
  </AccordionItem>
))

Accordion.Section = Section
Accordion.Section.displayName = Section.displayName

/* Header */

type HeaderProps = { className?: Class } & AccordionTriggerProps

const Header = forwardRef<
  ElementRef<typeof AccordionTrigger>,
  PropsWithChildren<HeaderProps>
>(({ children, className, ...props }, ref) => (
  <AccordionHeader>
    <AccordionTrigger
      className={cx(
        "px-sidebar group flex h-12 w-full cursor-pointer items-center justify-between font-[450]",
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
      <CaretDown
        weight="bold"
        className="group-state-open:rotate-180 text-accent transition-transform duration-300"
      />
    </AccordionTrigger>
  </AccordionHeader>
))

Accordion.Header = Header
Accordion.Header.displayName = Header.displayName

/* Content */

const Content = forwardRef<
  ElementRef<typeof AccordionContent>,
  AccordionContentProps
>(({ children, ...props }, ref) => (
  <AccordionContent {...props} ref={ref} className="overflow-hidden pb-4">
    {children}
  </AccordionContent>
))

Accordion.Content = Content
Accordion.Content.displayName = Content.displayName
