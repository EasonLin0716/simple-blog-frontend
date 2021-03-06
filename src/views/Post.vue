<template>
  <div id="post">
    <div class="box-mid">
      <h1>{{ post.title }}</h1>
      <PostUserInfo
        :author="author"
        :post="post"
        :isBookmarked="isBookmarked"
        :isFollowing="isFollowing"
        :currentUserId="currentUserId"
        @after-handle-bookmark="afterHandleBookmark"
        @after-handle-unbookmark="afterHandleUnbookmark"
        @after-handle-follow="afterHandleFollow"
        @after-handle-unfollow="afterHandleUnfollow"
      />
      <div class="d-flex justify-content-center">
        <img :src="post.cover" alt="cover" width="620" height="370" />
      </div>
      <article id="post-content" v-html="post.content">
        <!-- {{ post.content }} -->
      </article>
      <PostFooter
        :author="author"
        :post="post"
        :clapCount="clapCount"
        :isLoading="isLoading"
        :isBookmarked="isBookmarked"
        :isFollowing="isFollowing"
        :currentUserId="currentUserId"
        @after-handle-clap="afterHandleClap"
        @after-handle-bookmark="afterHandleBookmark"
        @after-handle-unbookmark="afterHandleUnbookmark"
        @after-handle-follow="afterHandleFollow"
        @after-handle-unfollow="afterHandleUnfollow"
      />
    </div>
    <AppPageFooter />
  </div>
</template>

<script>
import postsAPI from '../apis/posts'
import PostUserInfo from '../components/PostUserInfo'
import PostFooter from '../components/PostFooter'
import AppPageFooter from '../components/AppPageFooter'
import repliesAPI from '../apis/replies'
import usersAPI from '../apis/user'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
export default {
  name: 'Post',
  components: { PostUserInfo, PostFooter, AppPageFooter },
  data() {
    return {
      clapCount: 0,
      clapTimer: null,
      isLoading: false,
      post: {
        id: 0,
        title: '',
        content: '',
        cover: '',
        applauseFrom: '',
        clappedTimes: 0,
        monthDay: '',
        readTime: ''
      },
      author: {
        id: 0,
        name: '',
        avatar: '',
        introduction: '',
        isAdmin: 0,
        Followers: [],
        Followings: []
      }
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
    isBookmarked: function() {
      if (this.isAuthenticated) {
        return this.currentUser.bookmarkedPostId.includes(this.post.id)
      }
      return false
    },
    isFollowing: function() {
      if (this.isAuthenticated) {
        return this.currentUser.followingUserId.includes(this.author.id)
      }
      return false
    },
    currentUserId: function() {
      if (this.isAuthenticated) {
        return this.currentUser.id
      }
      return 0
    }
  },
  methods: {
    async fetchPost(postId) {
      try {
        const { data, statusText } = await postsAPI.getPost(postId)
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        const { post, author } = data
        this.post = {
          ...this.post,
          id: post.id,
          title: post.title,
          content: post.content,
          cover: post.cover,
          applauseFrom: post.applauseFrom,
          clappedTimes: post.clappedTimes,
          monthDay: post.monthDay,
          readTime: post.readTime
        }
        this.author = {
          ...this.author,
          id: author.id,
          name: author.name,
          avatar: author.avatar,
          introduction: author.introduction,
          isAdmin: author.isAdmin,
          Followers: author.Followers || [],
          Followings: author.Followings || []
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得文章，請稍後再試！'
        })
      }
    },
    afterHandleClap() {
      if (!this.isAuthenticated) {
        Toast.fire({
          icon: 'info',
          title: '請登入來使用此功能！'
        })
        return
      }
      if (this.clapTimer) {
        clearTimeout(this.clapTimer)
      }
      this.clapCount += 1
      this.post.clappedTimes += 1
      this.clapTimer = setTimeout(async () => {
        try {
          this.isLoading = true
          const clapInfo = {
            clapCount: this.clapCount
          }
          const { data } = await repliesAPI.clap(
            this.$route.params.id,
            clapInfo
          )
          if (data.status === 'success') {
            Toast.fire({
              icon: 'success',
              title: '鼓掌成功!!'
            })
          }
          this.clapCount = 0
          this.$forceUpdate()
          this.isLoading = false
        } catch (error) {
          Toast.fire({
            icon: 'error',
            title: '鼓掌失敗！請稍後再試'
          })
        }
      }, 2000)
    },
    afterHandleBookmark(postId) {
      if (!this.isAuthenticated) {
        Toast.fire({
          icon: 'info',
          title: '請登入來使用此功能！'
        })
        return
      }
      this.$store.dispatch('addBookmark', postId)
      const idx = this.posts.map(d => d.id).indexOf(+postId)
      this.posts[idx].isBookmarked = true
    },
    afterHandleUnbookmark(postId) {
      this.$store.dispatch('deleteBookmark', postId)
      const idx = this.posts.map(d => d.id).indexOf(+postId)
      this.posts[idx].isBookmarked = false
    },
    async afterHandleFollow(postId) {
      try {
        if (!this.isAuthenticated) {
          Toast.fire({
            icon: 'info',
            title: '請登入來使用此功能！'
          })
          return
        }
        const { data } = await usersAPI.follow(postId)
        if (data.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: '追蹤成功!!'
          })
        }
        this.currentUser.followingUserId.push(this.author.id)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法追蹤，請稍後再試！'
        })
      }
    },
    async afterHandleUnfollow(postId) {
      try {
        const { data } = await usersAPI.unfollow(postId)
        if (data.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: '退追成功!!'
          })
        }
        const ind = this.currentUser.followingUserId.indexOf(this.author.id)
        this.currentUser.followingUserId.splice(ind, 1)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法退追，請稍後再試！'
        })
      }
    }
  },
  created() {
    const { id: postId } = this.$route.params
    this.fetchPost(postId)
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { id: postId } = to.params
    this.fetchUser(postId)
    next()
  }
}
</script>

<style scoped>
article {
  margin: 20px 0 40px 0;
}

@media screen and (max-width: 720px) {
  #cover img {
    width: 100%;
    height: auto;
  }
}
</style>
