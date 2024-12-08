import React, { useState } from 'react';
import LocationTracker from './LocationTracker';

const AttendanceForm = () => {
  const [isLocationVerified, setIsLocationVerified] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  // College location for Sreenidhi Institute of Science and Technology
  const collegeLocation = {
    latitude: 13.072204074042398,
    longitude: 77.50754474895987
  };

  const handleLocationVerification = (verified, location) => {
    setIsLocationVerified(verified);
    setCurrentLocation(location);
  };

  const handleAttendanceSubmit = async () => {
    if (!isLocationVerified) {
      alert("You must be within 500 meters of the college to mark attendance!");
      return;
    }

    try {
      // TODO: Implement actual backend API call to record attendance
      const response = await fetch('/api/attendance/mark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'current_user_id', // Replace with actual user authentication
          timestamp: new Date().toISOString(),
          location: {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude
          }
        })
      });

      if (response.ok) {
        setAttendanceMarked(true);
        alert("Attendance marked successfully within college premises!");
      }
    } catch (error) {
      console.error("Error marking attendance", error);
      alert("Failed to mark attendance. Please try again.");
    }
  };

  return (
    <div>
      <h2>Attendance Marking</h2>
      <LocationTracker 
        collegeLocation={collegeLocation}
        onLocationVerified={handleLocationVerification}
      />
      
      <button 
        onClick={handleAttendanceSubmit}
        disabled={!isLocationVerified}
      >
        Mark Attendance
      </button>

      {attendanceMarked && (
        <p>Attendance marked for today!</p>
      )}
    </div>
  );
};

export default AttendanceForm;
