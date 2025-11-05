const dummy = (blogs) => {
  return 1
}

const totalLikes = (blog) => {
    const initial = 0
    return blog.map(each => each.likes).reduce((accumulator, current) => accumulator + current, initial)
}

const favoriteBlog = (blog) => {
    const favorite = blog.map(each => each.likes).indexOf(Math.max(...blog.map(each => each.likes)))
    return blog[favorite]
}

const mostBlogs = (blog) => {
    const arr = []
    const author_list = [...new Set(blog.map(entry => entry.author))]
    for(i=0; i < author_list.length; i++){
        const total_blogs = blog.filter(entry => entry.author === author_list[i]).length
        const entry = { author : author_list[i], blogs : total_blogs }
        arr.push(entry)
    }
    return arr[arr.map( entry => entry.blogs).indexOf(Math.max(...arr.map(entry => entry.blogs)))]
}

const mostLikes = (blog) => {
    const arr = []
    const author_list = [...new Set(blog.map(entry => entry.author))]
    for(i=0; i < author_list.length; i++){
        const total_likes = blog.filter(entry => entry.author === author_list[i]).map(entry => entry.likes).reduce((accumulator, current) => accumulator + current, 0)
        console.log(total_likes)
        const entry = { author : author_list[i], likes : total_likes }
        arr.push(entry)
    }
    return arr[arr.map( entry => entry.likes).indexOf(Math.max(...arr.map(entry => entry.likes)))]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}