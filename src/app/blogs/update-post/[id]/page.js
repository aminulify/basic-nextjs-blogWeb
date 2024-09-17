"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PostUpdatePage = () => {
    const params = useParams();
    // console.log(params.id);
    const router = useRouter();
    const [singlePost, setSinglePost] = useState();
    // console.log("data",singlePost);
    
    useEffect(()=>{
        fetch(`http://localhost:3000/api/add-blog/${params.id}`)
        .then(res=>res.json())
        .then(data=>{
            setSinglePost(data.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])


  const handleBlogUpdate = (e) =>{
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const updatedData = {title, description}
    // console.log({title,description});

    try{
        fetch(`http://localhost:3000/api/add-blog/${params.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        })
        .then(res=>res.json())
        .then(data => {
            // console.log(data);
            if(data.success){
                alert('Updated Successful');
                router.refresh();
                router.push('/blogs')
                
            }
        })
    }catch(err){
        console.log(err);
    }
}

  return(
    <section className="h-screen w-full bg-gradient-to-r from-pink-100 to-blue-100">
            <div className="max-w-[1100px] mx-auto">
            <div className="flex justify-between py-5">
            <Link href={'/'} className="font-bold text-2xl">Today's Blog</Link>
            <Link href={'/blogs'} className="rounded-md bg-indigo-600 py-2 px-6 text-white hover:bg-indigo-700 duration-100">Blogs</Link>
            </div>
            <form onSubmit={handleBlogUpdate} className="w-[50%] mx-auto my-32">
                <input type="text" name="title" className="p-2 rounded-sm flex justify-center caret-indigo-600 border border-indigo-600 bg-transparent backdrop:blur-md mb-3 outline-none w-full" placeholder="Enter blog title" defaultValue={singlePost?.title} />
                <textarea rows={"3"} name="description" className="p-2 rounded-sm flex justify-center caret-indigo-600 border border-indigo-600 bg-transparent backdrop:blur-md outline-none w-full" placeholder="Enter blog description" defaultValue={singlePost?.description}></textarea>
                
                <button type="submit" className="rounded-md bg-indigo-600 py-2 px-6 mt-3 text-white hover:bg-indigo-700 duration-100">Update</button>
            </form>
        </div>
        </section>
  );
};

export default PostUpdatePage;
