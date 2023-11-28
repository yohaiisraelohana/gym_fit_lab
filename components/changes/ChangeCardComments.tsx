import React from 'react'

export default function ChangeCardComments(
    {change_show}:{
        change_show:string;
    }) {
  return (
    <>
        {change_show == "לייקים"
            && ( 
            <div>

            </div>
            )
        } 
    </>
  )
}
