import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../redux/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import DefaultLayout from "../../layout/DefaultLayout";
import { apiBaseUrl } from "../../config";

function UserEdit() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.users);
  const myUsers = Array.isArray(usersData) ? usersData : [];
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/admin/users`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (res.status === 200) {
          dispatch(setUsers(res.data.data));
        } else {
          // Handle other response statuses
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        // Handle the error state or display an error message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleEditNavigation = (userId) => {
    navigate(`/edit/${userId}`);
  };

  const handlePutFundNavigation = (userId) => {
    navigate(`/admin-user/put-fund/${userId}`);
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const offset = currentPage * perPage;
  const currentData = myUsers.slice(offset, offset + perPage);
  const pageCount = Math.ceil(myUsers.length / perPage);

  return (
    <DefaultLayout>
      <div className="flex justify-center w-full rounded-lg overflow-x-auto border border-stroke bg-white shadow-default ">
        <div className="w-full">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className=" h-full rounded-lg ">
              <table className="min-w-full ">
                <thead className="bg-gray-100 text-black md:text-xs text-[10px] shadow-md shadow-stroke">
                  <tr>
                    <th
                      scope="col"
                      className="text-left shadow-md uppercase  px-4 py-2 "
                    >
                      Full Name
                    </th>
                    <th
                      scope="col"
                      className="text-left shadow-md uppercase  px-4 py-2"
                    >
                      Wallet Balances
                    </th>
                    <th
                      scope="col"
                      className="text-left shadow-md uppercase  px-4 py-2"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="text-left shadow-md uppercase  px-4 py-2"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white shadow-md text-black divide-y border-b border-[#ccc] divide-stroke md:text-xs text-[10px]">
                  {currentData.map((data) => (
                    <tr key={data._id}>
                      <td className="px-4 py-2 border">
                        {data.firstName} {data.lastName}
                      </td>

                      <td className="px-4 py-2 border">
                        <ul>
                          <li>ETH: {data.walletBalances.eth}</li>
                          <li>BTC: {data.walletBalances.btc}</li>
                          <li>XRP: {data.walletBalances.xrp}</li>
                          <li>XLM: {data.walletBalances.xlm}</li>
                          <li>XDC: {data.walletBalances.xdc}</li>
                          <li>ALGO: {data.walletBalances.algo}</li>
                          <li>MIOTA: {data.walletBalances.miota}</li>
                          <li>ADA: {data.walletBalances.ada}</li>
                          <li>HBAR: {data.walletBalances.hbar}</li>
                          <li>QTUM: {data.walletBalances.qtum}</li>
                        </ul>
                      </td>
                      <td className="px-4 py-2 border">{data.status}</td>
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-2">
                          <button
                            className="action-button edit bg-[#5321a8] text-white px-1 py-1 rounded-md"
                            onClick={() => handleEditNavigation(data._id)}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-row items-center justify-center mt-4 outline-none">
                <ReactPaginate
                  previousLabel="Previous"
                  nextLabel="Next"
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                  containerClassName="pagination flex  items-center border border-[#ccc]  rounded-md outline-none mb-4 outline-none"
                  previousClassName="pagination__prev flex items-center outline-none justify-center px-2 py-2 bg-transparent border border-[#ccc] text-[#000] text-xs  outline-none "
                  nextClassName="pagination__next flex items-center outline-none justify-center px-2 py-2 bg-transparent border border-[#ccc] text-black text-xs outline-none focus:border-transparent"
                  activeClassName="pagination__active"
                  disabledClassName="pagination__disabled"
                  pageClassName="pagination__page border border-[#ccc] bg-[#fff] text-xs flex items-center gap-7 outline-none text-black px-3 py-2"
                  breakClassName="pagination__break"
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default UserEdit;
