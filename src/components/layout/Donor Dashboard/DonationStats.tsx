"use client";

import { useEffect, useRef } from "react";

export default function DonationStats() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Data for the chart
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const donations = [2, 3, 1, 4, 2, 5, 3, 6, 4, 8, 10, 12];
    const applicants = [5, 8, 3, 10, 5, 12, 8, 15, 10, 20, 24, 30];

    // Chart configuration
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const maxValue = Math.max(...applicants) * 1.2;
    const barWidth = chartWidth / months.length / 3;
    const barSpacing = barWidth / 2;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.strokeStyle = "hsl(var(--border))";
    ctx.stroke();

    // Draw grid lines
    const gridLines = 5;
    ctx.textAlign = "right";
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "hsl(var(--muted-foreground))";

    for (let i = 0; i <= gridLines; i++) {
      const y = canvas.height - padding - (i * chartHeight) / gridLines;
      const value = Math.round((i * maxValue) / gridLines);

      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.strokeStyle = "hsl(var(--border) / 0.3)";
      ctx.stroke();

      ctx.fillText(value.toString(), padding - 5, y + 3);
    }

    // Draw month labels
    ctx.textAlign = "center";
    months.forEach((month, i) => {
      const x =
        padding +
        (i * chartWidth) / months.length +
        chartWidth / months.length / 2;
      ctx.fillText(month, x, canvas.height - padding + 15);
    });

    // Draw legend
    const legendX = canvas.width - padding - 100;
    const legendY = padding + 20;

    // Donations legend
    ctx.fillStyle = "hsl(var(--chart-1))";
    ctx.fillRect(legendX, legendY, 15, 10);
    ctx.fillStyle = "hsl(var(--foreground))";
    ctx.textAlign = "left";
    ctx.fillText("Donations", legendX + 20, legendY + 8);

    // Applicants legend
    ctx.fillStyle = "hsl(var(--chart-2))";
    ctx.fillRect(legendX, legendY + 20, 15, 10);
    ctx.fillStyle = "hsl(var(--foreground))";
    ctx.fillText("Applicants", legendX + 20, legendY + 28);

    // Draw bars
    months.forEach((_, i) => {
      const x1 = padding + (i * chartWidth) / months.length + barSpacing;
      const x2 = x1 + barWidth + barSpacing;

      // Donation bars
      const donationHeight = (donations[i] / maxValue) * chartHeight;
      ctx.fillStyle = "hsl(var(--chart-1))";
      ctx.fillRect(
        x1,
        canvas.height - padding - donationHeight,
        barWidth,
        donationHeight
      );

      // Applicant bars
      const applicantHeight = (applicants[i] / maxValue) * chartHeight;
      ctx.fillStyle = "hsl(var(--chart-2))";
      ctx.fillRect(
        x2,
        canvas.height - padding - applicantHeight,
        barWidth,
        applicantHeight
      );
    });
  }, []);

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
}
