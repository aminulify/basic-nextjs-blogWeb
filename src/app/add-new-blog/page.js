"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const AddNewBlog = () => {
    const router = useRouter();

    const handleAddBlog = (e) =>{
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const blogData = {title, description};
        // console.log({title, description});

        try{
            fetch('/api/add-blog',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(blogData)
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.success){
                    alert("Add Successful")
                    form.reset();
                    // console.log(data);
                    router.refresh();
                    router.push('/blogs')
                }
            })
            
        }catch(err){
            console.log(err);
        }
        
    }

    return (
        <section className="h-screen w-full bg-gradient-to-r from-pink-100 to-blue-100">
            <div className="max-w-[1100px] mx-auto">
            <div className="flex justify-between py-5">
            <Link href={'/'} className="font-bold text-2xl">Today's Blog</Link>
            <Link href={'/blogs'} className="rounded-md bg-indigo-600 py-2 px-6 text-white hover:bg-indigo-700 duration-100">Blogs</Link>
            </div>
            <form onSubmit={handleAddBlog} className="w-[50%] mx-auto my-32">
                <input type="text" name="title" className="p-2 rounded-sm flex justify-center caret-indigo-600 border border-indigo-600 bg-transparent backdrop:blur-md mb-3 outline-none w-full placeholder:text-indigo-300" placeholder="Enter blog title" />
                <textarea rows={"3"} name="description" className="p-2 rounded-sm flex justify-center caret-indigo-600 border border-indigo-600 bg-transparent backdrop:blur-md outline-none w-full placeholder:text-indigo-300" placeholder="Enter blog description"></textarea>
                <button type="submit" className="rounded-md bg-indigo-600 py-2 px-6 mt-3 text-white hover:bg-indigo-700 duration-100">Submit</button>
            </form>
        </div>
        </section>
    );
};

export default AddNewBlog;