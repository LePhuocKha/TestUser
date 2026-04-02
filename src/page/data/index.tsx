import  { useEffect, useState } from "react";
import { getPeople } from "../../api/items/people";
import type { people } from "../../type/items/people";
import Loading from "../../component/loading";
import { IoIosRemoveCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const Data = () => {
  const [dataPeople, setDataPeople] = useState<people[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false)
  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingData(true)
        const data = await getPeople();        
        if (Array.isArray(data?.data)) {
          setDataPeople(data?.data);
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoadingData(false)
      }
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          People Data Management
        </h1>
        <p className="text-sm text-gray-500">
          Manage user and data information
        </p>
      </div>

      <button className="py-2 px-4 flex items-center rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm cursor-pointer">
        <IoMdAdd className="text-xl" /> Create
      </button>
    </div>

    <div className="bg-white p-4 rounded-xl shadow-sm mb-4 flex gap-3">
      <select className="border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
        <option>Name</option>
        <option>Age</option>
        <option>Job</option>
      </select>

      <input
        placeholder="Search..."
        className="flex-1 border border-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Job</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        {loadingData ? (
          <tbody>
            <tr>
              <td colSpan={4} className="py-6 text-center">
                <Loading />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {dataPeople.map((item, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium text-gray-800">
                  {item.name}
                </td>
                <td className="p-3 text-gray-600">{item.age}</td>
                <td className="p-3 text-gray-600">{item.job}</td>

                <td className="p-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button className="text-blue-500 hover:text-blue-700 transition">
                     <MdEdit  className="text-xl cursor-pointer"/>
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition">
                      <IoIosRemoveCircle className="text-xl cursor-pointer" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div className="flex justify-between items-center p-4 text-sm text-gray-500 border-t">
        <span>Rows per page: 10</span>
        <span>Showing {dataPeople.length} items</span>

        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
            1
          </button>
          <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
            2
          </button>
          <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
            3
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Data;