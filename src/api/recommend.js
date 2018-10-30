// import jsonp from 'common/js/jsonp'
// import { commonParams, options } from './config'
import axios from 'axios'

// const debug = process.env.NODE_ENV !== 'production'

export function getRecommend() {
  // const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  // const data = Object.assign({}, commonParams, {
  //   platform: 'h5',
  //   uin: 0,
  //   needNewCode: 1
  // })

  // return jsonp(url, data, options)
  const url = 'http://47musicbe.hsin-yi.org.tw/api/slider'
  return axios.get(url).then(res => {
    // console.log('getSlider', res.data)
    return Promise.resolve(res.data)
  })
}

export function getDiscList() {
  const url = 'http://47musicbe.hsin-yi.org.tw/api/mag'

  //   const data = Object.assign({}, commonParams, {
  //     platform: 'yqq',
  //     hostUin: 0,
  //     sin: 0,
  //     ein: 29,
  //     sortId: 5,
  //     needNewCode: 0,
  //     categoryId: 10000000,
  //     rnd: Math.random(),
  //     format: 'json'
  //   })

  return axios.get(url).then(res => {
    console.log('getDiscList=>', res.data)
    return Promise.resolve(res.data)
  })
}

export function getSongList(disstid) {
  // const url = debug ? '/api/getCdInfo' : 'http://ustbhuangyi.com/music/api/getCdInfo'
  const url = `http://47musicbe.hsin-yi.org.tw/api/cdlist/${disstid}`

//   const data = Object.assign({}, commonParams, {
//     disstid,
//     type: 1,
//     json: 1,
//     utf8: 1,
//     onlysong: 0,
//     platform: 'yqq',
//     hostUin: 0,
//     needNewCode: 0
//   })

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
