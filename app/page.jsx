import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const communities = [
    {
      id: 104,
      title: 'Soccer & Futsal Room',
      description:
        'Ruang untuk para pecinta sepakbola dalam dan luar negeri, berkumpul, berdiskusi dan berbagi informasi.',
      imgUrl: 'https://s.kaskus.id//ficon/image-104.png',
    },
    {
      id: 539,
      title: 'Badminton',
      description:
        'Tempat diskusi khusus pencinta olahraga badminton atau bulutangkis.',
      imgUrl: 'https://s.kaskus.id//ficon/image-539.png',
    },
    {
      id: 440,
      title: 'Basketball',
      description: 'Tempat diskusi para pecinta basket.',
      imgUrl: 'https://s.kaskus.id//ficon/image-440.png',
    },
  ];

  return (
    <section className='home w-full fx fx-col fx-rgap-xl'>
      {communities.map((item) => (
        <Link
          key={item.id}
          className='fx fx-cgap-lg p-xl black'
          style={{ background: '#fff', borderRadius: 8 }}
          href={`/komunitas/${item.id}`}
        >
          <Image
            src={item.imgUrl}
            alt={item.imgUrl}
            width={36}
            height={36}
            loading='lazy'
            style={{
              objectFit: 'cover',
              borderRadius: 6,
            }}
          />
          <section className='fx fx-col fx-rgap-md'>
            <h1>{item.title}</h1>
            <p className='txt-sm gray-steel'>{item.description}</p>
          </section>
        </Link>
      ))}
    </section>
  );
}
