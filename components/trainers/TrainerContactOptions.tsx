"use client"
import { findContactDetails } from '@/services/functions/findContactDetails';
import Link from 'next/link';
import React from 'react'
import { EmailIcon, FacebookMessengerIcon ,  TelegramIcon, WhatsappIcon } from 'react-share'

export default function TrainerContactOptions(
    {contact_options}:{
        contact_options : string[];
    }) {
    const contact_details : TTrainerContactDetails = findContactDetails(contact_options); 
    const round = false;
    const size = 30;
    const radius = 15 ;
  return (
    <div className="w-full flex justify-around">
        {round 
        ? 
            <>
                <WhatsappIcon size={size} round={true} />
                <FacebookMessengerIcon size={size} round={true} />
                <TelegramIcon size={size} round={true} />
                <EmailIcon size={size} borderRadius={radius} />
            </> 
        :
            <>
                <Link 
                    href={`https://wa.me/${contact_details.whatsapp}`}>
                    <WhatsappIcon size={size} borderRadius={radius} style={contact_details.whatsapp ? {} : {opacity:0.5}} />
                </Link>
                <Link
                    href={`https://www.facebook.com/${contact_details.facebook}/`}>
                    <FacebookMessengerIcon size={size} borderRadius={radius} style={contact_details.facebook ? {} : {opacity:0.5}} />
                </Link>
                
                <Link
                    href={`mailto:${contact_details.email}`}>
                    <EmailIcon size={size} borderRadius={radius} style={contact_details.email ? {} : {opacity:0.5}} />
                </Link>
                <Link
                    href={`https://t.me/${contact_details.telegram}`}>
                    <TelegramIcon size={size} borderRadius={radius} style={contact_details.telegram ? {} : {opacity:0.5}} />
                </Link>
            </>
        }
    </div>
  )
}

//`http://m.me/${contact_details.facebook}`