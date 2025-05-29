'use client';

import dynamic from 'next/dynamic';
import { usePhotoStore } from '../store/usePhotoStore';

const WebCam = dynamic(() => import('../components/WebCam'), { ssr: false });

export default function Home() {
  const image = usePhotoStore((state) => state.image);
  const capture = usePhotoStore((state) => state.capture);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <WebCam width={500} height={500} />

      <button
        onClick={() => capture?.()}
        className="mt-4 border px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Prendre une photo (depuis Home)
      </button>

      {image && (
        <img
          src={image}
          alt="Image utilisateur"
          className="mt-4 border rounded-lg w-48 h-48 object-cover"
        />
      )}
    </main>
  );
}
