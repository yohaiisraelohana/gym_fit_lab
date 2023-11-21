import EditSquarIcon from '@/assets/icons/EditSquarIcon';
import { activity_options } from '@/components/calculators/activityOptions';

export default function BodyStatusTable(
  {body_status_list , handleEdit}:{
    body_status_list : TBodyStatus[] | null;
    handleEdit : (bs:TBodyStatus) => void
  }
) {
    
  return (
    <div dir="rtl" className="  h-[100vw] w-full overflow-auto bg-white/30 backdrop-blur-sm">
      {  body_status_list ?
        <table className="table-fixed bg-white w-fit">
            <thead>
              <tr>
                <th className='w-[100px]'>{"תאריך"}</th>
                <th className='w-[50px]'>{"גובה"}</th>
                <th className='w-[50px]'>{"משקל"}</th>
                <th className='w-[40px]'>{"גיל"}</th>
                <th className='w-[80px]'>{"פעילות"}</th>
                <th className='w-[100px]'>{"מטרה"}</th>
                <th className='w-[50px]'>{"עריכה"}</th>
              </tr>
            </thead>
            <tbody>
              {body_status_list.map((bs , ind)=>(
                <tr key={ind}>
                  <td className='text-center'>{bs.created_at}</td>
                  <td className='text-center'>{bs.height}</td>
                  <td className='text-center'>{bs.weight}</td>
                  <td className='text-center'>{bs.age}</td>
                  <td className='text-center'>{activity_options[bs.activity!].name}</td>
                  <td className='text-center'>{bs.target}</td>
                  <td 
                    onClick={()=>handleEdit(bs)}
                    className='pr-3'>
                    <EditSquarIcon classNameStyle='h-5 w-5 text-primary' />
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      :
        <div className="text mt-[30%] w-full text-center">לא נמצאו סטטוסי גוף</div>
    }
    </div>
  )
}
