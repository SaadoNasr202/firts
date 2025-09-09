"use client";

import { UploadButton } from "@/components/uploadthing";

interface ClientUploadButtonProps {
	endpoint: string;
	onClientUploadComplete: (res: any) => void;
	onUploadError: (error: Error) => void;
}

export default function ClientUploadButton({
	endpoint,
	onClientUploadComplete,
	onUploadError,
}: ClientUploadButtonProps) {
	return (
		<div className="mt-2">
			<UploadButton
				endpoint={endpoint}
				onClientUploadComplete={onClientUploadComplete}
				onUploadError={onUploadError}
			/>
		</div>
	);
}
