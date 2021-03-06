import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
// ---icons registering start---
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as faBookmarked } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faCreditCard } from '@fortawesome/free-regular-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'

// ---icons registering end---
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faSearch,
  faBell,
  faBookmark,
  faBookmarked,
  faFacebook,
  faTwitter,
  faComment,
  faCamera,
  faChevronDown,
  faCreditCard,
  faQuestionCircle,
  faPaypal
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
