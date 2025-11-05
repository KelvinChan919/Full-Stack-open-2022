const dummy = (blogs) => {
  return 1
}

const totalLikes = (blog) => {
    const initial = 0
    return blog.map(each => each.likes).reduce((accumulator, current) => accumulator + current, initial)
}

module.exports = {
  dummy,
  totalLikes
}