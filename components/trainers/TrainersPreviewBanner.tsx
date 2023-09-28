'use client'
import { useRef, useState } from "react"

export default function TrainersPreviewBanner() { 
  const [showTrainerDetails , setShowTrainerDetails ] = useState<number>(-1);
  return (
    <div className="w-screen flex flex-col border-b-2 border-primary">
        <img 
          src="https://res.cloudinary.com/dftounwvk/image/upload/v1695554493/artwork_3_gftskp.png" 
          alt="trainer image "
          className=" m-auto h-[400px]" />
        <p className="text text-xl m-auto "> ! מאות מאמנים מנוסים </p>
        <p className="text text-xl m-auto "> מצא את המאמן המתאים בשבילך </p>
        <div className=" m-auto w-[90vw] overflow-x-auto">
          <div className="w-fit overflow-x-scroll flex mt-5 mb-8 gap-5">
            {[1,2,3,4,5,6,7].map((n,ind)=>(
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  e.currentTarget.scrollTop = e.currentTarget.scrollTop > 0 ? 0 : 260;
                }}
                key={n} 
                className="h-[290px] w-[200px] overflow-scroll md:w-[500px] bg-white rounded-sm flex max-md:flex-col"
                > <div 
                    className="w-full md:w-[40%] md:h-full min-h-[260px] border-b md:border-r md:border-b-0 border-neutral-800">
                    <img 
                      src="https://res.cloudinary.com/dftounwvk/image/upload/v1695709580/3D_Animation_Style_muscular_man_training_shoulder_muscles_0_p460uc.jpg" 
                      className="h-full w-full"
                      alt="trainer image"/>
                  </div>

                  <div className="w-full md:w-[60%] min-h-[290px] md:h-full flex flex-col px-2 md:py-1 md:px-3 ">
                    <div className="w-full flex items-center h-[30px]">
                      <button
                        onClick={()=>setShowTrainerDetails(prev => prev == ind ? -1 : ind)}
                        type='submit'
                        className="text-primary mr-auto md:hidden"
                        > { showTrainerDetails == ind ? 
                            ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> 
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />  
                              </svg> ) : ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                              </svg>  )}                                           
                      </button>
                      <p className=" font-bold ml-auto text-lg">שם המאמן</p>
                    </div>
                  </div>
              </form>
            ))}
          </div>
        </div>
    </div>
  )
}
