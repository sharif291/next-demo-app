import Link from "next/link";

export default function HomePage() {
  return (
    <div id="home">
      <div className='coming-soon'>
        <video width="w-full" controls={false} autoPlay muted loop>
          <source src="/videos/coming-soon.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <p>
        <Link href="/articles">Read out my latest article v1.3</Link>
      </p>

    </div>
  );
}