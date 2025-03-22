import React, { useState } from "react";

const NowShowingMovie = () => {
  const [selectedDate, setSelectedDate] = useState("07/03/25");
  const [selectedCinema, setSelectedCinema] = useState("Rising Mall");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const dates = [
    { day: "Fri", date: "07", fullDate: "07/03/25" },
    { day: "Sat", date: "08", fullDate: "08/03/25" },
  ];

  const cinemas = [
    "All",
    "Rising Mall",
    "Civil Mall",
    "Chhaya Center",
    "Bhatbhateni Bhaktapur",
    "Durbar Cinemax",
    "Labim Mall",
    "City Square Mall",
  ];

  const languages = ["All", "English"];

  return (
    <div className="bg-gray-900 text-white p-6 max-w-6xl mx-auto rounded-lg shadow-lg flex flex-col md:flex-row">
      {/* Left Section: Movie Details */}
      <div className="w-full md:w-1/3">
        <div className="relative">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/d/d7/Mickey_17_%282025%29_poster.jpg"
            alt="Mickey 17"
            className="w-full rounded-lg shadow-lg"
          />
          <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-sm font-semibold rounded">
            Advance
          </span>
        </div>
        <h2 className="text-xl font-bold mt-3">NOW SHOWING</h2>
        <h1 className="text-2xl font-extrabold">Mickey 17 (2025)</h1>
        <div className="flex gap-2 my-2">
          <span className="bg-blue-500 px-2 py-1 rounded">137 mins</span>
          <span className="bg-green-500 px-2 py-1 rounded">PG</span>
        </div>
        <p className="text-gray-400">
          Mickey 17, known as an "expendable," goes on a dangerous journey to colonize an ice planet.
        </p>
        <button className="text-blue-400 mt-2">View More details</button>
      </div>

      {/* Right Section: Booking Options */}
      <div className="w-full md:w-2/3 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4">1. Select Date, Language & Time Slots</h2>

        {/* Date Selection */}
        <div className="mb-4">
          <h3 className="text-gray-400">Select Date</h3>
          <div className="flex gap-2 mt-2">
            {dates.map((date) => (
              <button
                key={date.fullDate}
                onClick={() => setSelectedDate(date.fullDate)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedDate === date.fullDate
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                <span className="block font-bold">{date.date}</span>
                <span className="text-sm">{date.day}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cinema Selection */}
        <div className="mb-4">
          <h3 className="text-gray-400">Select Cinemas</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {cinemas.map((cinema) => (
              <button
                key={cinema}
                onClick={() => setSelectedCinema(cinema)}
                className={`px-4 py-2 rounded-lg ${
                  selectedCinema === cinema
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {cinema}
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="mb-4">
          <h3 className="text-gray-400">Select Language</h3>
          <div className="flex gap-2 mt-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-lg ${
                  selectedLanguage === lang
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Notice Section */}
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="font-bold text-yellow-300">Please Note</h3>
          <p className="text-gray-300">
            Tickets are required for all admissions. No entry for children under 2.5 feet.
          </p>
          <hr className="my-2 border-gray-500" />
          <h3 className="text-yellow-300 font-bold">सूचना</h3>
          <p className="text-gray-300">
            बुढ़ा देखि बालक सम्म सबै दर्शकहरुलाई सिनेमा हेर्न तोकिएको टिकट दर लागु हुनेछ । २.५ फिट भन्दा
            मुनीको बालबालिकालाई सिनेमा घर भित्र प्रवेश निषेध गरिएको छ।
          </p>
        </div>
      </div>
    </div>
  );
};

export default NowShowingMovie;
