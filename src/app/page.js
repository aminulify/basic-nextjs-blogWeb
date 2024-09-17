import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-r from-pink-100 to-blue-100">
      <div className="flex flex-col mx-auto justify-center items-center">
        <h2 className="text-4xl font-bold mb-4 text-indigo-800">Browse our blog collection</h2>
        <Link className="rounded-md bg-indigo-600 text-white py-2 px-6 hover:bg-indigo-700 duration-150" href={'/blogs'}>Explore Blogs</Link>
      </div>
      
    </div>
  );
}
