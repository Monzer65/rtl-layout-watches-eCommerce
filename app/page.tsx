import Link from "next/link";

export default function Home() {
  return (
    <main className='flex items-center justify-center gap-4 min-h-screen'>
      <Link
        href={"/store"}
        className='border px-2 py-1 rounded-md hover:bg-gray-50'
      >
        فروشگاه
      </Link>
      <Link
        href={"/blog"}
        className='border px-2 py-1 rounded-md hover:bg-gray-50'
      >
        وبلاگ
      </Link>
    </main>
  );
}
