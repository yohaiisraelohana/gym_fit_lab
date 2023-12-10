import TrofyIcon from '@/assets/icons/TrofyIcon';

export default function TrainerRate(
    { total_rate , total_raters , style }:{
        total_rate : number ;
        total_raters : number ;
        style? : string;
    }) {
  return (
    <div className={style || 'flex items-center gap-1'}>
        <TrofyIcon classNameStyle='h-5 w-5 text-[var(--primary)]' />
        <p>{total_rate / total_raters || 0}</p>
    </div>
  )
}
