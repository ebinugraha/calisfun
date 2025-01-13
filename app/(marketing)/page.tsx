// components/HeroSection.js
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MarketingPage = () => {
  return (
    <div className=" bg-white">
      <div className="mx-auto max-w-7xl pt-16 sm:pt-24">
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-xl font-bold tracking-tight text-black sm:text-5xl md:text-4xl">
                    <span className="sm:text-5xl md:text-4xl">Buka</span>{" "}
                    Kesenangan Dengan Membaca, menulis, dan menghitung dengan
                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
                      {" "}
                      Calisfun
                    </span>
                    <br />
                  </h1>
                </div>
                <p className="text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Buat belajar menjadi aktivitas yang menyenangkan dan penuh
                  kegembiraan. Anak-anak akan menikmati setiap momen saat mereka
                  belajar membaca, menulis, dan berhitung.
                </p>
              </div>
              <Button variant={"primary"} className="w-full">
                Ayo Bermain 
                <Gamepad2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center w-full col-span-6">
            <div className="px-6 h-96 lg:h-100% w-full max-w-2xl col-span-6 flex items-center mx-auto">
              <div style={{ width: "100%", height: "100%" }}>
                <div style={{ width: "100%", height: "100%" }}>
                  <Image
                    src="/imageHero.svg"
                    alt="logo"
                    width={400}
                    height={400}
                    className="max-w-80 mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;
