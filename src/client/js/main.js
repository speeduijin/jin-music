import '../scss/styles.scss';

console.log('hi');

// XMLHttpRequest(XHR)를 사용하여 백엔드로부터 데이터를 받아와서 UI에 출력합니다.
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      const songs = JSON.parse(xhr.responseText);
      const songsEl = document.getElementById('songs');
      songsEl.innerHTML = '';
      songs.forEach((song, index) => {
        const tr = document.createElement('tr');
        const no = document.createElement('td');
        no.textContent = index + 1;
        const title = document.createElement('td');
        title.textContent = song.title;
        const artist = document.createElement('td');
        artist.textContent = song.artist;
        const playCount = document.createElement('td');
        playCount.textContent = song.playCount;
        tr.appendChild(no);
        tr.appendChild(title);
        tr.appendChild(artist);
        songsEl.appendChild(tr);
      });
    } else {
      console.log('Error: ' + xhr.status);
    }
  }
};
xhr.open('GET', '/api/songs');
xhr.send();
