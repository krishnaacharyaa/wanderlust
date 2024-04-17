import PenIcon from "@/assets/svg/pen-icon";
import TrasnIcon from "@/assets/svg/trash-icon";
import { imageUrls } from "@/constants/images";

const AdminBlogs = () => {
  return (

<div className="p-12 w-full">
  <h1 className="text-2xl font-bold">Blogs</h1>
  <div className="mt-12 flex flex-col">
    <div className="flex flex-col md:flex-row md:items-center justify-between py-2 gap-2 md:gap-7">
      <img src={imageUrls[1]} className="md:w-28 md:h-24 w-full h-48 object-cover rounded-xl shadow-lg" alt="" />
      <div className="flex grow flex-col justify-between gap-1"> 
        <h4 className="font-semibold text-2xl">A Serene Escape to Bali's Hidden Beaches</h4>
        <p className="text-[#868383]  text-sm ">Explore Bali's tranquil shores and discover the best-hidden beaches the island has to offer. Dive into the crystal-clear water</p>
        <p className="text-[#6941C6] text-sm font-semibold">Drew Cano • 1 Jan 2023</p>
      </div>
      <div className="flex gap-2 ">
      <button className="h-fit rounded-xl text-xl font-semibold border-0">
     <PenIcon />
      </button>
      <button className="h-fit rounded-xl border-0 text-xl font-semibold ">
   <TrasnIcon />
      </button>
      </div>
    </div>
  </div>
</div>


 
  );
};

export default AdminBlogs;
