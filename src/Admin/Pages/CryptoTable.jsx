import { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import DefaultLayout from "../../layout/DefaultLayout";
import { AiOutlineClose } from "react-icons/ai";
// Mock data for cryptocurrencies
const cryptocurrencies = [
  { id: 1, name: "Bitcoin", symbol: "BTC", price: 40000 },
  { id: 2, name: "Ethereum", symbol: "ETH", price: 2500 },
  { id: 3, name: "USDT (ERC20)", symbol: "USDT", price: 1 },
  { id: 4, name: "USDT (TRC20)", symbol: "USDT", price: 1.2 },
];

const Deposit = () => {
  // State for deposit modal
  const [depositModalIsOpen, setDepositModalIsOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [currentFormattedDate, setCurrentFormattedDate] = useState("");

  const getSelectedCryptoData = () => {
    return (
      cryptocurrencies.find((crypto) => crypto.symbol === selectedCrypto) || {}
    );
  };
  // Function to handle deposit form submission
  const handleDepositSubmit = (e) => {
    e.preventDefault();
    // Perform deposit logic here, e.g., update user balance
    console.log("Deposit amount:", depositAmount);
    console.log("Selected crypto:", selectedCrypto);
    closeDepositModal(); // Close the modal after submission
  };

  // Function to calculate the equivalent amount in BTC
  const calculateEquivalentInBTC = (amount, cryptoPrice) => {
    return (amount / cryptoPrice).toFixed(8); // Display 8 decimal places
  };

  // Function to open the deposit modal
  const openDepositModal = (cryptoSymbol) => {
    setSelectedCrypto(cryptoSymbol);
    setDepositModalIsOpen(true);
  };

  // Function to close the deposit modal
  const closeDepositModal = () => {
    setDepositModalIsOpen(false);
    setSelectedCrypto("");
    setDepositAmount("");
  };

  const formatTwoDigits = (number) => {
    return number.toString().padStart(2, "0");
  };

  const formatCurrentDate = useCallback(() => {
    const currentDate = new Date();

    const year = currentDate.getFullYear().toString().slice(-2);
    const month = formatTwoDigits(currentDate.getMonth() + 1);
    const day = formatTwoDigits(currentDate.getDate());
    const hours = formatTwoDigits(currentDate.getHours());
    const minutes = formatTwoDigits(currentDate.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }, []);

  // useEffect to update the formatted date on component mount
  useEffect(() => {
    // Format the current date and update it
    const formattedDate = formatCurrentDate();
    setCurrentFormattedDate(formattedDate);
  }, [formatCurrentDate]); // formatCurrentDate added to the dependency array

  // Render the cryptocurrency table
  return (
    <DefaultLayout>
      <div>
        <table className="w-full bg-white mt-5 rounded-md shadow-lg shadow-[#ccc]">
          <thead>
            <tr>
              <th className="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                Name
              </th>
              <th className="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                Symbol
              </th>
              <th className="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                Price
              </th>
              <th className="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cryptocurrencies.map((crypto) => (
              <tr key={crypto.id}>
                <td className="p-2 mb-0 leading-normal text-sm align-middle bg-transparent border-b whitespace-nowrap">
                  {crypto.name}
                </td>
                <td
                  className="p-2 mb-0 leading-normal text-sm align-middle bg-transparent border-b whitespace-nowrap
"
                >
                  {crypto.symbol}
                </td>
                <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap text-[#569C68]  font-semibold leading-tight text-xs">
                  ${crypto.price}
                </td>
                <td className="p-2 mb-0 leading-normal text-sm align-middle bg-transparent border-b whitespace-nowrap">
                  <button
                    onClick={() => openDepositModal(crypto.symbol)}
                    className="outline-none border border-[#569C68] px-2 rounded-sm"
                  >
                    Deposit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Deposit Modal */}
        <Modal
          isOpen={depositModalIsOpen}
          onRequestClose={closeDepositModal}
          contentLabel="Deposit Modal"
          ariaHideApp={false} // To prevent "App element not found" warning
          style={{
            overlay: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "400px",
              margin: "auto",
              height: "350px", // Adjust the height as needed
              borderRadius: "4px",
              border: "none",
              background: "#fff",
              display: "flex", // Added to use Flexbox
              flexDirection: "column", // Added to use Flexbox
              gap: "6px", // Added to create space between elements
            },
          }}
        >
          <div>
            <button onClick={closeDepositModal} className="outline-none">
              <AiOutlineClose />
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex bg-white shadow-md p-1 rounded-sm mb-2 items-center justify-between font-bold text-xs">
              Current Date: <span>{currentFormattedDate}</span>
            </div>

            {/* ... Rest of your code ... */}
            <div className="flex items-center bg-white shadow-md  p-1 mb-2 rounded-sm justify-between font-bold text-xs">
              Coin Name:{" "}
              <span className="">{getSelectedCryptoData().name}</span>
            </div>
            <div className="flex items-center bg-white shadow-md  p-1 rounded-sm mb-2 justify-between font-bold text-xs">
              Coin Symbol: <span>{getSelectedCryptoData().symbol}</span>
            </div>
            <div className="flex items-center bg-white shadow-md  p-1 mb-2 justify-between font-bold text-xs">
              Coin Rate:{" "}
              <span className="text-[#569C68]">
                ${getSelectedCryptoData().price}
              </span>
            </div>
          </div>
          <form onSubmit={handleDepositSubmit}>
            <label className="text-sm font-bold" htmlFor="amount">
              Amount ($):{" "}
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="border border-gray-400 outline-none w-full rounded-sm"
              required
            />
            <br />
            <button
              type="submit"
              className="text-white mt-6 bg-fuchsia-500 px-2 py-1 text-xs mr-4 rounded-full"
            >
              Deposit
            </button>
            <button
              onClick={closeDepositModal}
              className="text-white mt-6 bg-fuchsia-500 px-2 py-1 text-xs mr-4 rounded-full"
            >
              Cancel
            </button>
          </form>
          <div className="text-sm">
            {depositAmount &&
              `Equivalent in BTC: ${calculateEquivalentInBTC(
                depositAmount,
                getSelectedCryptoData().price
              )}`}
          </div>
          <div>
            <h5 className="text-sm">Important❗</h5>
            <div className="text-xs">
              🔴 Coins will be deposited immediately after 4 network
              confirmation
            </div>
            <div className="text-xs">
              🔴 Once you have completed your payment you will be automatically
              redirected back to your dashbaord
            </div>
          </div>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default Deposit;
