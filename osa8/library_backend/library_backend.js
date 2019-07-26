
const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'SUPER_SECRET_TOKEN'

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://juhosillanpaa:Amixaz2019k@cluster0-xgrr8.mongodb.net/library?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MogoDB: ', error.message)
  })


const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int
    author: Author
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addBook(
      title: String!
      published: Int!
      authorname: String!
      genres: [String!]!
    ): Book

    addAuthor(
      name: String!
      born: Int
    ):Author

    editAuthor(
      name:String!
      setBornTo: Int!
    ):Author
  }

  
  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(authorname: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
 
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({...args})
      console.log(user)
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {invalidArgs: args})
      }
      return user
    },

    login: async(root, args) => {
      
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError(`Invalid username or password: ${args.username} and ${args.password}`)
      }
      const userforToken = {
        username: user.username,
        id: user._id
      }
      return {value: jwt.sign(userforToken, JWT_SECRET)}
    },

    addAuthor: async (root, args, { currentUser }) => {
      //this is working
      const author = new Author({...args})
      if  (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    addBook: async (root, args, { currentUser }) => {
      //this is working
      
      let tempAuthor = await Author.findOne({ name: args.authorname })
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }
      
      if (!tempAuthor) {
        tempAuthor = new Author({ name: args.authorname })
        try {
          await tempAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
      const book = new Book({ ...args, author: tempAuthor})
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      //this is working
      console.log(args)
      const author = await Author.findOne({ name: args.name})
      if (!author) {
        throw new UserInputError(`No author found with given name: ${args.name}`)
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error,message, {
          invalidArgs: arqs,
        })
      }
      return author
    }
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    me: (root, args, context) => {
      console.log('me started')
      console.log(context.currentUser)
      return context.currentUser
    },
    allBooks: async (root, args) => {
      console.log('fetching books')
      if (!args.authorname && !args.genre) {
        //Returning all books and its working
        return Book.find({}).populate('author')
      }
      else if (!args.genre){
        //returning books made by one author and its working
        const author = await Author.findOne({name: args.authorname})
        return Book.find({ author: author._id }).populate('author')
      }
      else if (!args.authorname) {
        console.log(args.genre)
        //returning books by genre and its working
        return Book.find({ genres: {$in: [args.genre]}}).populate('author')
        
      } else {
        //return by genre and author and its working
        const author = await Author.findOne({name: args.authorname})
        return Book.find({ author: author._id, genres: {$in: [args.genre]} }).populate('author')
        
      }

    },
    allAuthors: () => {
      //returns author, field bookCount is also working
      return Author.find({})
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({author: root._id})
      return books.length
    }
  }
    
}

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify( auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})