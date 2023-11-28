import PhotoIcon from '@/assets/icons/PhotoIcon';
import BookmarkIcon from '@/assets/icons/BookmarkIcon';
import ChevronLeftIcon from '@/assets/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon';
import CommentIcon from '@/assets/icons/CommentIcon';
import DocumentTextIcon from '@/assets/icons/DocumentTextIcon';
import HeartOutline from '@/assets/icons/HeartOutline';
import ShareIcon from '@/assets/icons/ShareIcon';
export default function ChangeCardOptions(
    { is_exist_change , setChangeShow}:{
        is_exist_change:boolean;
        setChangeShow:(s:string)=>void;
    }) {
  return (
    <div className=" w-full px-[2vw] bg-white h-[6%]   text-black   flex justify-evenly items-center">
    {!is_exist_change ? <ShareIcon classNameStyle='h-[80%] w-6 cursor-pointer  text-gray-700'/> : <p className='h-6 w-6'></p> }
    {!is_exist_change ? <BookmarkIcon classNameStyle='h-[80%] w-6 cursor-pointer text-blue-600' /> : <p className='h-6 w-6'></p> }
    <ChevronLeftIcon classNameStyle=' h-[80%] w-6 cursor-pointer md:hidden' onClick={()=>setChangeShow("לפני")} />
    <PhotoIcon classNameStyle='h-[80%] w-6 cursor-pointer max-md:hidden' onClick={()=>setChangeShow("לפני")} />
    <DocumentTextIcon classNameStyle='h-[80%] w-6 cursor-pointer text-primary ' onClick={()=>{ setChangeShow("פרטים"); }} />
    <ChevronRightIcon classNameStyle='h-[80%] w-6 cursor-pointer md:hidden' onClick={()=>setChangeShow("אחרי")} />
    {!is_exist_change ? <CommentIcon classNameStyle='h-[80%] w-6 cursor-pointer text-yellow-600' /> : <p className='h-6 w-6'></p> }
    {!is_exist_change ? <HeartOutline classNameStyle='h-[80%] w-6 cursor-pointer text-red-600' /> : <p className='h-6 w-6'></p> }
</div>
  )
}
