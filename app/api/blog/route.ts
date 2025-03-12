import connectdb from "@/lib/config/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { mkdir } from "fs/promises";
import blogmodel from "@/lib/model/Blog";
import fs from "fs";
const loaddb = async (): Promise<void> => {
    await connectdb();
};

loaddb();

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    console.log(formData);
    const timestamp = Date.now();
    const image = formData.get("image");

    if (image instanceof File) {
        const imageBytesData = await image.arrayBuffer();
        const buffer = Buffer.from(imageBytesData);

        // Get the absolute path of the `public` folder
        const publicDir = path.join(process.cwd(), "public");

        // Ensure the directory exists
        await mkdir(publicDir, { recursive: true });

        // Create the full image path
        const filePath = path.join(publicDir, `${timestamp}_${image.name}`);

        // Write file to disk
        await writeFile(filePath, buffer);

        const imgUrl = `/${timestamp}_${image.name}`;

        const blogData = {
            title: formData.get("title")?.toString(),
            description: formData.get("description")?.toString(),
            image: imgUrl,
            category: formData.get("category")?.toString(),
            author: formData.get("author")?.toString(),
            author_img: formData.get("author_img")?.toString(),
        }

        await blogmodel.create(blogData);

        return NextResponse.json({ success: true, msg: "Blog Created Successfuly" });
    } else {
        return NextResponse.json({ msg: "Invalid image file" });
    }
}


export async function GET(req : NextRequest){
    try{


        const id = req.nextUrl.searchParams.get("id");
        console.log(id);
        if(id){
            const blog = await blogmodel.findById(id);
            if(blog){
                return NextResponse.json({ success: true, data: blog});
            }
            else{
                 return NextResponse.json({ success: false, msg: "No blog found" });
            }
        }
        
        const data = await blogmodel.find();
        if(data.length > 0){
            return NextResponse.json({ success: true, data });
        }
        else{
             return NextResponse.json({ success: false, msg: "No blog found" });
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
        const res  =  await blogmodel.findByIdAndDelete(id);
        if(res){
            fs.unlink(`./public/${res.image}`,()=>{})
            return NextResponse.json({ success: true, msg: "Blog deleted Successfuly" });
        }   
        else{
            return NextResponse.json({ success: false, msg: " Failed to Delete ! Try Again  " })
        }
    }
    catch(err){
        return NextResponse.json({err : err as Error})
    }
}