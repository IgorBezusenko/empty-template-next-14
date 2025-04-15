import LanguageChanger from "@/components/LanguageChanger/LanguageChanger";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <div className='z-10 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)]'>
        <div className='w-full bg-white'>
          <div className='container flex h-12 w-full items-center justify-between py-2.5 md:py-2'>
            <Link href='/'>imglogo</Link>
            <div className='flex items-center justify-between gap-6 text-black'>
              <LanguageChanger />
            </div>
          </div>
        </div>

        <div className='h-[3px] w-full bg-gradient-to-r from-[#48E9FF] from-[3%] via-[#29ADEB] via-30% to-[#21C964] to-90%' />
      </div>
      <div className='container'>Navbar</div>
    </>
  );
};
