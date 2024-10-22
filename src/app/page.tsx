// import Image from 'next/image';

import UsersPage from '@/components/Users';
import YouTubeVideos from '@/components/YoutubeVideos';

export default function Home() {
  return (
    <h1>
      <UsersPage />
      <YouTubeVideos />
    </h1>
  );
}
