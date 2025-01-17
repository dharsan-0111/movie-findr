import React, { useState } from "react";
import PieChart from "./PieChart";
import { PieChartData } from "@/interfaces/movie-data_interface";
import { useRouter } from "next/navigation";

const SpinningWheel: React.FC<{ data: PieChartData[] }> = ({ data }) => {

    const router = useRouter();

  const [rotation, setRotation] = useState<number>(0); // Rotation angle
  const [winningIndex, setWinningIndex] = useState<number | null>(null); // Store winning index
  const [isSpinning, setIsSpinning] = useState<boolean>(false); // Track if the wheel is spinning

  const numberOfSegments = data.length; // Number of segments in your PieChart

  const handleSpin = () => {
    if (isSpinning) return; // Prevent spin while already spinning
    let winningSegment: number = 0;

    // Set isSpinning to true when spin starts
    setIsSpinning(true);

    // Calculate a random angle for the final rotation (adding multiple full spins)
    const randomRotation = Math.floor(Math.random() * 360) + 3600; // At least 10 full rotations (3600 + random angle)

    setRotation((prevRotation) => {
      // Determine the final angle after the spin
      const finalAngle = prevRotation + randomRotation;

      // Calculate the winning index based on the final angle
      const anglePerSegment = 360 / numberOfSegments;
      const finalAngleInRange = finalAngle % 360; // Normalize to 0-359 degrees
      winningSegment = Math.floor(finalAngleInRange / anglePerSegment);

      // Set the winning index
      setWinningIndex(winningSegment);

      return finalAngle;
    });

    // Set isSpinning to false after the transition duration (3 seconds)
    setTimeout(() => {
      setIsSpinning(false);
        router.push(`/${data[winningSegment]?.value}`);
    }, 3000); // Match the transition time duration
  };

  return (
    <div>
      <div className="relative w-fit">
        <div
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 3s ease-out", // Keep the same duration for consistent speed
          }}
        >
          <PieChart data={data} />
        </div>
        <button
          onClick={handleSpin}
          className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-white border-4 border-gray-800 rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold shadow-lg hover:bg-gray-200 transition-transform duration-300 ease-in-out"
          disabled={isSpinning} // Disable the button while spinning
        >
          Spin
        </button>
      </div>

      {/* Display Winning Segment only when not spinning */}
      {!isSpinning && winningIndex !== null && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">Winning Segment: {data[winningIndex].label}</p>
        </div>
      )}
    </div>
  );
};

export default SpinningWheel;
