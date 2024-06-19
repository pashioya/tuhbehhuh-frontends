import {Footer} from "flowbite-react";

export function BottomFooter() {
	return (
		<Footer container>
			<div className="w-64 md:block hidden"></div>

			<Footer.Copyright href="#" by="Tuh-Beh-Huh. KdG Hogeschool™" year={2023}/>
			<Footer.LinkGroup>
				<Footer.Link href="#">Documentation</Footer.Link>
				<Footer.Link href="#">Github</Footer.Link>
			</Footer.LinkGroup>
		</Footer>
	);
}