"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Graph() {
  const canvasEl: any = useRef(null);

  const colors = {
    blue: {
      default: "rgba(54, 162, 235, 1)",
      half: "rgba(54, 162, 235, 0.5)",
      quarter: "rgba(54, 162, 235, 0.25)",
      zero: "rgba(54, 162, 235, 0)",
    },
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d") as any;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, colors.blue.half);
    gradient.addColorStop(0.65, colors.blue.quarter);
    gradient.addColorStop(1, colors.blue.zero);

    const times = ["10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"];
    const twiddleData = [2, 3.5, 4, 3, 5, 3.8, 2.5];

    const data = {
      labels: times,
      datasets: [
        {
          backgroundColor: gradient,
          label: "Twiddle Working (units)",
          data: twiddleData,
          fill: true,
          borderWidth: 2,
          borderColor: colors.blue.default,
          lineTension: 0.3,
          pointBackgroundColor: colors.blue.default,
          pointRadius: 4,
        },
      ],
    };

    const config: any = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Twiddle Working (units)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Time of Day",
            },
          },
        },
      },
    };

    const myLineChart = new Chart(ctx, config);

    return () => {
      myLineChart.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full shadow-md rounded-lg flex items-center justify-center">
      <canvas ref={canvasEl} height="100" />
    </div>
  );
}
