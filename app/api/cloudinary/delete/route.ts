import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/services/cloudinary/config";

export async function DELETE(req:NextRequest) {
    try {
        const {public_id} = await req.json();

        if(!public_id)
            return NextResponse.json({message:"מזהה תמונה לא סופק"});

        const res = await cloudinary.uploader.destroy(public_id);
        console.log(res);

        if(res.result !== "ok")
            return NextResponse.json({message:"מחיקת התמונה נכשלה"});

        return NextResponse.json({message:"התמונה נמחקה בהצלחה"});
    } catch (error) {
        console.log(error);
        NextResponse.json({error});
    }
}