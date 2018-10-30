<template>
  <div class="recommend"  ref="recommend">
    <!-- 避免scroll高度不對，在slider以圖片load, 在歌單以數據變更，來執行 refresh -->
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <!-- 有回傳值才渲染 -->
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <Slider>
            <div v-for="item in recommends" :key="item.id">
              <!-- <a :href="item.linkUrl"> -->
                <!-- 當圖片load時，也通知 scroll 更新 -->
                <img class="needsclick" @load="loadImg" :src="item.picUrl" />
                <!-- <img class="needsclick" @load="loadImg" :src="imgUrl(item)" /> -->
              <!-- </a> -->
            </div>
          </Slider>
        </div>
        <div class="recommend-list">
          <!-- <h1 class="list-title">熱門歌單推薦</h1> -->
          <!-- <h1 class="list-title"></h1> -->
          <ul>
            <li @click="selectItem(item)" v-for="(item, index) in discList" :key="index" class="item">
              <div class="icon">
                <img width="60" height="70" v-lazy="item.imgurl"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getRecommend, getDiscList } from 'api/recommend'
import { playlistMixin } from 'common/js/mixin'
import { ERR_OK } from 'api/config'
import { mapMutations } from 'vuex'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    setTimeout(() => {
      this._getDiscList()
    }, 1000)
  },
  computed: {
    imgUrl(item) {
      return item.linkUrl + '/' + item.picUrl
    }
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''

      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    selectItem(item) {
      console.log('selectItem')
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    _getRecommend() {
      getRecommend().then(res => {
        // console.log('res.code', res.data.slider)
        if (res.code === ERR_OK) {
          // console.log('ERR_OK')
          this.recommends = res.data.list
        }
      })
      // this.recommends = [
      //   { id: 1, linkUrl: 'https://store.kimy.com.tw', picUrl: 'static/slider/1.jpg' },
      //   { id: 2, linkUrl: '', picUrl: 'static/slider/2.jpg' },
      //   { id: 3, linkUrl: 'https://store.kimy.com.tw', picUrl: 'static/slider/1.jpg' },
      //   { id: 4, linkUrl: '', picUrl: 'static/slider/2.jpg' }
      // ]
      console.log('slider', this.recommends)
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
          console.log('discList', this.discList)
        }
      })
      // this.discList = [
      //   {
      //     dissid: '0',
      //     imgurl: '/static/cover/1810c.jpg',
      //     imgurlDisc: '/static/cover/1810p.jpg',
      //     dissname: '認識情緒，體驗喜怒哀樂的心情感受！',
      //     creator: {
      //       name: '2018.10月號 - 今天心情好嗎？'
      //     }
      //   },
      //   {
      //     dissid: '1',
      //     imgurl: '/static/cover/1809c.jpg',
      //     imgurlDisc: '/static/cover/1809p.jpg',
      //     dissname: '觀察天文的奧祕，團圓歡聚慶中秋！',
      //     creator: {
      //       name: '2018.09月號 - 星空，不簡單的想像'
      //     }
      //   },
      //   {
      //     dissid: '2',
      //     imgurl: '/static/cover/1808c.jpg',
      //     imgurlDisc: '/static/cover/1808p.jpg',
      //     dissname: '動動身體，挑戰身體的運動極限！',
      //     creator: {
      //       name: '2018.08月號 - 夏日熱鬥賽'
      //     }
      //   },
      //   {
      //     dissid: '3',
      //     imgurl: '/static/cover/1807c.jpg',
      //     imgurlDisc: '/static/cover/1807p.jpg',
      //     dissname: '暢遊大海，度過夏日好時光！',
      //     creator: {
      //       name: '2018.07月號 - 暢遊海洋世界'
      //     }
      //   },
      //   {
      //     dissid: '4',
      //     imgurl: '/static/cover/1806c.jpg',
      //     imgurlDisc: '/static/cover/1806p.jpg',
      //     dissname: '探索水資源，歡喜熱鬧過端午！',
      //     creator: {
      //       name: '2018.06月號 - 小水滴的冒險'
      //     }
      //   }
      // ]
    },
    loadImg() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      margin-top: 10px;

      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
            font-weight: bold;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
