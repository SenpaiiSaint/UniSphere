'use client'

import React from 'react'
import { TopBar } from './TopBar'
import { Grid } from './Grid'
import { ClassSchedule } from './ClassSchedule'
import { StudentPerformance } from './StudentPerformance'
import { RecentAnnouncements } from './RecentAnnouncements'

export const Dashboard = () => {
  return (
<<<<<<< HEAD
    <div className='bg-white rounded-lg shadow min-h-screen -mt-4 pt-4'>
=======
    <div className='bg-white rounded-lg pb-4 shadow '>
>>>>>>> 34394c622616a42f37289c110713b50935219b9d
      <TopBar />
      <div className='p-6 space-y-8'>
        <Grid />
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-8'>
            <ClassSchedule />
          </div>
          <div className='col-span-4'>
            <RecentAnnouncements />
          </div>
        </div>
        <StudentPerformance />
      </div>
    </div>
  )
}
