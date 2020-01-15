import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://simple-blog-backend.herokuapp.com/api'
    : 'http://localhost:3000/api'

export const apiHelper = axios.create({
  baseURL
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  onOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
