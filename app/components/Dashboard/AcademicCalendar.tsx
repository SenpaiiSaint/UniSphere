"use client"

import React, { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { Popover } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { FiCalendar } from 'react-icons/fi'

export const AcademicCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isOpen, setIsOpen] = useState(false)

  // Sample academic events - in a real app, this would come from an API
  const academicEvents = [
    {
      date: new Date(2024, 4, 1), // May 1, 2024
      title: "Registration Opens"
    },
    {
      date: new Date(2024, 4, 15), // May 15, 2024
      title: "Midterm Exams"
    },
    {
      date: new Date(2024, 5, 1), // June 1, 2024
      title: "Final Exams Begin"
    }
  ]

  const modifiers = {
    hasEvent: (date: Date) => 
      academicEvents.some(event => 
        format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
  }

  const modifiersStyles = {
    hasEvent: {
      border: '2px solid #3b82f6',
      backgroundColor: '#eff6ff'
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {[
        <Button
          key="trigger"
          variant="outline"
          className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm"
        >
          <FiCalendar className="w-4 h-4" />
          <span>Academic Calendar</span>
        </Button>,
        <div key="content" className="p-4 bg-white rounded-lg shadow-lg w-[320px]">
          <div className="mb-4 overflow-hidden rounded-md">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="border-0"
            />
          </div>
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3 text-gray-700">Upcoming Events</h4>
            <div className="space-y-3">
              {academicEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                  <span className="font-medium text-gray-900">{format(event.date, 'MMM d')}:</span>
                  <span className="truncate">{event.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ]}
    </Popover>
  )
} 