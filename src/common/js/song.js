import { getLyric } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url, lyric }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
    this.lyric = lyric
  }

  getLyric() {
    // getLyric(this.mid).then((res) => {
    //   if (res.retcode === ERR_OK) {
    //     this.lyric = Base64.decode(res.lyric)
    //     console.log(this.lyric)
    //   }
    // })
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          console.log(this.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}
export function createSong(musicData) {
  // console.log('song.js', musicData.lyric)
  return new Song({
    // id: musicData.songid,
    id: musicData.id,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    // name: musicData.songname,
    name: musicData.name,
    album: musicData.desc,
    duration: musicData.interval,

    // image: `http://47musicbe.hsin-yi.org.tw/Pic/songpic/${musicData.albummid}.jpg`,
    image: musicData.imgUrl,

    // url: `http://47musicbe.hsin-yi.org.tw/songs/${musicData.songid}.m4a`,
    url: musicData.songUrl,
    // url: `http://media.kimy.com.tw/mag/47/201810/${musicData.songid}.m4a`,
    // url: `http://wowza01.hsin-yi.org.tw/vod/_definst_/4-7/201810/mp3:${musicData.songid}.mp3`,
    lyric: musicData.lyric
  })
}

// 歌手超過二位，用 / 來隔
export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  // 如果有一個歌手以上，用 / 來隔
  return ret.join('/')
}
