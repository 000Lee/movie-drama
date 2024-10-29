//서버한테 같이 전달하는 포스트잇 같은 느낌

const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTAwYTZjMTI3YWYzNTI5MDc4N2FjOGE5ZWY1ZGRiMSIsIm5iZiI6MTczMDA3NjAzOS44ODE4MTgsInN1YiI6IjY3MWIwYjNkYjNkNWNiYjg0MmYzZmNjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qnrxmbQQi0pAubMNr6A1njgbCFpg3AnC46ew2CdGjyE',
   },
}

const url = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'

const getPlayingDramas = async (url) => {
   try {
      const response = await fetch(url, options)
      // console.log(response)
      const data = await response.json()
      const results = data.results
      const container = document.querySelector('main .container')
      let rowsHtml = ''
      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = '<div class="row">'
         for (let j = 0; j < 4; j++) {
            const index = i + j
            if (index >= results.length) break
            const drama = results[index]
            rowHtml += `<div class="col-sm-6 p-3">
                     <div class="card">
                        <a href="./dramadetail.html?drama_id=${drama.id}">
                           <img src="https://image.tmdb.org/t/p/w500${drama.poster_path}" class="card-img-top poster" alt="${drama.original_name}"/>
                        </a>
                        <div class="card-body">
                           <p class="card-text title">${drama.original_name}</p>
                           <p class="card-text short" style="white-space: nowrap;
   overflow: hidden; 
   text-overflow: ellipsis;">${
      drama.overview ||
      `<span style="font-size: small;
color: gray;">줄거리 정보가 없습니다</span>`
   }</p>
                           <p class="card-text average">${drama.vote_average.toFixed(1)}</p>
                        </div>
                     </div>
                  </div>`
         }
         rowHtml += '</div>'
         rowsHtml += rowHtml
      }
      container.innerHTML = rowsHtml
   } catch (error) {
      console.log('에러 발생:', error)
   }
}
getPlayingDramas(url)
