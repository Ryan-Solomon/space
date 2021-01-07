import { useEffect, useState } from 'react';
import './HomeScreen.scss';

const apiKey = process.env.REACT_APP_API_KEY;

type TPhotoOfDayObj = {
  date: string;
  explanation: string;
  hdurl: string;
  title: string;
};
type TStatus = 'IDLE' | 'PENDING' | 'REJECTED' | 'FULFILLED';
export const HomeScreen = () => {
  const [photoObj, setPhotoObj] = useState<null | TPhotoOfDayObj>(null);
  const [status, setStatus] = useState<TStatus>('IDLE');
  useEffect(() => {
    const getNasaImgOfDay = async () => {
      try {
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        );
        const data = await res.json();
        setPhotoObj(data);
      } catch {}
    };
    getNasaImgOfDay();
  }, []);

  console.log(photoObj);
  if (status === 'PENDING') return <h1>Getting an awesome photo from NASA</h1>;
  if (status === 'REJECTED' || !photoObj) return <h1>Something went wrong</h1>;

  const { date, explanation, hdurl, title } = photoObj;

  return (
    <div style={{ backgroundImage: `url(${hdurl})` }} className='home-screen'>
      <h1>Home</h1>
    </div>
  );
};
