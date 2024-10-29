const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTAwYTZjMTI3YWYzNTI5MDc4N2FjOGE5ZWY1ZGRiMSIsIm5iZiI6MTczMDA3NjAzOS44ODE4MTgsInN1YiI6IjY3MWIwYjNkYjNkNWNiYjg0MmYzZmNjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qnrxmbQQi0pAubMNr6A1njgbCFpg3AnC46ew2CdGjyE',
   },
}

//현재 페이지의 url의 쿼리스트링을 사용하여 URLSearchParams 객체 생성
const urlParams = new URLSearchParams(window.location.search)

// URLSearchParams

//특정 쿼리 스트링 값 가져오기(예)114918)
const movieId = urlParams.get('movie_id')

const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR` //114918이 해당 영화 상세페이지 아이디
const mainContainer = document.querySelector('main .container')

//영화 상세정보 바인딩
const getDetailMovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)
      const data = await response.json()
      console.log(data)

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`
      //w300 포스터의 width를 300px로 가져온다
      const rowHtml = `<div class="row">
                  <div class="col-sm-3">
                     <img src="${imgSrc}" alt="${data.title}" class="poster-detail" style="max-width:100%"/>
                  </div>
                  <div class="col-sm-9">
                     <h2>${data.title}</h2>
                     <ul class="movie-info">
                        <li>${data.release_date}</li>
                        <li>${data.genres.map((genre) => {
                           return genre.name
                        })}</li>
                        <li>${data.runtime}분</li>
                     </ul>
                     
                     <p>${Number(data.vote_average.toFixed(1)) == 0.0 ? '미반영' : data.vote_average.toFixed(1)}점</p>
                     <p>${data.overview}</p>
                  </div>
               </div>`
      //평점이 0.0이면 미반영 출력 그렇지 않으면 평점 출력
      mainContainer.innerHTML += rowHtml
      await getCreditMovie(movieCreditsUrl)
      //출연진 정보 위에 뜨는거 해결. 비동기 동기 관련 문제.
   } catch (error) {
      console.log('에러 발생:', error)
   }
}

getDetailMovie(movieDetailUrl)

//출연 배우 데이터 바인딩
const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`

const getCreditMovie = async (movieCreditsUrl) => {
   try {
      const response = await fetch(movieCreditsUrl, options)
      const data = await response.json()
      let castRowHtml = `<div class="row" style="margin-top:30px">`
      //출연배우 6명만 출력
      for (let i = 0; i < 6; i++) {
         let profileImg = !data.cast[i].profile_path ? `../images/person.png` : `https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}`
         //카드가 6개가 만들어져야 하므로 누적합산
         castRowHtml += `
         <div class="col-sm-2 p-3">
                     <div class="card">
                        <img src="${profileImg}" alt="${data.cast[i].name}" class="card-img-top" />
                     </div>
                     <div class="card-body">
                        <p class="card-text">${data.cast[i].name}</p>
                     </div></div>`
      }

      castRowHtml += `</div>`

      mainContainer.innerHTML += castRowHtml
   } catch (error) {
      console.log('에러 발생:', error)
   }
}
