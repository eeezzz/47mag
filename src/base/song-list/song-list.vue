<template>
	<div class="song-list">
		<ul>
			<li @click="selectItem(song, index)" v-for="(song, index) in songs" :key="song.id" class="item">
				<div class="photo"><img :src="song.image" ></div>
				<div class="content">
					<h2 class="name">{{song.name}}</h2>
					<p class="desc">{{getDesc(song)}}</p>
				</div>
				<div class="interval">{{getDuration(song)}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectItem(song, index) {
      this.$emit('select', song, index)
    },
    getDesc(song) {
      // return `${song.singer} - ${song.album}`
      return `${song.album}`
    },
    getPhoto(song) {
      // return `/static/photo/${song.id}.jpg`
      return `/static/photo/${song.image}`
    },
    getDuration(song) {
      console.log(song.duration)
      let min = parseInt(song.duration / 60)
      let sec = song.duration % 60
      if (sec < 10) {
        sec = '0' + sec
      }
      return `${min}:${sec}`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.song-list {
	.item {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		height: 64px;
		font-size: $font-size-medium;

		.photo img {
			width: 50px;
			height: 50px;
			margin-left: -15px;
			margin-right: 10px;
		}

		.content {
			flex: 1;
			line-height: 20px;
			overflow: hidden;

			.name {
				no-wrap();
				color: $color-text;
			}

			.desc {
				no-wrap();
				margin-top: 4px;
				color: $color-text-d;
			}
		}
	}
}
</style>
