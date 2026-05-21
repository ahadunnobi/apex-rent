"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CarSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card overflow-hidden">
          {/* Image placeholder */}
          <Skeleton
            height={208}
            borderRadius={0}
            baseColor="rgba(30, 30, 60, 0.8)"
            highlightColor="rgba(0, 240, 255, 0.08)"
          />
          {/* Content placeholder */}
          <div className="p-5">
            <Skeleton
              width="70%"
              height={24}
              borderRadius={8}
              baseColor="rgba(30, 30, 60, 0.8)"
              highlightColor="rgba(0, 240, 255, 0.08)"
            />
            <div className="flex gap-4 mt-3">
              <Skeleton
                width={60}
                height={16}
                borderRadius={8}
                baseColor="rgba(30, 30, 60, 0.8)"
                highlightColor="rgba(0, 240, 255, 0.08)"
              />
              <Skeleton
                width={60}
                height={16}
                borderRadius={8}
                baseColor="rgba(30, 30, 60, 0.8)"
                highlightColor="rgba(0, 240, 255, 0.08)"
              />
              <Skeleton
                width={60}
                height={16}
                borderRadius={8}
                baseColor="rgba(30, 30, 60, 0.8)"
                highlightColor="rgba(0, 240, 255, 0.08)"
              />
            </div>
            <div className="mt-3">
              <Skeleton
                count={2}
                height={14}
                borderRadius={8}
                baseColor="rgba(30, 30, 60, 0.8)"
                highlightColor="rgba(0, 240, 255, 0.08)"
              />
            </div>
            <div className="mt-4">
              <Skeleton
                height={40}
                borderRadius={8}
                baseColor="rgba(30, 30, 60, 0.8)"
                highlightColor="rgba(0, 240, 255, 0.08)"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
