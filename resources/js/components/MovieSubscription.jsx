import React, { useState, useEffect } from 'react';

const MovieSubscription = ({ id }) => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const options = { 
          method: 'GET', 
          headers: { 
            accept: 'application/json'
          }
        };
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=cac949cc68cd8bd8d6110b32bf991cd0`, options);
        const data = await response.json();
        
        console.log('APIレスポンス:', data);
        setInfo(data); // data.results ではなく data を設定
      } catch (error) {
        console.error('データの取得に失敗', error);
      }
    };
    fetchInfo(); 
  }, [id]);

  const providers = info?.results?.JP?.flatrate || [];

  console.log(id);
  console.log(providers);
  
  return (
    <div>
      {providers.length > 0 ? (
        <div className='flex gap-2'>
          {providers.map((provider) => (
            <div key={provider.provider_id} className="text-black">
              <img
                src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                alt={provider.provider_name}
                className="rounded"
              />
             
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MovieSubscription;