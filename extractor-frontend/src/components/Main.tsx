import { ReactNode } from "react";

interface MainProps {
	smallSections?: ReactNode[] | null;
	mediumSections?: ReactNode[] | null;
	largeSections?: ReactNode[] | null;
}

export function Main({
	smallSections,
	mediumSections,
	largeSections,
}: MainProps) {
	return (
		<main className="p-4 md:ml-64 h-screen pt-20 dark:bg-gray-700 ">
			{largeSections?.map((section, index) => (
				<div
					key={`large-section-${index}`}
					className="border-2 rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4  overflow-y-scroll"
				>
					{section}
				</div>
			))}

			<div className="grid grid-cols-2 gap-4 mb-4">
				{mediumSections?.map((section, index) => (
					<div
						key={`large-section-${index}`}
						className="border-2  rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72 overflow-y-scroll"
					>
						{section}
					</div>
				))}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
				{smallSections?.map((section, index) => (
					<div
						key={`large-section-${index}`}
						className="border-2 border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64 overflow-y-scroll"
					>
						{section}
					</div>
				))}
			</div>
		</main>
	);
}
