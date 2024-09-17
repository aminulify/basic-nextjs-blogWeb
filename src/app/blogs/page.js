
import BlogDeleteBrn from "@/Component/BlogDeleteBrn";
import Link from "next/link";

async function fetchListOfBlogPosts(){
    try{
        const apiRes = await fetch('http://localhost:3000/api/add-blog',
            // {cache: 'no-store'}  //** it's didn't cache data
            // {next: {revalidate: 5}} // revalidate: 5  **means after each 5s refetch data and show latest data
            {cache: 'no-store'}
        );
        const result = await apiRes.json();
        return result.data;
    }
    catch(error){
        throw new Error(error);
    }
}

const Blogs = async () => {
    const listOfPost = await fetchListOfBlogPosts();
    // console.log(listOfPost);

  return (
    <section className="w-full h-screen bg-gradient-to-r from-pink-100 to-blue-100">
        <div className="max-w-[1100px] mx-auto">
      <div className="flex justify-between py-5">
        <aside className="font-bold text-2xl cursor-pointer"><Link href={'/'}>Today's Blog</Link></aside>
        <Link
          href={"/add-new-blog"}
          className="rounded-md bg-indigo-600 py-2 px-6 text-white hover:bg-indigo-700 duration-100"
        >
          Add New Blog
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-5 ">
            {
                listOfPost.map(post => (
                    <div key={post._id} className="rounded-md p-5 bg-white/40 backdrop-blur-md border border-indigo-600">
                        <h1 className="font-semibold text-xl">{post.title}</h1>
                        <p className="text-sm">{post.description}</p>
                        <hr className="my-2 border-[0.3px] border-indigo-200"/>
                        <div className="flex items-center gap-2">
                          
                            <Link href={`/blogs/update-post/${post._id}`} className="rounded-full text-white text-[12px] bg-indigo-600 py-2 w-[90%] hover:bg-indigo-700 duration-200 text-center">Update</Link>

                            <div><BlogDeleteBrn id={post._id} /></div>
                        </div>
                    </div>
                ))
            }
        </div>

    </div>
    </section>
  );
};

export default Blogs;
