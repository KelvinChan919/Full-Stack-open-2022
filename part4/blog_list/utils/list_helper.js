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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}