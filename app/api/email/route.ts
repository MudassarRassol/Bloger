import emailmodel from "@/lib/model/Email";
import { NextResponse,NextRequest } from "next/server";
import connectdb from "@/lib/config/db";

connectdb();
export async function POST(req:NextRequest){
    const formData =  await req.formData();
    const emailData = {
        email  : `${formData.get('email')}`,
    }
    console.log(emailData.email);

    const res1 = await emailmodel.findOne({ email: emailData.email})
    console.log(res1)
    if(res1) {
        return NextResponse.json({
            message: 'Email already exists',
            success: false,
            status : 400
        });
    }
    else{

        const res = await emailmodel.create({
            email: emailData.email
        })
        return NextResponse.json({
            message: 'Email sent successfully',
            data: res,
            success: true,
            status : 201
        });
    }
};


export async function GET(){
    try{

        
        const data = await emailmodel.find();
        if(data.length > 0){
            return NextResponse.json({ success: true, data });
        }
        else{
             return NextResponse.json({ success: false, msg: "No Email found" });
        }
    }
    catch(err){
        console.error(err);
        return NextResponse.json({ success: false, msg: "Server error" });
    }
}


export async function DELETE(req : NextRequest){
    try{
        const id = req.nextUrl.searchParams.get("id");
        console.log(id)
        const res  =  await emailmodel.findByIdAndDelete(id);
        if(res){
            return NextResponse.json({ success: true, msg: "Email deleted Successfuly" });
        }   
        else{
            return NextResponse.json({ success: false, msg: " Failed to Delete ! Try Again  " })
        }
    }
    catch(err){
        return NextResponse.json({err : err as Error})
    }
}