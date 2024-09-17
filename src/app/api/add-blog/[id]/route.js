import connectDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const blogPost = await Blog.findById(id);
    return NextResponse.json({
      success: true,
      status: 200,
      data: blogPost,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: " Server Error, Please try again.",
      status: 500,
    });
  }
}

export async function PUT(req, {params}){
    try{

        await connectDB();
        const {id} = params;

        const {title, description} = await req.json();
        const updateBlog = await Blog.findByIdAndUpdate(id, {title, description}, {new: true})

        if (!updateBlog) {
            return NextResponse.json({
                success: false,
                message: 'Blog post not found.',
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Blog Post Updated Successfully',
            status: 200,
            data: updateBlog
        })

    }catch(err){
        return NextResponse.json({
            success: false,
            message: " Server Error, Please try again.",
            status: 500,
        })
    }
}
