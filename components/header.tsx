import Image from 'next/image';
import ProfileIcon from '../resources/images/icons/icon profile.png';
import { getUser } from '@/utils/user';
export default async function Header() {
  const user = await getUser();

  return (
    <header className="flex items-center justify-between border-b bg-gray-100 px-6 py-4">
      <div>
        <p className="text-[32px] font-bold text-[#212F3F]">
          Hello, {user?.user_metadata?.full_name}
        </p>
        <p className="text-[18px] font-normal">
          Here’s the current status for today
        </p>
      </div>
      <div className="flex items-center">
        <Image
          src={
            user?.user_metadata?.picture
              ? user.user_metadata.picture
              : ProfileIcon
          }
          alt="profile"
          height={50}
          width={50}
          className="rounded-full border-2 border-red-600 shadow-md transition-all duration-300 hover:border-blue-600"
        ></Image>
      </div>
    </header>
  );
}
