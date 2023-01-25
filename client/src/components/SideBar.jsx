/* eslint-disable no-unused-vars */
import React from 'react';
import { Fragment, useState } from 'react'
import SidebarData from '../data/SidebarData';
import { NavLink } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function SideBar() {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    
<React.Fragment>
  <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
    {/* Sidebar component, swap this element with another sidebar if you like */}
    <div className="flex min-h-0 flex-1 flex-col bg-bleu">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <img
            className="h-24 m-auto w-auto"
            src="http://image.noelshack.com/fichiers/2023/03/1/1673902579-logo.png"
            alt="Your Company"/>
        </div>
        <div className='mt-5 flex-1 space-y-1 px-2'>
         {
          SidebarData.map((item, index)=>{
            return(
              <div key={index}>
                <NavLink to={item.path} className='hover:bg-gris flex mb-4'>
                  <span className='text-gray-400 group-hover:text-gray-300
                        mr-3 flex-shrink-0 h-6 w-6'>{item.icon}</span>
                  <span className='text-gray-300 hover:bg-gris hover:text-white
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md'>
                      {item.title}</span>
                </NavLink>
              </div>
            )
          })
         }
        </div>
      </div>
    </div>
  </div>
</React.Fragment>

  )
}

export {SideBar};