'use client'

import React from 'react'
import { FiBell, FiSearch } from 'react-icons/fi'
import { format } from 'date-fns'
import { AcademicCalendar } from './AcademicCalendar'

export const TopBar = () => {
  const currentDate = new Date()
  const formattedDate = format(currentDate, 'EEEE, MMMM do yyyy')

  return (
    <div className='border-b px-4 mb-4 mt-2 pb-4 border-stone-200'>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-bold block">Welcome back, Dr. Johnson!</span>
          <span className="text-xs block text-stone-500">{formattedDate}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses, students..."
              className="pl-8 pr-4 py-1.5 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-stone-400" />
          </div>

          <button className="relative p-2 text-stone-600 hover:text-blue-600 transition-colors">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <AcademicCalendar />
        </div>
      </div>
    </div>
  )
}
