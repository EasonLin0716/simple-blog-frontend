<template>
  <div class="col-md-4 m-md-0 m-2" id="posts-down-right">
    <div id="new-from-network">
      <div id="new-from-network-title">
        <h3>New from your network</h3>
        <img src="../assets/new-from-network.png" alt="img" />
      </div>
      <div id="new-from-network-posts">
        <div v-for="post in newPosts" :key="post.id" id="post-box">
          <div id="img-box" class="size-mid mr-2">
            <img
              class="rounded-circle"
              :src="post.authorAvatar"
              alt="authorAvatar"
            />
          </div>
          <div id="info">
            <router-link :to="'/posts/' + post.id">
              <h6>{{ post.title }}</h6>
              <span class="d-block">{{ post.author }}</span>
            </router-link>
            <span>{{ post.monthDay }}</span
            >&nbsp;&bull;&nbsp;<span>{{ post.readTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <div id="popular-on-site">
      <div id="popular-on-site-title">
        <h3>Popular on site</h3>
      </div>
      <div id="popular-on-site-posts">
        <div id="info" v-for="(post, index) in popularPosts" :key="post.id">
          <span id="idx">{{ '0' + (index + 1) }}</span>
          <div>
            <router-link :to="'/posts/' + post.id">
              <h6>{{ post.title }}</h6>
              <span class="d-block">{{ post.author }}</span>
            </router-link>
            <span>{{ post.monthDay }}</span
            >&nbsp;&bull;&nbsp;<span>{{ post.readTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="sticky-down">
      <div v-if="isAuthenticated" id="reading-list">
        <div id="reading-list-title">
          <h3>Reading list</h3>
          <img src="../assets/reading-list.png" alt="reading-list-img" />
        </div>
        <div id="reading-list-posts">
          <div
            v-for="post in readingPosts"
            :key="post.id"
            id="reading-list-post"
          >
            <div id="reading-list-posts-icon" class="size-small rounded-circle">
              <font-awesome-icon :icon="['fas', 'bookmark']" id="bookmark" />
            </div>
            <div>
              <router-link :to="'/posts/' + post.id">
                <h6>{{ post.title }}</h6>
                <span class="d-block">{{ post.author }}</span>
              </router-link>
              <span>{{ post.monthDay }}</span
              >&nbsp;&bull;&nbsp;<span>{{ post.readTime }}</span>
            </div>
          </div>
        </div>
      </div>
      <div id="tool-bar">
        <ul>
          <li>Help</li>
          <li>Status</li>
          <li>Writers</li>
          <li>Blog</li>
          <li>Careers</li>
          <li>Privacy</li>
          <li>Terms</li>
          <li>About</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsDownRight',
  props: {
    newPosts: {
      type: Array,
      required: true
    },
    popularPosts: {
      type: Array,
      required: true
    },
    readingPosts: {
      type: Array,
      required: true
    },
    isAuthenticated: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/_variables.scss';

.sticky-down {
  position: sticky;
  top: 0;
}

#img-box img {
  height: 100%;
  width: 100%;
}

span {
  font-size: $text-small;
}

#new-from-network-title,
#reading-list-title {
  padding: 8px;
  display: flex;
  justify-content: space-between;
  background: $light-blue;
}

#new-from-network-title h3,
#reading-list-title h3 {
  font-size: 20px;
  font-weight: 600;
  align-self: flex-end;
  margin: 0;
  padding: 16px 24px 16px 16px;
}

#new-from-network-posts {
  background: $light-gray;
  padding: 24px;
}

#new-from-network-posts #img-box img {
  width: 100%;
}

#new-from-network-title img,
#reading-list-title img {
  border-radius: initial;
}

#new-from-network-posts #post-box {
  display: flex;
  margin-bottom: 24px;
}

#popular-on-site-title h3 {
  font-size: 24px;
  margin: 24px 24px 0 24px;
  padding-bottom: 16px;
  border-bottom: 1.5px solid #ccc;
}

#popular-on-site-posts {
  margin: 24px;
}

#popular-on-site-posts #info {
  display: flex;
  margin-bottom: 20px;
}

#popular-on-site-posts #idx {
  font-size: 28px;
  color: #ccc;
  margin-right: 10px;
  margin-top: -4px;
}

#reading-list-posts {
  padding: 24px;
}

#reading-list-post {
  display: flex;
  margin-bottom: 20px;
}

#reading-list {
  background: $light-gray;
}

#reading-list-title {
  background: $bidge;
}

#tool-bar {
  margin-top: 40px;
  padding: 0 20px;
}

#tool-bar ul {
  border-top: 1px solid #aaa;
  padding: 10px 0 25px 0;
}

#tool-bar ul li {
  margin-right: 16px;
  color: #aaa;
  font-size: $text-small;
}

#reading-list-posts-icon {
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

#bookmark {
  width: 16px;
  height: 16px;
}
</style>
