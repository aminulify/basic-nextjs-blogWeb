import connectDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

// post data 
export async function POST(req) {
    try {
        // Connect to the database
        await connectDB();

        // Parse the JSON request body
        const { title, description } = await req.json();

        // Check if title and description are provided
        if (!title || !description) {
            return NextResponse.json({
                success: false,
                message: 'Title and Description are required.',
            }, { status: 400 });
        }

        // Create a new blog post in the database
        const newlyCreateBlogItem = await Blog.create({ title, description });

        // If successfully created, return success message
        return NextResponse.json({
            success: true,
            message: 'Blog added successfully!',
            data: newlyCreateBlogItem,
        }, { status: 201 });

    } catch (err) {
        console.error('Error:', err);
        // Return error message if something went wrong
        return NextResponse.json({
            success: false,
            message: 'Connection error. Please try again.',
        }, { status: 500 });
    }
}

export async function GET(){
    try{
        await connectDB();

        const blogPosts = await Blog.find();
        // console.log(blogPosts);

        if(!blogPosts || !blogPosts.length === 0){
            return NextResponse.json({
                success: false,
                message: "Blog Post Not Found"
            })
        }

        return NextResponse.json({
            success: true,
            data: blogPosts,
            status: 200
        })
    }catch(err){
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "Connection Error Please try again",
            status: 500
        })
    }
}

export async function DELETE(req){
    try{
        await connectDB();

        const {id} = await req.json();
        const deletePost = await Blog.findByIdAndDelete(id);

        if(!id){
            return NextResponse.json({
                status: 400,
                success: false,
                message: "Blog ID is required."
            })
        }

        else if(!deletePost){
            return NextResponse.json({
                status: 400,
                success: false,
                message: "Blog Post Not Found"
            })
        }

        return NextResponse.json({
            status: 200,
            success: true,
            message: "Blog post deleted successfully!"
        })

    }catch(err){
        console.log("connection error", err);
        return NextResponse.json({
            status: 500,
            success: false,
        })
    }
}