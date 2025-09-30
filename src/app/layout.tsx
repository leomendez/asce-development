import "./globals.css";
import { Roboto } from "next/font/google";
import { Footer, Navbar } from "@/components";
import { Metadata } from "next";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asce Development",
  description: "Leo Mendez software developer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          roboto.className +
          " bg-slate-800 text-slate-300 transition-all h-full w-full  flex justify-center"
        }
      >
        <div className="relative flex flex-col justify-between h-full lg:w-[1200px] w-full overflow--hidden">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
