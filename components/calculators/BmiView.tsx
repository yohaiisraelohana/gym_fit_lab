import ArrowIcon from '@/assets/icons/ArrowIcon'
import React from 'react'

export default function BmiView(
        {bmi , bmi_view_style}:{
            bmi:number;
            bmi_view_style?:{height:string , width:string};
        }) {
    const bmiLevels = [
        {mr:37,mb:-23,r:-90},//0
        {mr:37,mb:-21,r:-86},
        {mr:37,mb:-20,r:-78},
        {mr:37,mb:-18,r:-74},
        {mr:36,mb:-17,r:-70},
        {mr:35,mb:-16,r:-66},//5
        {mr:33,mb:-15,r:-62},
        {mr:31,mb:-14,r:-58},
        {mr:29,mb:-13,r:-54},
        {mr:27,mb:-12,r:-50},
        {mr:25,mb:-11,r:-46},//10
        {mr:23,mb:-10,r:-42},
        {mr:21,mb:-9,r:-38},
        {mr:19,mb:-8,r:-34},
        {mr:17,mb:-7,r:-30},
        {mr:16,mb:-6,r:-26},//15
        {mr:16,mb:-6,r:-22},
        {mr:12,mb:-5,r:-18},
        {mr:9,mb:-4,r:-14},
        {mr:6,mb:-4,r:-10},
        {mr:4,mb:-4,r:-6},//20
        {mr:2,mb:-4,r:-2},
        {mr:-2,mb:-4,r:2},
        {mr:-3,mb:-4,r:6},
        {mr:-4,mb:-4,r:10},
        {mr:-5,mb:-4,r:14},//25
        {mr:-7,mb:-5,r:18},
        {mr:-9,mb:-6,r:22},
        {mr:-12,mb:-6,r:26},
        {mr:-14,mb:-7,r:30},
        {mr:-16,mb:-8,r:34},//30
        {mr:-20,mb:-9,r:38},
        {mr:-22,mb:-10,r:42},
        {mr:-24,mb:-11,r:46},
        {mr:-26,mb:-12,r:50},
        {mr:-28,mb:-13,r:54},//35
        {mr:-30,mb:-14,r:58},
        {mr:-32,mb:-15,r:62},
        {mr:-34,mb:-16,r:66},
        {mr:-36,mb:-17,r:70},
        {mr:-38,mb:-18,r:74},//40
        {mr:-40,mb:-20,r:78},
        {mr:-42,mb:-21,r:82},
        {mr:-44,mb:-22,r:86},
        {mr:-46,mb:-23,r:90}
    ];
  return (
        <div className=" relative flex items-end justify-center">
            <div 
                style={bmi_view_style ? {height:bmi_view_style.height , width:bmi_view_style.width} : {}}
                className={"h-[130px] w-[260px] sm:h-[100px] sm:w-[200px] md:h-[150px] md:w-[300px] lg:h-[200px] lg:w-[400px] bg-gradient-to-r from-blue-600 via-[var(--primary)]  via-50% from-5% to-95% to-red-600 rounded-tl-full rounded-tr-full"}></div>
            <div className=" absolute bottom-0 w-[70%] h-[70%] bg-white rounded-tl-full rounded-tr-full"></div>
            <ArrowIcon style={{marginBottom:`${bmiLevels[bmi].mb}%`,marginRight:`${bmiLevels[bmi].mr}%`,rotate:`${bmiLevels[bmi].r}deg`,transition:'all 1s ease-in-out'}} classNameStyle={`text-background h-[100%] w-[60%] absolute`} />            
        </div>
  )
}
