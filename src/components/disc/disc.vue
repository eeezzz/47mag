<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    <!-- <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list> -->
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import { getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { mapGetters } from 'vuex'
import { createSong } from 'common/js/song'

export default {
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurlDisc
    },
    ...mapGetters(['disc'])
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then(res => {
        if (res.code === ERR_OK) {
          console.log('res.data.list', res.data.list)
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
      // return new Song({
      //   id: musicData.songid,
      //   mid: musicData.songmid,
      //   singer: filterSinger(musicData.singer),
      //   name: musicData.songname,
      //   album: musicData.albumname,
      //   // duration: musicData.interval,
      //   duration: 234,
      //   image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
      //   // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
      //   // url: `http://localhost:8080/static/audios/missyou.mp3`
      //   // url: `http://192.168.1.81:8080/static/audios/${musicData.songid}.mp3`
      //   url: `http://localhost:8080/static/audios/${musicData.songid}.mp3`
      // })

      console.log('songs', this.songs)
    },
    _normalizeSongs(list) {
      console.log('_normalizeSongs->', list)
      let ret = []
      list.forEach(musicData => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      console.log('disc-normalizeSong', ret)
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>