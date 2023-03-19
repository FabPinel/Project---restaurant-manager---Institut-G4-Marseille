import React from 'react'
import RoutePage from './RoutePage'
import { SideBar } from './SideBar'


const MainPage = () => {
  return (
    <React.Fragment>
      {/* SideBar section */}
      <section>
        <div className="grid grid-cols-12">
          <div className="col-span-2 h-full flex min-h-0 flex-1 flex-col bg-bleu">
            <SideBar />
          </div>
          <div className="col-span-10 flex-shrink-0 w-full bg-blanc items-center px-4">
            <RoutePage />
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default MainPage