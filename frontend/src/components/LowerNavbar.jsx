import React, { useState } from "react";
import useFetchData from "../customHook/customHook";

function LowerNavbar() {
  const [cinema, setCinema] = useState({ id: "", name: "" });
  const [movie, setMovie] = useState({ id: "", name: "" });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { data: cinemas } = useFetchData("cinema/allcinema");

  const { data: cinemaData, loading, error } = useFetchData(
    cinema.id ? `cinema/${cinema.id}` : null
  );

  const handleCinemaChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setCinema({ id: e.target.value, name: selectedOption.text });
    setMovie({ id: "", name: "" });
    setDate("");
    setTime("");
  };

  const handleMovieChange = (e) => {
    const selectedMovieId = e.target.value;
    const selectedMovie = cinemaData?.cinema?.schedule
      ?.find((schedule) => schedule.movieId._id === selectedMovieId)
      ?.movieId;
    
    if (selectedMovie) {
      setMovie({ id: selectedMovie._id, name: selectedMovie.name });
      setDate("");
      setTime("");
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setTime("");
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const availableDates = movie.id
    ? cinemaData?.cinema?.schedule
        ?.find((schedule) => schedule.movieId._id === movie.id)
        ?.showtimes.map((showtime) => showtime.day)
    : [];

  const availableTimes =
    movie.id && date
      ? cinemaData?.cinema?.schedule
          ?.find((schedule) => schedule.movieId._id === movie.id)
          ?.showtimes.find((showtime) => showtime.day === date)?.times
      : [];

  return (
    <div>
      <select value={cinema.id} onChange={handleCinemaChange}>
        <option value="">Select Cinema</option>
        {cinemas?.map(({ name, _id }) => (
          <option key={_id} value={_id}>
            {name}
          </option>
        ))}
      </select>

      <select
        value={movie.id}
        onChange={handleMovieChange}
        disabled={!cinema.id || loading}
      >
        <option value="">Select Movie</option>
        {cinemaData?.cinema?.schedule?.map(({ movieId }) => (
          <option key={movieId._id} value={movieId._id}>
            {movieId.name}
          </option>
        ))}
      </select>

      <select
        value={date}
        onChange={handleDateChange}
        disabled={!movie.id}
      >
        <option value="">Select Date</option>
        {availableDates?.map((day, index) => (
          <option key={index} value={day}>
            {day}
          </option>
        ))}
      </select>

      <select
        value={time}
        onChange={handleTimeChange}
        disabled={!date}
      >
        <option value="">Select Time</option>
        {availableTimes?.map((timeOption, index) => (
          <option key={index} value={timeOption}>
            {timeOption}
          </option>
        ))}
      </select>

      {cinema.id && movie.id && date && time && (
        <div className="p-2 border rounded mt-4">
          <h4>Selected:</h4>
          <p>Cinema: {cinema.name}</p>
          <p>Movie: {movie.name}</p>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
        </div>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default LowerNavbar;
