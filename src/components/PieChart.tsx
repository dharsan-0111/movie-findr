// import { PieChartData } from "@/interfaces/movie-data_interface";
// import React, { useState, useEffect } from "react";

// interface PieChartProps {
//   data: PieChartData[];
//   strokeColor?: string;
//   strokeWidth?: number;
// }

// const PieChart: React.FC<PieChartProps> = ({
//   data,
//   strokeColor = "#fff",
//   strokeWidth = 1,
// }) => {
//   const [radius, setRadius] = useState(120); // Default radius
//   const total = data.length; // Total number of items
//   let cumulativeAngle = 0; // Track the cumulative angle for each segment

//   const center = radius; // Center of the circle

//   // Update radius dynamically based on screen width
//   useEffect(() => {
//     const updateRadius = () => {
//       const newRadius = Math.min(window.innerWidth, window.innerHeight) / 4; // Adjust based on screen size
//       console.log(newRadius, 'newRadius')
//       setRadius(newRadius > 50 ? newRadius : 50); // Minimum radius of 50
//     };

//     updateRadius(); // Initial calculation
//     window.addEventListener("resize", updateRadius); // Listen for resize events

//     return () => window.removeEventListener("resize", updateRadius); // Cleanup listener
//   }, []);

//   return (
//     <svg
//       width={radius * 2}
//       height={radius * 2}
//       viewBox={`0 0 ${radius * 2} ${radius * 2}`}
//     >
//       {data.map((item, index) => {
//         const valuePercentage = 1 / total; // Each segment is an equal portion
//         const angle = valuePercentage * 360;

//         // Calculate start and end points using polar coordinates
//         const startX =
//           center + radius * Math.cos((cumulativeAngle * Math.PI) / 180);
//         const startY =
//           center + radius * Math.sin((cumulativeAngle * Math.PI) / 180);
//         cumulativeAngle += angle;
//         const endX =
//           center + radius * Math.cos((cumulativeAngle * Math.PI) / 180);
//         const endY =
//           center + radius * Math.sin((cumulativeAngle * Math.PI) / 180);

//         // Calculate the midpoint angle for the label
//         const midAngle = cumulativeAngle - angle / 2;

//         // Set a fixed distance for all labels
//         const labelRadius = radius * 0.6; // 60% of the radius for consistent distance
//         const labelX =
//           center + labelRadius * Math.cos((midAngle * Math.PI) / 180);
//         const labelY =
//           center + labelRadius * Math.sin((midAngle * Math.PI) / 180);

//         // Large arc flag (1 if the angle is greater than 180)
//         const largeArcFlag = angle > 180 ? 1 : 0;

//         // Path definition for the segment
//         const pathData = `
//             M ${center} ${center}
//             L ${startX} ${startY}
//             A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
//             Z
//           `;

//         // Split label into multiple lines without breaking words
//         const maxCharsPerLine = 25; // Maximum characters per line
//         const labelWords = item.label.split(" ");
//         const labelParts: string[] = [];
//         let currentLine = "";

//         labelWords.forEach((word) => {
//           if ((currentLine + word).length <= maxCharsPerLine) {
//             currentLine += (currentLine ? " " : "") + word;
//           } else {
//             labelParts.push(currentLine);
//             currentLine = word;
//           }
//         });
//         if (currentLine) labelParts.push(currentLine);

//         // Calculate rotation transform for the label
//         const rotationAngle = midAngle < 180 ? midAngle : midAngle - 360; // Keep rotation within -180 to 180
//         console.log(item.poster_path, 'item.poster_path')
//         const posterUrl = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;

//         return (
//           <g key={index}>
//             <path
//               d={pathData}
//               fill={item.color || `hsl(${(index * 360) / data.length}, 70%, 50%)`}
//               stroke={strokeColor}
//               strokeWidth={strokeWidth}
//             />

//             <image
//               href={posterUrl}
//               x={center - radius / 2}
//               y={center - radius / 2}
//               width={radius}
//               height={radius}
//               opacity="0.3"
//             />

//             {/* <text
//               x={labelX}
//               y={labelY}
//               className="hidden sm:block"
//               fill="#000"
//               textAnchor="middle"
//               alignmentBaseline="middle"
//               transform={`rotate(${rotationAngle}, ${labelX}, ${labelY})`}
//             >
//               {labelParts.map((part, i) => (
//                 <tspan
//                   fontSize={12}
//                   color="#000"
//                   fontWeight={"semi-bold"}
//                   key={i}
//                   x={labelX} // Ensure text stays at the rotated position
//                   dy={i === 0 ? "0" : "1.2em"} // Offset for each line
//                 >
//                   {part}
//                 </tspan>
//               ))}
//             </text> */}
//           </g>
//         );
//       })}
//     </svg>
//   );
// };

// export default PieChart;

import { PieChartData } from "@/interfaces/movie-data_interface";
import React, { useState, useEffect } from "react";

interface PieChartProps {
  data: PieChartData[];
  strokeColor?: string;
  strokeWidth?: number;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  strokeColor = "#fff",
  strokeWidth = 1,
}) => {
  const [radius, setRadius] = useState(120); // Default radius
  const total = data.length; // Total number of items
  let cumulativeAngle = 0; // Track the cumulative angle for each segment

  const center = radius; // Center of the circle

  // Update radius dynamically based on screen width
  useEffect(() => {
    const updateRadius = () => {
      const newRadius = Math.min(window.innerWidth, window.innerHeight) / 4; // Adjust based on screen size
      setRadius(newRadius > 50 ? newRadius : 50); // Minimum radius of 50
    };

    updateRadius(); // Initial calculation
    window.addEventListener("resize", updateRadius); // Listen for resize events

    return () => window.removeEventListener("resize", updateRadius); // Cleanup listener
  }, []);

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
    >
      {data.map((item, index) => {
        const valuePercentage = 1 / total; // Each segment is an equal portion
        const angle = valuePercentage * 360;

        // Calculate start and end points using polar coordinates
        const startX =
          center + radius * Math.cos((cumulativeAngle * Math.PI) / 180);
        const startY =
          center + radius * Math.sin((cumulativeAngle * Math.PI) / 180);
        cumulativeAngle += angle;
        const endX =
          center + radius * Math.cos((cumulativeAngle * Math.PI) / 180);
        const endY =
          center + radius * Math.sin((cumulativeAngle * Math.PI) / 180);

        // Path definition for the segment
        const pathData = `
            M ${center} ${center}
            L ${startX} ${startY}
            A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${endX} ${endY}
            Z
          `;

        // Calculate rotation for image clipping
        const midAngle = cumulativeAngle - angle / 2;
        const clipId = `clip-path-${index}`;

        // Poster URL
        const posterUrl = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;

        return (
          <g key={index}>
            {/* Clip Path for Image */}
            <defs>
              <clipPath id={clipId}>
                <path d={pathData} />
              </clipPath>
            </defs>

            {/* Pie segment */}
            <path
              d={pathData}
              //   fill={item.color || `hsl(${(index * 360) / data.length}, 70%, 50%)`}
              fill="transparent"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />

            {/* Image placed inside each pie segment using clipping */}
            <image
              href={posterUrl}
              x={center - radius}
              y={center - radius}
              width={radius * 2}
              height={radius * 2}
              clipPath={`url(#${clipId})`}
              opacity="0.6" // Optional: Adjust the opacity of the image for effect
              preserveAspectRatio="xMidYMid slice" // Ensure the image covers the section entirely
            />
          </g>
        );
      })}
    </svg>
  );
};

export default PieChart;
