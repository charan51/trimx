import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useStoreContext } from "../contextApi";
import { useFetchAllUrls, useFetchTotalClicks } from "../hooks/useQuery";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const { isLoading: loader, data: totalClicks } = useFetchTotalClicks(token, onError);
  const { isLoading, data: myShortenUrls, refetch } = useFetchAllUrls(token, onError);
  const subDomain = import.meta.env.VITE_FRONT_ENDURL.replace(
    /^https?:\/\//,
    ""
  );
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(null);

  function onError() {
    console.log("Error fetching data");
  }

  useEffect(() => {
    if (myShortenUrls?.length > 0) {
      setSelectedUrl(myShortenUrls[0]); // Set first URL as default selected
    }
  }, [myShortenUrls]);

  // Copy to Clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);

    // Clear copied message after 2 seconds
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Chart Data
  const chartData = {
    labels: totalClicks?.map((entry) => entry.clickDate),
    datasets: [
      {
        label: "Click Count",
        data: totalClicks?.map((entry) => entry.count),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Click Count" }, beginAtZero: true },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {loader || isLoading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : (
        <div className="container mx-auto px-6 lg:px-20">
          {/* Dashboard Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
            <p className="text-gray-700">Track your URL performance in real-time.</p>
          </header>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* URL List */}
            <div className="bg-white p-6 rounded-lg shadow-lg lg:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Your URLs</h2>
                <button
                  onClick={() => navigate("/createurl")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold hover:bg-blue-500 transition"
                >
                  + Add New URL
                </button>
              </div>
              <div className="space-y-4">
                {myShortenUrls?.map((url) => (
                  <div
                    key={url.id}
                    onClick={() => setSelectedUrl(url)}
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition ${selectedUrl?.id === url.id
                      ? "bg-blue-100 border-l-4 border-blue-600"
                      : "hover:bg-gray-100"
                      }`}
                  >
                    {/* URL Details */}
                    <div className="flex flex-col">
                      {/* Original URL */}
                      {url.orginalUrl ? (
                        <div className="flex items-center space-x-2">
                          <p
                            className={`text-sm font-medium ${selectedUrl?.id === url.id ? "text-blue-600" : "text-gray-800"
                              }`}
                          >
                            {url.orginalUrl.length > 30
                              ? `${url.orginalUrl.slice(0, 30)}...`
                              : url.orginalUrl}
                          </p>
                          <a
                            href={url.orginalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FontAwesomeIcon icon={faExternalLinkAlt} className="h-4 w-4" />
                          </a>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(url.orginalUrl);
                            }}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <FontAwesomeIcon
                              icon={copiedUrl === url.orginalUrl ? faCheck : faCopy}
                              className="h-4 w-4"
                            />
                          </button>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm italic">No original URL available</p>
                      )}

                      {/* Short URL */}
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-700">
                          Short URL: <span className="font-semibold">{url.shortUrl}</span>
                        </p>
                        {/* <a
                          href={`${import.meta.env. }/${url.shortUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={(e) => e.stopPropagation()}
                        > */}
                        <Link
                          className="text-blue-600 hover:text-blue-800"
                          target="_"
                          to={import.meta.env.VITE_REACT_FRONT_ENDURL + "/s" + `${shortUrl}`}
                        ></Link>
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="h-4 w-4" />

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(import.meta.env.VITE_REACT_FRONT_ENDURL + "/s" + `${shortUrl}`);
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >

                          {subDomain + "/s/" + `${shortUrl}`}
                        <FontAwesomeIcon
                          icon={copiedUrl === `${import.meta.env.VITE_REACT_FRONT_ENDURL + "/s" + shortUrl}` ? faCheck : faCopy}
                          className="h-4 w-4"
                        />
                      </button>
                    </div>

                    {/* Click Count */}
                    <p className="text-xs text-gray-500">
                      Clicks: <span className="font-semibold">{url.clickCount}</span>
                    </p>
                  </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Click Performance for: <span className="text-blue-600">{selectedUrl?.orginalUrl || `Short URL: ${selectedUrl?.shortUrl}`}</span>
            </h2>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
        </div>
  )
}
    </div >
  );
};

export default Dashboard;
