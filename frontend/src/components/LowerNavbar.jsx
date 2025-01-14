import React, { useState } from "react";

function LowerNavbar() {
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [isCinemaOpen, setIsCinemaOpen] = useState(false);
  const [isMovieOpen, setIsMovieOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const cinemas = ["Cinema 1", "Cinema 2", "Cinema 3"];
  const movies = ["Movie 1", "Movie 2", "Movie 3"];
  const dates = ["Jan 15", "Jan 16", "Jan 17"];
  const times = ["10:00 AM", "1:00 PM", "4:00 PM"];

  const isButtonDisabled =
    !selectedCinema || !selectedMovie || !selectedDate || !selectedTime;

  return (
    <div className="flex gap-x-6 items-center">
      {/* Cinema Dropdown */}
      <div className="relative w-32">
        <input
          type="text"
          className="w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm"
          placeholder="Select Cinema"
          value={selectedCinema}
          onClick={() => setIsCinemaOpen(!isCinemaOpen)}
          readOnly
        />
        {isCinemaOpen && (
          <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
            {cinemas.map((cinema, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => {
                  setSelectedCinema(cinema);
                  setIsCinemaOpen(false);
                }}
              >
                {cinema}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Movie Dropdown */}
      <div className="relative w-32">
        <input
          type="text"
          className={`w-full px-4 py-1 border ${
            selectedCinema
              ? "border-gray-300"
              : "border-gray-200 bg-gray-100 cursor-not-allowed"
          } rounded-md shadow-sm`}
          placeholder="Select Movie"
          value={selectedMovie}
          onClick={() => selectedCinema && setIsMovieOpen(!isMovieOpen)}
          readOnly
          disabled={!selectedCinema}
        />
        {isMovieOpen && selectedCinema && (
          <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
            {movies.map((movie, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => {
                  setSelectedMovie(movie);
                  setIsMovieOpen(false);
                }}
              >
                {movie}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Date Dropdown */}
      <div className="relative w-32">
        <input
          type="text"
          className={`w-full px-4 py-1 border ${
            selectedMovie
              ? "border-gray-300"
              : "border-gray-200 bg-gray-100 cursor-not-allowed"
          } rounded-md shadow-sm`}
          placeholder="Select Date"
          value={selectedDate}
          onClick={() => selectedMovie && setIsDateOpen(!isDateOpen)}
          readOnly
          disabled={!selectedMovie}
        />
        {isDateOpen && selectedMovie && (
          <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
            {dates.map((date, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => {
                  setSelectedDate(date);
                  setIsDateOpen(false);
                }}
              >
                {date}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Time Dropdown */}
      <div className="relative w-32">
        <input
          type="text"
          className={`w-full px-4 py-1 border ${
            selectedDate
              ? "border-gray-300"
              : "border-gray-200 bg-gray-100 cursor-not-allowed"
          } rounded-md shadow-sm`}
          placeholder="Select Time"
          value={selectedTime}
          onClick={() => selectedDate && setIsTimeOpen(!isTimeOpen)}
          readOnly
          disabled={!selectedDate}
        />
        {isTimeOpen && selectedDate && (
          <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
            {times.map((time, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => {
                  setSelectedTime(time);
                  setIsTimeOpen(false);
                }}
              >
                {time}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`text-white font-medium rounded-lg text-sm px-4 py-2 ${
          isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
        }`}
        disabled={isButtonDisabled}
      >
        Sign In
      </button>
    </div>
  );
}

export default LowerNavbar;
