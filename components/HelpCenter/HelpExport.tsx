import React from 'react'
import HelpOther from './HelpOther'
import HelpProblem from './HelpProblem'
import HelpQuick from './HelpQuick'

const Data ='Nguyễn Văn A'
const HelpExport = () => {
  return (
    <div >
      <div className='bg-gradient-to-tr from-white to-white h-20 flex place-content-start rounded-xl'>
        <p className='self-center 
        text-lg
        xl:text-3xl 
  
        font-semibold
         text-black mx-5 rounded-xl'>
          {`Xin chào ${Data} , chúng tôi có thể giúp gì cho bạn?`}
        </p>
      </div>
      <div className='my-10 '>
        <div className='flex flex-col gap-5 place-items-center'>
          <div className='bg-gradient-to-tr from-white to-slate-100 rounded-lg w-11/12'>
            <HelpOther/>
          </div>
          <div className='bg-gradient-to-tr from-white to-slate-100 rounded-lg w-11/12'>
            <HelpProblem/>
          </div>
          <div className='bg-gradient-to-tr from-white to-slate-100 rounded-lg w-11/12'>
            <HelpQuick/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpExport