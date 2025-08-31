// src/components/VideoSlider.tsx

"use client";

import { useState } from "react";

const videos = [
	{ id: 1, url: "video1.mp4", thumbnail: "videoframe_0.png" },
	{ id: 2, url: "video2.mp4", thumbnail: "videoframe1.png" },
	{ id: 3, url: "video3.mp4", thumbnail: "videoframe2.png" },
	{ id: 4, url: "video4.mp4", thumbnail: "videoframe3.png" },
];

export default function VideoSlider() {
	const [mainVideo, setMainVideo] = useState(videos[0]);

	return (
		<div className="flex flex-col items-center">
			{/* حاوية الفيديوهات المصغرة */}
			<div className="mb-4 flex flex-row-reverse justify-center gap-2">
				{videos.map((video) => (
					<div
						key={video.id}
						className={`relative h-16 w-16 cursor-pointer overflow-hidden rounded-full shadow-md transition-all duration-300 ${
							mainVideo.id === video.id
								? "ring-2 ring-green-500 ring-offset-2"
								: ""
						}`}
						onClick={() => setMainVideo(video)}
					>
						<img
							src={video.thumbnail}
							alt={`Thumbnail ${video.id}`}
							className="h-full w-full object-cover"
						/>
					</div>
				))}
			</div>

			{/* حاوية الفيديو الرئيسية والأسهم */}
			<div className="relative w-full">
				<video
					key={mainVideo.id} // مفتاح لإعادة تحميل الفيديو عند التغيير
					controls
					poster={mainVideo.thumbnail}
					className="aspect-video w-full rounded-lg shadow-md"
				>
					<source src={mainVideo.url} type="video/mp4" />
					Your browser does not support the video tag.
				</video>

				{/* سهم التنقل الأيسر */}
				<button
					className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all duration-300 hover:scale-110"
					onClick={() => {
						const currentIndex = videos.findIndex((v) => v.id === mainVideo.id);
						const prevIndex = (currentIndex + 1) % videos.length;
						setMainVideo(videos[prevIndex]);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-gray-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>

				{/* سهم التنقل الأيمن */}
				<button
					className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all duration-300 hover:scale-110"
					onClick={() => {
						const currentIndex = videos.findIndex((v) => v.id === mainVideo.id);
						const nextIndex =
							(currentIndex - 1 + videos.length) % videos.length;
						setMainVideo(videos[nextIndex]);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-gray-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
