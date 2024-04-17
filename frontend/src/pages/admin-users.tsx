const AdminUsers = () => {
  return (
    <div className="p-12 w-full">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="mt-12">
        <div className="flex justify-between items-center py-4 w-full border-b border-gray-300">
          <div className="flex flex-col gap-[10px]">
            <p className="text-base font-medium">Hemant</p>
            <p className="text-base font-medium">hemant412@gmail.com</p>
          </div>
          <button className="px-4 py-2 bg-black border border-black text-white font-semibold rounded-xl text-sm h-fit">
Admin
          </button>
        </div>
        <div className="flex justify-between items-center py-4 w-full border-b border-gray-300">
          <div className="flex flex-col gap-[10px]">
            <p className="text-base font-medium">Hemant</p>
            <p className="text-base font-medium">hemant412@gmail.com</p>
          </div>
          <button className="px-4 py-2 border border-black bg-whtie text-black font-semibold rounded-xl text-sm h-fit">
Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
