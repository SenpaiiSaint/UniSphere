"use client"

import React, { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { format, addMonths, subMonths } from 'date-fns'
import { Popover } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export const AcademicCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isOpen, setIsOpen] = useState(false)

  const handlePrevMonth = () => {
    setDate(prev => prev ? subMonths(prev, 1) : new Date())
  }

  const handleNextMonth = () => {
    setDate(prev => prev ? addMonths(prev, 1) : new Date())
  }

  // Sample academic events
  const academicEvents = [
    {
      date: new Date(2024, 3, 1), // April 1
      title: "Spring Semester Begins"
    },
    {
      date: new Date(2024, 3, 15), // April 15
      title: "Course Registration Opens"
    },
    {
      date: new Date(2024, 4, 1), // May 1
      title: "Midterm Exams Week"
    },
    {
      date: new Date(2024, 4, 15), // May 15
      title: "Research Paper Deadline"
    },
    {
      date: new Date(2024, 4, 20), // May 20
      title: "Career Fair"
    },
    {
      date: new Date(2024, 5, 1), // June 1
      title: "Final Exams Begin"
    },
    {
      date: new Date(2024, 5, 15), // June 15
      title: "Spring Semester Ends"
    },
    {
      date: new Date(2024, 6, 1), // July 1
      title: "Summer Session Starts"
    },
    {
      date: new Date(2024, 6, 15), // July 15
      title: "Summer Midterm Exams"
    },
    {
      date: new Date(2024, 7, 1), // August 1
      title: "Summer Session Ends"
    },
    {
      date: new Date(2024, 8, 1), // September 1
      title: "Fall Semester Begins"
    },
    {
      date: new Date(2024, 8, 15), // September 15
      title: "Add/Drop Period Ends"
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

  // Filter events for the current month
  const currentMonthEvents = academicEvents.filter(event => 
    event.date.getMonth() === (date?.getMonth() ?? new Date().getMonth())
  )

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {[
        <Button
          key="trigger"
          variant="outline"
          className="flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm border-gray-200"
        >
          <FiCalendar className="w-4 h-4" />
          <span>Academic Calendar</span>
        </Button>,
        <div key="content" className="p-2 bg-white rounded-lg shadow-lg w-[280px] border border-gray-100">
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2 px-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-gray-100"
                onClick={handlePrevMonth}
              >
                <FiChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium text-gray-900">
                {date ? format(date, 'MMMM yyyy') : ''}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-gray-100"
                onClick={handleNextMonth}
              >
                <FiChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="border-0 [&_nav]:hidden"
              classNames={{
                day: "h-7 w-7 text-xs",
                cell: "h-7 w-7",
                head_cell: "h-7 w-7 text-[10px]",
                row: "mt-0.5"
              }}
            />
          </div>
          <div className="border-t border-gray-100 pt-2">
            <h4 className="text-xs font-medium mb-1.5 text-gray-700">
              {currentMonthEvents.length > 0 
                ? `Events in ${date ? format(date, 'MMMM') : ''}`
                : 'No events this month'}
            </h4>
            <div className="space-y-1.5 max-h-[120px] overflow-y-auto">
              {currentMonthEvents.map((event, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 text-xs text-gray-600 hover:bg-gray-50 p-1 rounded"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
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