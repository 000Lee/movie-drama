const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTAwYTZjMTI3YWYzNTI5MDc4N2FjOGE5ZWY1ZGRiMSIsIm5iZiI6MTczMDA3NjAzOS44ODE4MTgsInN1YiI6IjY3MWIwYjNkYjNkNWNiYjg0MmYzZmNjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qnrxmbQQi0pAubMNr6A1njgbCFpg3AnC46ew2CdGjyE',
   },
}

const urlParams = new URLSearchParams(window.location.search)

const dramaId = urlParams.get('drama_id')
console.log(dramaId)
const dramaDetailUrl = `https://api.themoviedb.org/3/tv/${dramaId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

const getDetailDrama = async (dramaDetailUrl) => {
   try {
      const response = await fetch(dramaDetailUrl, options)
      const data = await response.json()
      console.log(data)
      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`
      const rowHtml = `<div class="row">
                  <div class="col-sm-3">
                     <img src="${imgSrc}" alt="${data.name}" class="poster-detail" style="max-width:100%"/>
                  </div>
                  <div class="col-sm-9">
                     <h2>${data.name}</h2>
                     <h3>${data.original_name}</h3>
                     <ul class="drama-info">
                        <li>${data.first_air_date}</li>
                        <li>${data.last_air_date}</li>
                        <li>${data.original_language}</li>
                     </ul>
                     
                     <p>${Number(data.vote_average.toFixed(1)) == 0.0 ? '미반영' : data.vote_average.toFixed(1)}점</p>
                     <p class="strLine">${
                        data.overview ||
                        `<span style="font-size: small;
color: gray;">줄거리 데이터가 없습니다</span>`
                     }</p>
                  </div>
               </div>`
      mainContainer.innerHTML += rowHtml
      //
      let seasonsHtml = `<div class="row" style="margin-top:30px">`
      const seasons = data.seasons

      for (let i = 0; i < seasons.length; i++) {
         seasonsHtml += `<div class="col-sm-12" style="margin-bottom:20px;">
            <ul>
               <li><a>시즌${i + 1} (평점 ${
            seasons[i].vote_average ||
            `<span style="font-size: small;
color: gray;">데이터가 없습니다</span>`
         }) 보러가기 - ${
            seasons[i].air_date ||
            `<span style="font-size: small;
color: gray;">데이터가 없습니다</span>`
         } 방영</a></li>
            </ul>
         </div>`
      }

      seasonsHtml += `</div>`
      mainContainer.innerHTML += seasonsHtml
   } catch (error) {
      console.log('에러 발생:', error)
   }
}

getDetailDrama(dramaDetailUrl)
