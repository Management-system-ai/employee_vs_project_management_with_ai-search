import Image from 'next/image';
import ProfileIcon from '../resources/images/icons/icon profile.png';
export default function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-gray-100 px-6 py-4">
      <div>
        <p className="text-[32px] font-bold text-[#212F3F]">
          Hello, Anna Belle
        </p>
        <p className="text-[18px] font-normal">
          Here’s the current status for today
        </p>
      </div>
      <div className="flex items-center">
        <Image src={ProfileIcon} alt="profile" height={40} width={40}></Image>
      </div>
    </header>
  );
}
