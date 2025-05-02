"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  waveWidth = 50,
  blur = 10,
  speed = "slow",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  waveWidth?: number;
  blur?: number;
  speed?: "slow" | "medium" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const { theme } = useTheme();
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSafari] = useState(
    typeof window !== "undefined" &&
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  );

  const colors =
    theme === "dark"
      ? [
          "oklch(0.488 0.243 264.376)",
          "oklch(0.696 0.17 162.48)",
          "oklch(0.769 0.188 70.08)",
          "oklch(0.627 0.265 303.9)",
          "oklch(0.645 0.246 16.439)",
        ]
      : [
          "oklch(0.646 0.222 41.116)",
          "oklch(0.6 0.118 184.704)",
          "oklch(0.398 0.07 227.392)",
          "oklch(0.828 0.189 84.429)",
          "oklch(0.769 0.188 70.08)",
        ];

  const backgroundFill =
    theme === "dark" ? "oklch(0.129 0.042 264.695)" : "oklch(1 0 0)";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const render = (nt: number) => {
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);

      colors.forEach((color, i) => {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = color;
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
      });

      animationId = requestAnimationFrame(() =>
        render(
          nt + (speed === "fast" ? 0.002 : speed === "slow" ? 0.0005 : 0.001)
        )
      );
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    render(0);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme, colors, backgroundFill, waveOpacity, waveWidth, speed, noise]);
  return (
    <div
      className={cn("relative w-full", containerClassName)}
      style={{ height: "100vh" }}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 w-full h-full pointer-events-none" // Disable interaction
        style={{
          filter: isSafari ? `blur(${blur}px)` : undefined,
        }}
      />
      <div
        className={cn("relative z-10 h-full overflow-y-auto", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
