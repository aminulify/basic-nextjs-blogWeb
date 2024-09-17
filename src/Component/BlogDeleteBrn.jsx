"use client";

import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

const BlogDeleteBrn = ({id}) => {

    const router = useRouter(); 

    const handleCloseBtn = (id) =>{
            fetch('http://localhost:3000/api/add-blog',{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            })
            .then(res=>res.json())
            .then(data=>{
                if(data?.success){
                    router.refresh();
                    alert(`${data?.message}`)
                    // console.log(data);
                }
            })
            .catch(err=>{
                console.log(err);
            })
      }
    
    return (
     
        <button onClick={()=>{handleCloseBtn(id)}} className="py-2 text-red-500 px-2 rounded-full hover:bg-red-300 duration-200 cursor-pointer text-center"><IoClose/></button>
       
    );
};

export default BlogDeleteBrn;