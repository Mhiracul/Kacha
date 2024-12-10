const Dthree = () => {
  return (
    <div className="col-span-12 rounded-lg b shadow-[#272f4f] bg-[#01071C] py-6 shadow-md dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <iframe
        scrolling="no"
        allowtransparency="true"
        frameborder="0"
        src="https://www.tradingview-widget.com/embed-widget/timeline/?market=stock#%7B%22market%22%3A%22stock%22%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22regular%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A700%2C%22utm_source%22%3A%22multicopytrade.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22timeline%22%2C%22page-uri%22%3A%22multicopytrade.com%2Fuser%2Fdashboard%22%7D"
        title="timeline TradingView widget"
        lang="en"
        style={{
          userSelect: "none",
          boxSizing: "border-box",
          display: "block",
          height: "100%",
          width: "100%",
        }}
      ></iframe>{" "}
    </div>
  );
};

export default Dthree;
