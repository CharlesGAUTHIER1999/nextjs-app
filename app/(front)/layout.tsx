import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function FrontLayout(props: LayoutProps<"/">) {
    return (
        <div className="flex min-h-screen flex-col">
            <Nav />
            <main className="flex-1">{props.children}</main>
            <Footer />
        </div>
    );
}
