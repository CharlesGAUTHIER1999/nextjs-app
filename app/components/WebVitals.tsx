"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
    useReportWebVitals((metric) => {
        console.log(`[Web Vital] ${metric.name}:`, {
            value: Math.round(
                metric.name === "CLS" ? metric.value * 1000 : metric.value,
            ),
            rating: metric.rating,
            navigationType: metric.navigationType,
        });
        console.log("All metric details", metric);
    });

    return null;
}