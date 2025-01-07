import Image from 'next/image';
import StarryBackground from '@/components/ui/StarryBackground';
import googleIcon from '@/public/google-icon.svg';
import { signinWithGoogle } from '@/utils/actions';

export default function LoginPage() {
  return (
    <main className="relative">
      <StarryBackground />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-black bg-opacity-50 backdrop-blur-sm">
        <button
          onClick={signinWithGoogle}
          className="flex items-center justify-center space-x-2 rounded-full bg-white px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <Image src={googleIcon} alt="Google logo" width={50} height={50} />
          <span>Sign in with Google</span>
        </button>
      </div>
    </main>
  );
}
