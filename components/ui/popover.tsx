"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverProps {
  children: [React.ReactNode, React.ReactNode]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export const Popover = ({ children, open, onOpenChange, className }: PopoverProps) => {
  const [mounted, setMounted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(open ?? false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleOpen = () => {
    const newOpen = !isOpen
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.popover-content') && !target.closest('.popover-trigger')) {
        setIsOpen(false)
        onOpenChange?.(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [onOpenChange])

  if (!mounted) {
    return (
      <div className="relative inline-block">
        <div className="popover-trigger cursor-pointer">
          {children[0]}
        </div>
      </div>
    )
  }

  return (
    <div className="relative inline-block">
      <div onClick={toggleOpen} className="popover-trigger cursor-pointer">
        {children[0]}
      </div>
      {isOpen && (
        <div 
          className={cn(
            "popover-content fixed top-0 right-0 w-72 rounded-md border bg-white p-4 shadow-md z-50 mt-16",
            "transform transition-all duration-200 ease-in-out",
            className
          )}
        >
          {children[1]}
        </div>
      )}
    </div>
  )
}

export const PopoverTrigger = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const PopoverContent = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={className}>{children}</div>
} 