import React from "react";

const Chart = () => {
  return (
    <div className="col-span-12 text-black rounded-md h-96 shadow-md shadow-[#272f4f] bg-[#05070D] xl:col-span-8">
      <iframe
        scrolling="no"
        allowtransparency="true"
        frameborder="0"
        src="https://www.tradingview-widget.com/embed-widget/hotlists/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%221D%22%2C%22exchange%22%3A%22US%22%2C%22showChart%22%3Atrue%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Atrue%2C%22showSymbolLogo%22%3Atrue%2C%22showFloatingTooltip%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A600%2C%22plotLineColorGrowing%22%3A%22rgba(147%2C%20196%2C%20125%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(204%2C%2065%2C%2037%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(42%2C%2046%2C%2057%2C%200)%22%2C%22scaleFontColor%22%3A%22rgba(106%2C%20109%2C%20120%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(182%2C%20215%2C%20168%2C%200.13)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(221%2C%20126%2C%20107%2C%200.12)%22%2C%22belowLineFillColorGrowingBottom%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22belowLineFillColorFallingBottom%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22symbolActiveColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22utm_source%22%3A%22multicopytrade.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22hotlists%22%2C%22page-uri%22%3A%22multicopytrade.com%2Fuser%2Fdashboard%22%7D"
        title="hotlists TradingView widget"
        lang="en"
        style={{
          userSelect: "none",
          boxSizing: "border-box",
          display: "block",
          height: "384px",
          width: "100%",
        }}
      ></iframe>
    </div>
  );
};

export default Chart;
